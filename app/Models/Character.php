<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    protected $hidden = ["created_at", "updated_at"];

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(FavList::class);
    }

    public function family(): HasMany
    {
        return $this->hasMany(Family::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
