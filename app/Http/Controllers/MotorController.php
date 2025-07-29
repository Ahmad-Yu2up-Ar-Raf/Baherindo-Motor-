<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MotorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
      
            $search = $request->input('search');

            $query = Motor::where('user_id', Auth::id());

            if ($search) {
            $query->where(function($q) use ($search) {
            $searchLower = strtolower($search);
            $q->whereRaw('LOWER(name) LIKE ?', ["%{$searchLower}%"]);
            });
            }
            
            
            $motor = $query->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
            
            $motor->through(function($item) {
            return [
                ...$item->toArray(),
            
            ];
            });
            




        return Inertia::render('dashboard/motor', [
            'motor' => $motor->items() ?? [],
'filters' => [
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

        dd($request);
        $validated = $request->validate([
            'name' => 'required|unique:motors,name|max:255|string',
          'harga' => 'required|numeric|min:0|max:9999999999999.99',
          'dp_minimum' => 'nullable|numeric|min:0|max:9999999999999.99',
          'deskripsi' => 'nullable|string|max:1000',
          'merek' => 'nullable|string',
          'kategori' => 'nullable|string',
          'masa_berlaku_pajak' => 'nullable|date',
'files' => 'required',
// 'files.*' => 'required|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
        ]); 
    





//    Motor::create([
//             ...$validated,
//             'user_id' => Auth::id()
//         ]);
        

 

//         return redirect()->route('dashboard.motor.index')->with('success', 'Siswa created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Motor $motor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Motor $motor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Motor $motor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Motor $motor)
    {
        //
    }
}
