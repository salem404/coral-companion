<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "birthday",
        "season_id",
        "gender",
        "occupation",
        "romanceable",
        "icon",
    ];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function favorites()
    {
        return $this->belongsToMany(FavList::class);
    }

    public function family()
    {
        return $this->belongsToMany(
            Character::class,
            "family",
            "character_id",
            "relative_id"
        );
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }
}
