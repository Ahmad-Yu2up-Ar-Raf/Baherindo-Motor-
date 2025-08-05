<?php

namespace App\Observers;

use App\Models\Motor;
use App\Services\FileUploadService;
use App\Services\JsonFileUploadService;
use Illuminate\Support\Facades\Log;

class MotorObserver
{
    protected $fileUploadService;
    protected $jsonFileUploadService;

    public function __construct(
        FileUploadService $fileUploadService,
        JsonFileUploadService $jsonFileUploadService
    ) {
        $this->fileUploadService = $fileUploadService;
        $this->jsonFileUploadService = $jsonFileUploadService;
    }

    /**
     * Handle the Motor "creating" event.
     * Ini akan dijalankan sebelum data disimpan ke database
     */
    public function creating(Motor $motor)
    {
        // Handle file uploads jika ada files yang dikirim dari request
        if (request()->hasFile('files') || (request()->has('files') && is_array(request('files')))) {
            $uploadedFiles = $this->handleFileUploads();
            
            if (empty($uploadedFiles)) {
                // Jika upload gagal, kita bisa throw exception atau return false
                throw new \Exception('Gagal mengupload file. Pastikan file valid.');
            }
            
            $motor->files = $uploadedFiles;
        }
    }

    /**
     * Handle the Motor "created" event.
     * Ini akan dijalankan setelah data berhasil disimpan ke database
     */
    public function created(Motor $motor)
    {
        Log::info("Motor created successfully with ID: {$motor->id}");
        
        // Bisa tambahkan logic tambahan seperti:
        // - Send notification
        // - Update cache
        // - Generate thumbnails, etc.
    }

    /**
     * Handle the Motor "updating" event.
     * Ini akan dijalankan sebelum data di-update
     */
    public function updating(Motor $motor)
    {
        // Handle file uploads jika ada files baru yang dikirim
        if (request()->hasFile('files') || (request()->has('files') && is_array(request('files')))) {
            // Backup old files untuk di-delete nanti
            $oldFiles = $motor->getOriginal('files') ?? [];
            
            // Upload files baru
            $uploadedFiles = $this->handleFileUploads();
            
            if (empty($uploadedFiles)) {
                throw new \Exception('Gagal mengupload file. Pastikan file valid.');
            }
            
            // Delete old files
            if (!empty($oldFiles)) {
                $this->jsonFileUploadService->deleteMultipleFiles($oldFiles);
            }
            
            $motor->files = $uploadedFiles;
        }
    }

    /**
     * Handle the Motor "updated" event.
     */
    public function updated(Motor $motor)
    {
        Log::info("Motor updated successfully with ID: {$motor->id}");
    }

    /**
     * Handle the Motor "deleting" event.
     * Ini akan dijalankan sebelum data dihapus dari database
     */
    public function deleting(Motor $motor)
    {
       
        if (!empty($motor->files)) {
            try {
                $this->jsonFileUploadService->deleteMultipleFiles($motor->files);
                Log::info("Files deleted for motor ID: {$motor->id}");
            } catch (\Exception $e) {
                Log::error("Failed to delete files for motor ID: {$motor->id}. Error: " . $e->getMessage());
                // Depending on your business logic, you might want to throw exception here
                // throw new \Exception('Gagal menghapus file terkait.');
            }
        }
    }

    /**
     * Handle the Motor "deleted" event.
     */
    public function deleted(Motor $motor)
    {
        Log::info("Motor deleted successfully with ID: {$motor->id}");
    }

    /**
     * Handle the Motor "restored" event.
     * Jika menggunakan soft delete
     */
    public function restored(Motor $motor)
    {
        Log::info("Motor restored with ID: {$motor->id}");
    }

    /**
     * Handle the Motor "force deleted" event.
     * Jika menggunakan soft delete dan di-force delete
     */
    public function forceDeleted(Motor $motor)
    {
        Log::info("Motor force deleted with ID: {$motor->id}");
    }

    /**
     * Handle file uploads based on request type
     */
    private function handleFileUploads(): array
    {
        $uploadedFiles = [];

        try {
            // Check if files are UploadedFile objects or JSON data
            if (request()->hasFile('files')) {
                // Traditional file upload
                $uploadedFiles = $this->fileUploadService->handleMultipleUploads(
                    request()->file('files'),
                    'motors'
                );
            } elseif (request()->has('files') && is_array(request('files'))) {
                // JSON file data upload
                $uploadedFiles = $this->jsonFileUploadService->handleJsonFileUploads(
                    request('files'),
                    'motors'
                );
            }

            return $uploadedFiles;

        } catch (\Exception $e) {
            Log::error('File upload error in observer: ' . $e->getMessage());
            return [];
        }
    }
}