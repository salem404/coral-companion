<?php

namespace App\Http\Controllers;

use App\Models\Season;
use Illuminate\Http\Request;

class SeasonController extends Controller
{
    // Get all seasons
    public function getAllSeasons(): \Illuminate\Http\JsonResponse
    {
        $seasons = Season::all();
        // Check if seasons exist
        if (count($seasons) === 0) {
            return response()->json(
                [
                    "message" => "No seasons found",
                ],
                404
            );
        }
        return response()->json($seasons, 200);
    }

    // Get a season by id
    public function getSeasonById($id): \Illuminate\Http\JsonResponse
    {
        $season = Season::find($id);
        // Check if season exists
        if (!$season) {
            return response()->json(
                [
                    "message" => "Season not found",
                ],
                404
            );
        }
        return response()->json($season, 200);
    }
}
