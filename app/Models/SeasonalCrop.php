<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeasonalCrop extends Model
{
    use HasFactory;

    protected $table = "seasonal_crops";

    protected $fillable = ["season_id", "crop_id"];

    protected $hidden = ["created_at", "updated_at"];

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function crop(): BelongsTo
    {
        return $this->belongsTo(Crop::class);
    }
}
