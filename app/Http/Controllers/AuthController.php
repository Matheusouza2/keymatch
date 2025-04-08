<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Competition;
use App\Models\MatchGame;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{

    /**
     * Display the login view.
     */
    public function loginView()
    {
        if (Auth::check()) {
            return redirect()->intended('/app/home');
        } else {
            return Inertia::render('Auth/Index');
        }
    }

    /**
     * Handle an authentication attempt.
     *
     * @param Request $request
     * @return void
     */
    public function auth(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], true)) {
            return redirect()->intended('/app/home');
        } else {
            $user = User::where('email', $request->email)->first();
            if ($user == null) {
                return back()->withErrors([
                    'email' => "O email informado não foi encontrado em nosso sistema.",
                ]);
            } else {
                return back()->withErrors([
                    'senha' => "Verifique a senha informada e tente novamente.",
                ]);
            }
        }
    }

    /**
     * Display the create user view.
     *
     * @return void
     */
    public function create()
    {
        return Inertia::render('Auth/Create');
    }

    /**
     * Store a new user.
     *
     * @return void
     */
    public function store(UserRequest $request)
    {
        if (!str_contains(request('email'), '@univasf.edu.br') && !str_contains(request('email'), '@discente.univasf.edu.br')) {
            return $this::jsonResponse('O email deve ser institucional', 422, 'email');
        }
        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt(request('password')),
        ]);

        Auth::login($user, true);

        return redirect()->intended('/app/home');
    }

    /**
     * Logout the user and clear the session.
     *
     * @param Request $request
     * @return void
     */
    public function logout(Request $request)
    {
        Auth::logout();
        Session::flush();
        Cache::flush();

        return redirect()->intended('/');
    }

    /**
     * Display the home view.
     *
     * @return void
     */
    public function home()
    {
        $actualRound = MatchGame::selectRaw('IF(SUM(team1_score + team2_score) = 9, round +1, round) as round')->first();
        $teams = Team::select(['teams.name', 'teams.image', 'team2.name as team2_name', 'team2.image as team2_image', 'match_games.team1_score', 'match_games.team2_score'])
            ->join('match_games', 'teams.id', 'match_games.team1_id')
            ->join('teams as team2', 'team2.id', 'match_games.team2_id')
            ->where('match_games.round', $actualRound->round)
            ->get();



        $top3 = Competition::with('team')->orderByDesc('points')->take(3)->get();

        return Inertia::render('Home/Index', [
            'title' => 'Início',
            'actualRound' => $actualRound->round,
            'teams' => $teams,
            'top3' => $top3,
        ]);
    }
}
