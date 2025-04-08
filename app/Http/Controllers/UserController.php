<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function select2(Request $request)
    {
        $users = User::selectRaw('users.id as value, users.email as label')
            ->leftJoin('teams', 'users.id', 'teams.owner')
            ->leftJoin('team_components', 'users.id', 'team_components.user_id')
            ->whereNull('team_components.user_id')
            ->whereNull('teams.owner')
            ->where('email', 'like', "{$request->busca}%")
            ->orderBy('email')
            ->take(10)
            ->get();

        return response()->json($users, 200);
    }
}
