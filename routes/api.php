<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\SanctumController;
use App\Http\Controllers\SeasonalCropController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UsersController;
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
    Route::get("/check-token", "checkToken")->middleware("auth:sanctum");
});
Route::controller(UsersController::class)->group(function () {
    Route::get("/users", "getAllUsers");
    Route::get("/users/{id}", "getUserById");
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
    Route::get("/characters/season/{season_id}", "getCharactersBySeasonId");
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
    Route::get("/user/{id}/profiles", "getProfilesByUserId");
    Route::delete("/profiles/{id}", "deleteProfile")->middleware(
        "auth:sanctum"
    );
    Route::post("/profiles", "createProfile")->middleware("auth:sanctum");
    Route::put("/profiles/{id}", "updateProfile")->middleware("auth:sanctum");
});

// Resources
Route::controller(ResourceController::class)->group(function () {
    Route::get("/resources", "getAllResources");
    Route::get("/resources/{id}", "getResourceById");
    Route::delete("/resources/{id}", "deleteResource")->middleware(
        "auth:sanctum"
    );
    Route::post("/resources", "createResource")->middleware("auth:sanctum");
    Route::put("/resources/{id}", "updateResource")->middleware("auth:sanctum");
});

// Crops
Route::controller(CropController::class)->group(function () {
    Route::get("/crops", "getAllCrops");
    Route::get("/crops/{id}", "getCropById");
});

// Seasonal Crops
Route::controller(SeasonalCropController::class)->group(function () {
    Route::get("/crops/season/{id}", "getAllSeasonalCrops");
});

// Tasks
Route::controller(TaskController::class)->group(function () {
    Route::get("/tasks", "getAllTasks");
    Route::get("/tasks/{id}", "getTaskById");
    Route::get("/profile/{id}/tasks", "getTasksByProfileId");
    Route::delete("/tasks/{id}", "deleteTask")->middleware("auth:sanctum");
    Route::post("/tasks", "createTask")->middleware("auth:sanctum");
    Route::put("/tasks/{id}", "updateTask")->middleware("auth:sanctum");
});
