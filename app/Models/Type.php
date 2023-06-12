<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    use HasFactory;

    protected $fillable = ["name"];

    protected $hidden = ["created_at", "updated_at"];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    // TODO: Add relationship to every type model
}
