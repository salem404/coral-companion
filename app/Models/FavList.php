<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FavList extends Model
{
    use HasFactory;

    protected $table = "fav_lists";
    protected $fillable = ["character_id", "item_id"];

    protected $hidden = ["created_at", "updated_at"];

    public function character(): BelongsTo
    {
        return $this->belongsTo(Character::class);
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
