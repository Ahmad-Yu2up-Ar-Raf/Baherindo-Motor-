<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMobilRequest;
use App\Http\Requests\UpdateMobilRequest;
use App\Models\Mobil;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MobilController extends Controller
{


    protected $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
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
        $query = Mobil::where('user_id', Auth::id());

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

        $mobil = $query->orderBy('created_at', 'desc')->paginate($perPage);
            
        $mobil->through(function($item) {
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

        return Inertia::render('dashboard/mobil', [
            'mobil' => $mobil->items() ?? [],
            'mereks' => [
                'search' => request('search', ''),
            ],
            'pagination' => [
                'data' => $mobil->toArray(),
                'total' => $mobil->total(),
                'currentPage' => $mobil->currentPage(),
                'perPage' => $mobil->perPage(),
                'lastPage' => $mobil->lastPage(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateMobilRequest $request)
    {
        try {
            // Observer akan handle file upload secara otomatis
            $mobil = Mobil::create([
                ...$request->validated(),
                'user_id' => Auth::id()
            ]);

            $fileCount = count($mobil->files ?? []);
            $message = $fileCount > 0 
                ? "Mobil berhasil ditambahkan dengan {$fileCount} file."
                : "Mobil berhasil ditambahkan.";

            return redirect()->route('dashboard.mobil.index')
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Mobil creation error: ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Mobil $mobil)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mobil $mobil)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMobilRequest $request, Mobil $mobil)
    {
        try {
            // Observer akan handle file upload dan delete file lama secara otomatis
            $mobil->update($request->validated());

            $fileCount = count($mobil->files ?? []);
            $message = request()->hasFile('files') || request()->has('files')
                ? "Mobil berhasil diupdate dengan {$fileCount} file."
                : "Mobil berhasil diupdate.";

            return redirect()->route('dashboard.mobil.index')
                ->with('success', $message);

        } catch (\Exception $e) {
            Log::error('Mobil update error: ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat mengupdate data: ' . $e->getMessage()
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ids = $request->input('ids');
        if (empty($ids)) {
            return redirect()->route('dashboard.mobil.index')
                ->with('error', 'Tidak ada mobil yang dipilih untuk dihapus.');
        }

        // Validasi apakah semua ID milik user yang sedang login
        $mobils = Mobil::whereIn('id', $ids)->where('user_id', Auth::id())->get();
        if ($mobils->count() !== count($ids)) {
            return redirect()->route('dashboard.mobil.index')
                ->with('error', 'Unauthorized access atau mobil tidak ditemukan.');
        }

        try {
            DB::beginTransaction();
            
            // SOLUSI: Delete satu per satu agar Observer terpicu
            foreach ($mobils as $mobil) {
                $mobil->delete(); // Ini akan trigger observer events
            }
            
            DB::commit();

            $deletedCount = $mobils->count();
            return redirect()->route('dashboard.mobil.index')
                ->with('success', "{$deletedCount} Mobil berhasil dihapus beserta semua file terkait.");

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Mobil deletion error: ' . $e->getMessage());
            return redirect()->route('dashboard.mobil.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage());
        }
    }
}
