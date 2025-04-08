<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MatchGameController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

//Validação de CSRF para o Sanctum
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::prefix('teams')->group(function () {
    Route::post('', [TeamController::class, 'store']);
    Route::post('members', [TeamController::class, 'addMembers']);

    Route::patch('upload/{team}', [TeamController::class, 'update']);
});

Route::prefix('users')->group(function () {
    Route::get('select2', [UserController::class, 'select2']);
});

Route::prefix('matches')->group(function () {
    Route::post('{matchGame}', [MatchGameController::class, 'update']);
    Route::get('generateRounds', [MatchGameController::class, 'generateRounds'])->name('generateRounds');
});
