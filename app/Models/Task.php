<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        "profile_id",
        "description",
        "isCompleted",
        "character_id",
        "resource_id",
    ];

    protected $hidden = ["created_at", "updated_at"];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    public function character(): BelongsTo
    {
        return $this->belongsTo(Character::class);
    }

    public function resource(): BelongsTo
    {
        return $this->belongsTo(Resource::class);
    }
}
