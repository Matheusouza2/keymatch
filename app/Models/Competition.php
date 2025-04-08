<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    protected $fillable = [
        'team_id',
        'points',
        'wins',
        'losses',
        'draws',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
