<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Season extends Model
{
    use HasFactory;

    protected $fillable = ["name"];

    protected $hidden = ["created_at", "updated_at"];

    // Characters
    public function characters(): HasMany
    {
        return $this->hasMany(Character::class);
    }

    // Crops
    public function seasonalCrops(): HasMany
    {
        return $this->hasMany(SeasonalCrop::class);
    }

    // TODO: Add all different seasonal items type relationships
}
