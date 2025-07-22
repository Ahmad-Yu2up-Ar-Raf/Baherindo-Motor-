<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
      
            $search = $request->input('search');

$query = Siswa::where('user_id', Auth::id());

if ($search) {
$query->where(function($q) use ($search) {
$searchLower = strtolower($search);
$q->whereRaw('LOWER(name) LIKE ?', ["%{$searchLower}%"]);
});
}


$siswa = $query->orderBy('created_at', 'desc')

->with('kelas')
->paginate($perPage);


$siswa->through(function($item) {
return [
    ...$item->toArray(),

];
});



$kelas = Kelas::where('user_id', Auth::id())
->orderBy('created_at', 'desc')
->with('siswa')
->withCount('siswa')
->paginate($perPage);



return Inertia::render('dashboard/siswa', [
'siswa' => $siswa->items() ?? [],

'kelas' => $kelas->items() ?? [],
'filters' => [
    'search' => request('search', ''),
 
],
'pagination' => [
    'data' => $siswa->toArray(),
    'total' => $siswa->total(),
    'currentPage' => $siswa->currentPage(),
    'perPage' => $siswa->perPage(),
    'lastPage' => $siswa->lastPage(),
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:siswas,name|max:255|string',
            'kelas_id' => 'nullable|exists:kelas,id',
        ]);
    
        Siswa::create([
            ...$validated,
            'user_id' => Auth::id()
        ]);
    
        return redirect()->route('dashboard.siswa.index')->with('success', 'Siswa created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $siswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Siswa $siswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Siswa $siswa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa)
    {
        //
    }
}
