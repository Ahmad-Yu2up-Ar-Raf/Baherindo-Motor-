<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMotorRequest;
use App\Http\Requests\UpdateMotorRequest;
use App\Models\Motor;
use App\Services\FileUploadService;
use App\Services\JsonFileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MotorController extends Controller
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');
        $merek = $request->input('merek');
        $kategori = $request->input('kategori');
        $query = Motor::where('user_id', Auth::id());

        if ($search) {
            $query->where(function($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw('LOWER(name) LIKE ?', ["%{$searchLower}%"]);
            });
        }
        
        if ($merek) {
            $query->where('merek', $merek);
        }
        
        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $motor = $query->orderBy('created_at', 'desc')->paginate($perPage);
            
        $motor->through(function($item) {
            $files = $item->files ?? [];
            $filesWithUrls = array_map(function($file) {
                if (isset($file['file_path'])) {
                    $file['url'] = $this->fileUploadService->getFileUrl($file['file_path']);
                }
                return $file;
            }, $files);
            
            return [
                ...$item->toArray(),
                'files' => $filesWithUrls,
            ];
        });

        return Inertia::render('dashboard/motor', [
            'motor' => $motor->items() ?? [],
            'mereks' => [
                'search' => request('search', ''),
            ],
            'pagination' => [
                'data' => $motor->toArray(),
                'total' => $motor->total(),
                'currentPage' => $motor->currentPage(),
                'perPage' => $motor->perPage(),
                'lastPage' => $motor->lastPage(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMotorRequest $request)
    {
        $validated = $request->validated();

        try {
            $uploadedFiles = [];
            
            // Check if files are UploadedFile objects or JSON data
            if ($request->hasFile('files')) {
                // Traditional file upload
                $uploadedFiles = $this->fileUploadService->handleMultipleUploads(
                    $request->file('files'),
                    'motors'
                );
            } elseif (isset($validated['files']) && is_array($validated['files'])) {
                // JSON file data upload
                $uploadedFiles = $this->jsonFileUploadService->handleJsonFileUploads(
                    $validated['files'],
                    'motors'
                );
            }

            if (empty($uploadedFiles)) {
                return back()->withErrors(['files' => 'Gagal mengupload file. Pastikan file valid.']);
            }

            $motor = Motor::create([
                ...$validated,
                'files' => $uploadedFiles,
                'user_id' => Auth::id()
            ]);

            return redirect()->route('dashboard.motor.index')
                ->with('success', 'Motor berhasil ditambahkan dengan ' . count($uploadedFiles) . ' file.');

        } catch (\Exception $e) {
            Log::error('Motor creation error: ' . $e->getMessage());
            
            if (!empty($uploadedFiles)) {
                $this->jsonFileUploadService->deleteMultipleFiles($uploadedFiles);
            }
            
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMotorRequest $request, Motor $motor)
    {
        $validated = $request->validated();

        try {
            $oldFiles = $motor->files ?? [];
            $uploadedFiles = $oldFiles; // Default: keep old files

            Log::info('Update request received', [
                'motor_id' => $motor->id,
                'has_files_in_request' => isset($validated['files']),
                'old_files_count' => count($oldFiles),
                'request_files_count' => isset($validated['files']) ? count($validated['files']) : 0
            ]);

            // Handle file uploads if provided
            if (isset($validated['files']) && is_array($validated['files'])) {
                
                // Process new files
                $newUploadedFiles = $this->jsonFileUploadService->handleJsonFileUploads(
                    $validated['files'],
                    'motors'
                );

                if (!empty($validated['files']) && empty($newUploadedFiles)) {
                    return back()->withErrors(['files' => 'Gagal mengupload file. Pastikan file valid.']);
                }

                // Determine which old files to delete
                $filesToDelete = $this->jsonFileUploadService->getFilesToDelete($oldFiles, $newUploadedFiles);
                
                Log::info('Files to delete', [
                    'files_to_delete_count' => count($filesToDelete),
                    'files_to_delete' => $filesToDelete
                ]);

                // Delete old files that are no longer needed
                if (!empty($filesToDelete)) {
                    $this->jsonFileUploadService->deleteMultipleFiles($filesToDelete);
                }

                $uploadedFiles = $newUploadedFiles;
            }

            // Update motor data
            $motor->update([
                ...$validated,
                'files' => $uploadedFiles,
            ]);

            $fileCount = count($uploadedFiles);
            $message = isset($validated['files']) 
                ? "Motor berhasil diupdate dengan {$fileCount} file."
                : "Motor berhasil diupdate.";

            Log::info('Motor updated successfully', [
                'motor_id' => $motor->id,
                'final_files_count' => count($uploadedFiles)
            ]);

            return redirect()->route('dashboard.motor.index')->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Motor update error: ' . $e->getMessage(), [
                'motor_id' => $motor->id,
                'stack_trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengupdate data: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Motor $motor)
    {
        if ($motor->user_id !== Auth::id()) {
            return redirect()->route('dashboard.motor.index')->with('error', 'Unauthorized access');
        }

        try {
            Log::info('Deleting motor', [
                'motor_id' => $motor->id,
                'files_count' => count($motor->files ?? [])
            ]);

            // Delete all associated files first
            if (!empty($motor->files)) {
                $this->jsonFileUploadService->deleteMultipleFiles($motor->files);
                Log::info('Files deleted for motor', ['motor_id' => $motor->id]);
            }

            // Then delete the motor record
            $motor->delete();

            Log::info('Motor deleted successfully', ['motor_id' => $motor->id]);

            return redirect()->route('dashboard.motor.index')
                ->with('success', 'Motor berhasil dihapus beserta semua file terkait.');

        } catch (\Exception $e) {
            Log::error('Motor deletion error: ' . $e->getMessage(), [
                'motor_id' => $motor->id,
                'stack_trace' => $e->getTraceAsString()
            ]);
            return redirect()->route('dashboard.motor.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }
}