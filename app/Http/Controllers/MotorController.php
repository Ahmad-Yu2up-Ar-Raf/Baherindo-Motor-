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
            $uploadedFiles = $motor->files ?? [];

            // Handle file uploads if provided
            if ($request->hasFile('files')) {
                // Traditional file upload
                $this->fileUploadService->deleteMultipleFiles($motor->files ?? []);
                $uploadedFiles = $this->fileUploadService->handleMultipleUploads(
                    $request->file('files'),
                    'motors'
                );
            } elseif (isset($validated['files']) && is_array($validated['files'])) {
                // JSON file data upload
                $this->jsonFileUploadService->deleteMultipleFiles($motor->files ?? []);
                $uploadedFiles = $this->jsonFileUploadService->handleJsonFileUploads(
                    $validated['files'],
                    'motors'
                );
            }

            if (isset($validated['files']) && empty($uploadedFiles)) {
                return back()->withErrors(['files' => 'Gagal mengupload file. Pastikan file valid.']);
            }

            $motor->update([
                ...$validated,
                'files' => $uploadedFiles,
            ]);

            $fileCount = count($uploadedFiles);
            $message = isset($validated['files']) 
                ? "Motor berhasil diupdate dengan {$fileCount} file."
                : "Motor berhasil diupdate.";

            return redirect()->route('dashboard.motor.index')->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Motor update error: ' . $e->getMessage());
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
            $this->jsonFileUploadService->deleteMultipleFiles($motor->files ?? []);
            $motor->delete();

            return redirect()->route('dashboard.motor.index')
                ->with('success', 'Motor berhasil dihapus beserta semua file terkait.');

        } catch (\Exception $e) {
            Log::error('Motor deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.motor.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data.');
        }
    }
}