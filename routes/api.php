<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});

// Users
Route::post("/register", "App\Http\Controllers\SanctumController@register");
Route::post("/login", "App\Http\Controllers\SanctumController@login");
Route::get(
    "/logout",
    "App\Http\Controllers\SanctumController@logout"
)->middleware("auth:sanctum");

// Seasons
Route::get("/seasons", "App\Http\Controllers\SeasonController@getAllSeasons");
Route::get(
    "/seasons/{id}",
    "App\Http\Controllers\SeasonController@getSeasonById"
);

// Characters
Route::get(
    "/characters",
    "App\Http\Controllers\CharacterController@getAllCharacters"
);
Route::get(
    "/characters/{id}",
    "App\Http\Controllers\CharacterController@getCharacterById"
);
Route::delete(
    "/characters/{id}",
    "App\Http\Controllers\CharacterController@deleteCharacter"
)->middleware("auth:sanctum");
Route::post(
    "/characters",
    "App\Http\Controllers\CharacterController@createCharacter"
)->middleware("auth:sanctum");
Route::put(
    "/characters/{id}",
    "App\Http\Controllers\CharacterController@updateCharacter"
)->middleware("auth:sanctum");
