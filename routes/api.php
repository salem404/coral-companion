<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\SanctumController;
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
Route::controller(SanctumController::class)->group(function () {
    Route::post("/register", "register");
    Route::post("/login", "login");
    Route::get("/logout", "logout")->middleware("auth:sanctum");
});

// Seasons
Route::controller(SeasonController::class)->group(function () {
    Route::get("/seasons", "getAllSeasons");
    Route::get("/seasons/{id}", "getSeasonById");
});

// Characters
Route::controller(CharacterController::class)->group(function () {
    Route::get("/characters", "getAllCharacters");
    Route::get("/characters/{id}", "getCharacterById");
    Route::delete("/characters/{id}", "deleteCharacter")->middleware(
        "auth:sanctum"
    );
    Route::post("/characters", "createCharacter")->middleware("auth:sanctum");
    Route::put("/characters/{id}", "updateCharacter")->middleware(
        "auth:sanctum"
    );
});

// Profiles
Route::controller(ProfileController::class)->group(function () {
    Route::get("/profiles", "getAllProfiles");
    Route::get("/profiles/{id}", "getProfileById");
    Route::delete("/profiles/{id}", "deleteProfile")->middleware(
        "auth:sanctum"
    );
    Route::post("/profiles", "createProfile")->middleware("auth:sanctum");
    Route::put("/profiles/{id}", "updateProfile")->middleware("auth:sanctum");
});
