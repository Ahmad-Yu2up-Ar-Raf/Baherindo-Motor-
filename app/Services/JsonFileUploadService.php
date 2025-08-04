<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class JsonFileUploadService
{
    private const ALLOWED_IMAGE_TYPES = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'
    ];

    private const ALLOWED_VIDEO_TYPES = [
        'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'
    ];

    private const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    /**
     * Handle multiple file uploads from JSON structure with base64 data
     */
    public function handleJsonFileUploads(array $filesData, string $folder = 'motors'): array
    {
        $uploadedFiles = [];

        foreach ($filesData as $fileData) {
            // Cek apakah ini file baru (ada base64Data) atau file existing (ada file_path)
            if (isset($fileData['file']) && isset($fileData['base64Data'])) {
                // File baru dengan base64 data
                $result = $this->processBase64File($fileData, $folder);
                if ($result) {
                    $uploadedFiles[] = $result;
                }
            } elseif (isset($fileData['file_path'])) {
                // File existing yang sudah ada di storage
                $uploadedFiles[] = $fileData;
            }
        }

        return $uploadedFiles;
    }

    /**
     * Process single file from base64 data
     */
    private function processBase64File(array $fileData, string $folder): ?array
    {
        try {
            $file = $fileData['file'];
            $base64Data = $fileData['base64Data'];
            
            // Validate file metadata
            if (!$this->isValidJsonFile($file)) {
                return null;
            }

            // Decode base64 data
            $fileContent = base64_decode($base64Data);
            if ($fileContent === false) {
                throw new \Exception('Invalid base64 data');
            }

            // Determine subfolder based on file type
            $subfolder = $this->getSubfolderByType($file['type']);
            $fullFolder = $folder . '/' . $subfolder;

            // Generate unique filename
            $fileName = $this->generateUniqueFileName($file['name']);
            $filePath = $fullFolder . '/' . $fileName;

            // Store file to public storage
            $stored = Storage::disk('public')->put($filePath, $fileContent);
            
            if (!$stored) {
                throw new \Exception('Failed to store file');
            }

            return [
                'file' => [
                    'name' => $file['name'],
                    'size' => $file['size'],
                    'type' => $file['type'],
                ],
                'file_path' => $filePath, // TAMBAHKAN INI untuk konsistensi
                'preview' => Storage::url($filePath),
                'id' => $fileData['id'] ?? Str::random(10),
            ];

        } catch (\Exception $e) {
            Log::error('JSON file processing error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Validate JSON file data
     */
    private function isValidJsonFile(array $fileData): bool
    {
        // Check required fields
        if (!isset($fileData['name'], $fileData['size'], $fileData['type'])) {
            return false;
        }

        $mimeType = $fileData['type'];
        $fileSize = $fileData['size'];

        // Check file size
        if ($fileSize > self::MAX_FILE_SIZE) {
            return false;
        }

        // Check file type
        $allowedTypes = array_merge(self::ALLOWED_IMAGE_TYPES, self::ALLOWED_VIDEO_TYPES);
        
        return in_array($mimeType, $allowedTypes);
    }

    /**
     * Get subfolder based on file type
     */
    private function getSubfolderByType(string $mimeType): string
    {
        if (in_array($mimeType, self::ALLOWED_IMAGE_TYPES)) {
            return 'images';
        }

        if (in_array($mimeType, self::ALLOWED_VIDEO_TYPES)) {
            return 'videos';
        }

        return 'others';
    }

    /**
     * Generate unique filename
     */
    private function generateUniqueFileName(string $originalName): string
    {
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        $nameWithoutExtension = pathinfo($originalName, PATHINFO_FILENAME);
        $cleanName = Str::slug($nameWithoutExtension);
        
        return $cleanName . '_' . time() . '_' . Str::random(8) . '.' . $extension;
    }

    /**
     * Delete multiple files
     */
    public function deleteMultipleFiles(array $files): void
    {
        foreach ($files as $file) {
            $this->deleteSingleFile($file);
        }
    }

    /**
     * Delete single file
     */
    public function deleteSingleFile(array $fileData): void
    {
        try {
            if (isset($fileData['file_path']) && $fileData['file_path']) {
                Storage::disk('public')->delete($fileData['file_path']);
                Log::info('File deleted: ' . $fileData['file_path']);
            }
        } catch (\Exception $e) {
            Log::error('File deletion error: ' . $e->getMessage());
        }
    }

    /**
     * Get file URL
     */
    public function getFileUrl(string $filePath): string
    {
        return Storage::url($filePath);
    }

    /**
     * Compare files to determine which ones to delete
     */
    public function getFilesToDelete(array $oldFiles, array $newFiles): array
    {
        $newFilePaths = [];
        
        // Ambil file_path dari file baru
        foreach ($newFiles as $newFile) {
            if (isset($newFile['file_path'])) {
                $newFilePaths[] = $newFile['file_path'];
            }
        }

        $filesToDelete = [];
        
        // Cari file lama yang tidak ada di file baru
        foreach ($oldFiles as $oldFile) {
            if (isset($oldFile['file_path']) && !in_array($oldFile['file_path'], $newFilePaths)) {
                $filesToDelete[] = $oldFile;
            }
        }

        return $filesToDelete;
    }
}