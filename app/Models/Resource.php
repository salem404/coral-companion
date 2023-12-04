<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = ["name", "icon"];

    protected $hidden = ["created_at", "updated_at"];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
