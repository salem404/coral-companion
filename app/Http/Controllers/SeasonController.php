<?php

namespace App\Http\Controllers;

use App\Models\Season;

class SeasonController extends Controller
{
    // Get all seasons
    public function getAllSeasons(): \Illuminate\Http\JsonResponse
    {
        $seasons = Season::with("characters")->get();
        // Check if seasons exist
        if (count($seasons) === 0) {
            return response()->json(
                [
                    "message" => "No seasons found",
                ],
                404
            );
        }
        return response()->json($seasons);
    }

    // Get a season by id
    public function getSeasonById($id): \Illuminate\Http\JsonResponse
    {
        $season = Season::with("characters")->find($id);
        // Check if season exists
        if (!$season) {
            return response()->json(
                [
                    "message" => "Season not found",
                ],
                404
            );
        }
        return response()->json($season);
    }
}
