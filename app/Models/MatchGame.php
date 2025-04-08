<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchGame extends Model
{
    protected $table = 'match_games';

    protected $fillable = [
        'round',
        'team1_id',
        'team2_id',
        'team1_score',
        'team2_score',
    ];

    public function team1()
    {
        return $this->belongsTo(Team::class, 'team1_id');
    }

    public function team2()
    {
        return $this->belongsTo(Team::class, 'team2_id');
    }

    public function getWinnerAttribute()
    {
        if ($this->team1_score > $this->team2_score) {
            return $this->team1;
        } elseif ($this->team2_score > $this->team1_score) {
            return $this->team2;
        } else {
            return null; // It's a draw
        }
    }
}
