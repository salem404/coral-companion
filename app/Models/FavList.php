<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavList extends Model
{
    use HasFactory;

    protected $fillable = ["character_id", "item_id"];

    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}