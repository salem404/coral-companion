<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Crop extends Model
{
    use HasFactory;

    protected $table = "crops";

    protected $fillable = ["item_id", "type_id", "isGigantic"];

    protected $hidden = ["created_at", "updated_at"];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }

    public function seasonalCrops(): HasMany
    {
        return $this->hasMany(SeasonalCrop::class);
    }
}
