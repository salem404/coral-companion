<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    use HasFactory;

    protected $fillable = ["name"];

    // Characters
    public function characters()
    {
        return $this->hasMany(Character::class);
    }

    // TODO: Add all different seasonal items type relationships
}
