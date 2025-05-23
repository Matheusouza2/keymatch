<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'image',
        'owner',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'owner', 'id');
    }

    public function members()
    {
        return $this->hasMany(TeamComponents::class, 'team_id', 'id');
    }
}
