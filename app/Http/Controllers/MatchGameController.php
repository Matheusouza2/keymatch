<?php

namespace App\Http\Controllers;

use App\Models\MatchGame;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MatchGameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matches = MatchGame::with('team1', 'team2')
            ->orderBy('id')
            ->get();
        if (Auth::user()->id == 1) {
            return Inertia::render('Match/Admin', [
                'title' => 'Partidas',
                'matches' => $matches,
            ]);
        } else {
            return Inertia::render('Match/Index', [
                'title' => 'Partidas',
                'matches' => $matches,
            ]);
        }
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
    public function show(MatchGame $matchGame)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MatchGame $matchGame)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MatchGame $matchGame)
    {
        $team1Score = $request["team1_score{$matchGame->id}"];
        $team2Score = $request["team2_score{$matchGame->id}"];

        $matchGame->team1_score = $team1Score;
        $matchGame->team2_score = $team2Score;

        $matchGame->save();
        $request->merge(['match' => $matchGame]);

        app(CompetitionController::class)->update($request);

        return $this::jsonResponse("Placar atualizado com sucesso!", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MatchGame $matchGame)
    {
        //
    }

    public function generateRounds()
    {
        $teams = Team::all()->toArray();

        $teamsCount = count($teams);

        if ($teamsCount % 2 != 0) {
            array_push($teams, [
                'id' => 0,
                'name' => 'BYE',
                'logo' => null,
            ]);
            $teamsCount++;
        }

        $rounds = [];

        $half = $teamsCount / 2;

        for ($round = 0; $round < $teamsCount - 1; $round++) {
            $actualRound = [];

            for ($i = 0; $i < $half; $i++) {
                $team1 = $teams[$i];
                $team2 = $teams[$teamsCount - 1 - $i];

                if ($team1['id'] != 0 && $team2['id'] != 0) {
                    $actualRound[] = [$team1, $team2];
                }
            }

            $rounds[] = $actualRound;

            $temp = array_splice($teams, 1);
            array_unshift($temp, array_pop($temp));
            $teams = array_merge([$teams[0]], $temp);
        }

        foreach ($rounds as $key => $value) {
            for ($i = 0; $i < count($value); $i++) {
                if (($value[$i][0]['id'] == 0 || $value[$i][1]['id'] == 0)) {
                    continue;
                }

                MatchGame::create([
                    'round' => $key + 1,
                    'team1_id' => $value[$i][0]['id'],
                    'team2_id' => $value[$i][1]['id'],
                ]);
            }
        }

        return $this::jsonResponse('Rodadas geradas com sucesso!', 200);
    }
}
