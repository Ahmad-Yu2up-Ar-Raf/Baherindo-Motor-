<?php

namespace App\Observers;

use App\Models\Mobil;
use App\Services\FileUploadService;
use App\Services\JsonFileUploadService;
use Illuminate\Support\Facades\Log;

class MobilObserver
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
     * Handle the Mobil "created" event.
     */
    public function created(Mobil $mobil): void
    {
        if (request()->hasFile('files') || (request()->has('files') && is_array(request('files')))) {
            $uploadedFiles = $this->handleFileUploads();
            
            if (empty($uploadedFiles)) {
                // Jika upload gagal, kita bisa throw exception atau return false
                throw new \Exception('Gagal mengupload file. Pastikan file valid.');
            }
            
            $mobil->files = $uploadedFiles;
        }
    }



   public function updating(Mobil $mobil)
    {
        // Handle file uploads jika ada files baru yang dikirim
        if (request()->hasFile('files') || (request()->has('files') && is_array(request('files')))) {
            // Backup old files untuk di-delete nanti
            $oldFiles = $mobil->getOriginal('files') ?? [];
            
            // Upload files baru
            $uploadedFiles = $this->handleFileUploads();
            
            if (empty($uploadedFiles)) {
                throw new \Exception('Gagal mengupload file. Pastikan file valid.');
            }
            
            // Delete old files
            if (!empty($oldFiles)) {
                $this->jsonFileUploadService->deleteMultipleFiles($oldFiles);
            }
            
            $mobil->files = $uploadedFiles;
        }
    }


    /**
     * Handle the Mobil "updated" event.
     */
    public function updated(Mobil $mobil): void
    {
        //
    }


    public function deleting(Mobil $mobil)
    {
       
        if (!empty($mobil->files)) {
            try {
                $this->jsonFileUploadService->deleteMultipleFiles($mobil->files);
                Log::info("Files deleted for motor ID: {$mobil->id}");
            } catch (\Exception $e) {
                Log::error("Failed to delete files for motor ID: {$mobil->id}. Error: " . $e->getMessage());
                // Depending on your business logic, you might want to throw exception here
                // throw new \Exception('Gagal menghapus file terkait.');
            }
        }
    }

    /**
     * Handle the Mobil "deleted" event.
     */
    public function deleted(Mobil $mobil): void
    {
        //
    }

    /**
     * Handle the Mobil "restored" event.
     */
    public function restored(Mobil $mobil): void
    {
        //
    }

    /**
     * Handle the Mobil "force deleted" event.
     */
    public function forceDeleted(Mobil $mobil): void
    {
        //
    }



    private function handleFileUploads(): array
    {
        $uploadedFiles = [];

        try {
            // Check if files are UploadedFile objects or JSON data
            if (request()->hasFile('files')) {
                // Traditional file upload
                $uploadedFiles = $this->fileUploadService->handleMultipleUploads(
                    request()->file('files'),
                    'mobil'
                );
            } elseif (request()->has('files') && is_array(request('files'))) {
                // JSON file data upload
                $uploadedFiles = $this->jsonFileUploadService->handleJsonFileUploads(
                    request('files'),
                    'mobil'
                );
            }

            return $uploadedFiles;

        } catch (\Exception $e) {
            Log::error('File upload error in observer: ' . $e->getMessage());
            return [];
        }
    }
}
