<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ["name", "type_id", "icon"];

    protected $hidden = ["created_at", "updated_at", "type_id"];

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
