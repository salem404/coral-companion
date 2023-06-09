<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Family extends Model
{
    use HasFactory;

    protected $table = "families";
    protected $fillable = ["character_id", "familiar_id", "relationship"];

    protected $hidden = ["created_at", "updated_at"];

    public function character(): BelongsTo
    {
        return $this->belongsTo(Character::class);
    }

    public function familiar(): BelongsTo
    {
        return $this->belongsTo(Character::class);
    }
}
