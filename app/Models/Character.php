<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "birthday",
        "season_id",
        "gender",
        "occupation",
        "isRomanceable",
        "icon",
    ];

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function favorites(): BelongsToMany
    {
        return $this->belongsToMany(FavList::class);
    }

    public function family(): BelongsToMany
    {
        return $this->belongsToMany(
            Character::class,
            "family",
            "character_id",
            "relative_id"
        );
    }

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class);
    }
}
