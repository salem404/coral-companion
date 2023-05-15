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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//users
Route::post('/register', 'App\Http\Controllers\SanctumController@register');
Route::post('/login', 'App\Http\Controllers\SanctumController@login');
Route::get('/logout', 'App\Http\Controllers\SanctumController@logout')->middleware('auth:sanctum');


/*genres
Route::get('/genres', 'App\Http\Controllers\GenresController@getAllGenres');
Route::get('/genre/{id}', 'App\Http\Controllers\GenresController@genreById');
Route::post('/genre', 'App\Http\Controllers\GenresController@create')->middleware('auth:sanctum');;
Route::delete('/genre/{id}', 'App\Http\Controllers\GenresController@deleteGenreById')->middleware('auth:sanctum');;

//songs
Route::get('/songs', 'App\Http\Controllers\SongsController@getAllSongs');
Route::get('/song/{id}', 'App\Http\Controllers\SongsController@getSongById');
Route::get('/songs/genre/{id}', 'App\Http\Controllers\SongsController@getSongsByGenre');
Route::get('/songs/artist/{id}', 'App\Http\Controllers\SongsController@getSongsByArtist');
Route::post('/song', 'App\Http\Controllers\SongsController@create')->middleware('auth:sanctum');
Route::delete('/song/{id}', 'App\Http\Controllers\SongsController@deleteById')->middleware('auth:sanctum');


//artists
Route::get('/artists', 'App\Http\Controllers\ArtistsController@getAllArtist');
Route::get('/artist/{id}', 'App\Http\Controllers\ArtistsController@getArtistById');
Route::post('/artist', 'App\Http\Controllers\ArtistsController@create')->middleware('auth:sanctum');;
Route::delete('/artist/{id}', 'App\Http\Controllers\ArtistsController@deleteArtistById')->middleware('auth:sanctum');;

//playlists
Route::get('/playlists', 'App\Http\Controllers\PlaylistController@getAllPlaylist')->middleware('auth:sanctum');
Route::post('/playlist', 'App\Http\Controllers\PlaylistController@createPlaylist')->middleware('auth:sanctum');
Route::delete('/playlist/{id}', 'App\Http\Controllers\PlaylistController@deletePlaylist')->middleware('auth:sanctum');
Route::post('/playlist/{id}', 'App\Http\Controllers\PlaylistController@addSongToPlaylist')->middleware('auth:sanctum');


//favorites
Route::get('/favorites', 'App\Http\Controllers\FavoritesController@favoritesByUser')->middleware('auth:sanctum');
Route::post('/favorite/{id}', 'App\Http\Controllers\FavoritesController@createFavorite')->middleware('auth:sanctum');
Route::delete('/favorite/{id}', 'App\Http\Controllers\FavoritesController@deleteaFavoriteById')->middleware('auth:sanctum');
*/