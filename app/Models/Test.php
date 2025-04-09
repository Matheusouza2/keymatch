<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = [
        'file',
        'match_game_id',
        'team1_release',
        'team2_release',
    ];
}
