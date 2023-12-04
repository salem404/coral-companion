<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = [
        "resource_id",
        "category_id",
        "type",
        "rank",
        "seed_price",
    ];

    protected $hidden = ["created_at", "updated_at"];

    public function resource(): BelongsTo
    {
        return $this->belongsTo(Resource::class);
    }

    public function seasons(): HasMany
    {
        return $this->hasMany(SeasonalCrop::class);
    }
}
