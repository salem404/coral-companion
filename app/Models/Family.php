<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = ["character_id", "familiar_id", "relationship"];

    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    public function familiar()
    {
        return $this->belongsTo(Character::class);
    }
}
