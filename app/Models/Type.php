<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $fillable = ["name"];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    // TODO: Add relationship to every type model
}
