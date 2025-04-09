<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $table = Competition::with('team')
            ->orderByDesc('points')
            ->orderByDesc('wins')
            ->orderByDesc('draws')
            ->orderBy('losses')
            ->get();

        return Inertia::render('Competition/Index', [
            'table' => $table,
            'title' => 'Competição',
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
        Competition::create([
            'team_id' => $request->team_id,
            'points' => 0,
            'wins' => 0,
            'losses' => 0,
            'draws' => 0,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Competition $competition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Competition $competition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $match = $request->match;
        $team1 = $match->team1_id;
        $team2 = $match->team2_id;

        $competition1 = Competition::where('team_id', $team1)->first();
        $competition2 = Competition::where('team_id', $team2)->first();

        if ($request->winner != null) {
            if ($request->winner->id == $team1) {
                $competition1->points += 3;
                $competition1->wins += 1;
                $competition2->losses += 1;
            } else {
                $competition2->points += 3;
                $competition2->wins += 1;
                $competition1->losses += 1;
            }
        } else {
            $competition1->points += 1;
            $competition2->points += 1;
            $competition1->draws += 1;
            $competition2->draws += 1;
        }

        $competition1->save();
        $competition2->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competition $competition)
    {
        //
    }
}
