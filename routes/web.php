<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\MatchGameController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('', [AuthController::class, 'loginView'])->name('login');
Route::post('/auth', [AuthController::class, 'auth'])->name('auth');
Route::post('/new-user', [AuthController::class, 'store'])->name('store.user');

Route::get('create', [AuthController::class, 'create'])->name('user.create');

Route::get('logout', [AuthController::class, 'logout'])->name('logout');

Route::prefix('app')->middleware('auth')->group(function () {
    /**
     * Home
     */
    Route::get('home', [AuthController::class, 'home'])->name('home');

    /**
     * Teams
     */
    Route::prefix('teams')->group(function () {
        Route::get('', [TeamController::class, 'index']);
    });

    /**
     * Competitions
     */
    Route::prefix('competition')->group(function () {
        Route::get('', [CompetitionController::class, 'index']);
    });

    /**
     * Matches
     */
    Route::prefix('match')->group(function () {
        Route::get('', [MatchGameController::class, 'index']);
        Route::get('/{matchGame}', [MatchGameController::class, 'show'])->name('match.show');
    });
});
