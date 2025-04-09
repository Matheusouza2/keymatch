<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Models\Team;
use App\Models\TeamComponents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $team = Team::where('owner', Auth::user()->id)->with('user')->first();

        $members = TeamComponents::where('team_id', $team?->id)
            ->join('users', 'team_components.user_id', 'users.id')
            ->get(['users.name', 'users.email']);

        return Inertia::render('Teams/Index', [
            'team' => $team,
            'members' => $members,
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
    public function store(TeamRequest $request)
    {
        $team = Team::create([
            'name' => $request->name,
            'owner' => Auth::user()->id,
        ]);

        $request->merge(['team_id' => $team->id]);

        app(CompetitionController::class)->store($request);

        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $file = $request->file('image');

        $path = $file->store('assets/images', 'public');

        $team->update([
            'image' => "/storage/$path",
        ]);

        return $this::jsonResponse('Imagem atualizada com sucesso', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }

    public function addMembers(Request $request)
    {
        $team = Team::where('owner', Auth::user()->id)->first();

        TeamComponents::create([
            'team_id' => $team->id,
            'user_id' => $request->user_id,
        ]);

        return $this::jsonResponse('Membro adicionado com sucesso', 200);
    }
}
