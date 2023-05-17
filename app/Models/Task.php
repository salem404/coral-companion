<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        "profile_id",
        "description",
        "completed",
        "character_id",
        "item_id",
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
