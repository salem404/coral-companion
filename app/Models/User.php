<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    protected $table = "users";
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        "username",
        "email",
        "password",
        "name",
        "surname",
        "isAdmin",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "password",
        "remember_token",
        "created_at",
        "updated_at",
    ];

    public function profiles(): HasMany
    {
        return $this->hasMany(Profile::class);
    }
}
