<?php

namespace App\Http\Controllers;

use App\Models\Mobil;
use App\Models\Motor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
   $record = Motor::all()->where('user_id', Auth::id());

   $counts = Motor::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as motor'))
   ->groupBy(DB::raw('DATE(created_at)'))->where('user_id', Auth::id())
   ->get();




   $countsHighest = Motor::select(DB::raw('name'), DB::raw('harga as price'))
   ->orderBy('harga', 'desc')->limit(5)->where('user_id', Auth::id())->get();





$merekCount = $record->groupBy('merek')->map(function ($group) {
    return $group->count();   });

$statusCount = $record->groupBy('status')->map(function ($group) {
    return $group->count();   });
$kategoriCount = $record->groupBy('kategori')->map(function ($group) {
    return $group->count();   });

  $totalMotor = Motor::where('user_id', Auth::id())->count();
  $terjualMotor = Motor::where('user_id', Auth::id())->where('status', 'terjual')->count();

  $totalMobil = Mobil::where('user_id', Auth::id())->count();
  $terjualMobil = Mobil::where('user_id', Auth::id())->where('status', 'terjual')->count();

          return Inertia::render('dashboard/index',[
                'reports' => [
                    'totalMotor' => $totalMotor,
                    'totalMotorTerjual' => $terjualMotor,
                    'totalMobil' => $totalMobil,
                    'totalMobilTerjual' => $terjualMobil,
                    'merekCount' => $merekCount,
                    'countsHighest' => $countsHighest,
                    'statusCount' => $statusCount,
                    'kategoriCount' => $kategoriCount,
                    'countsByDate' => $counts,
                ],
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
