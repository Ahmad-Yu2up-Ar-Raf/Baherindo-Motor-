<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    private const ALLOWED_IMAGE_TYPES = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'
    ];

    private const ALLOWED_VIDEO_TYPES = [
        'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'
    ];

    private const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    /**
     * Handle multiple file uploads
     */
    public function handleMultipleUploads(array $files, string $folder = 'motors'): array
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $result = $this->uploadSingleFile($file, $folder);
                if ($result) {
                    $uploadedFiles[] = $result;
                }
            }
        }

        return $uploadedFiles;
    }

    /**
     * Upload single file
     */
    public function uploadSingleFile(UploadedFile $file, string $folder = 'motors'): ?array
    {
        try {
            // Validate file
            if (!$this->isValidFile($file)) {
                return null;
            }

            // Determine subfolder based on file type
            $subfolder = $this->getSubfolderByType($file->getMimeType());
            $fullFolder = $folder . '/' . $subfolder;

            // Generate unique filename
            $fileName = $this->generateUniqueFileName($file->getClientOriginalName());

            // Store file
            $filePath = $file->storeAs($fullFolder, $fileName, 'public');
return [
    'file' => [
        'name' => $file['name'],           // Use array key instead of method
        'size' => $file['size'],           // Use array key instead of method  
        'type' => $file['type'],           // Use array key instead of method
    ],
    'preview' => Storage::url($filePath),
    'id' => $file['id'] ?? Str::random(10),  // Get id from $fileData, not $file
    'base64Data' => $file['base64Data']      // Get base64Data from $fileData, not $file
];

        } catch (\Exception $e) {
            // \Log::error('File upload error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Validate if file is allowed
     */
    private function isValidFile(UploadedFile $file): bool
    {
        $mimeType = $file->getMimeType();
        $fileSize = $file->getSize();

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
            }
        } catch (\Exception $e) {
            // \Log::error('File deletion error: ' . $e->getMessage());
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
     * Check if file exists in storage
     */
    public function fileExists(string $filePath): bool
    {
        return Storage::disk('public')->exists($filePath);
    }
}