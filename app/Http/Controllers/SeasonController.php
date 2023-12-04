<?php

namespace App\Http\Controllers;

use App\Models\Season;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Seasons",description="Endpoints for seasons")
 * @OA\Schema(
 *     schema="Season",
 *     required={"id", "name"},
 *     @OA\Property(property="id", type="integer", example=4, minimum=1, maximum=4),
 *     @OA\Property(property="name", type="string", example="Winter")
 * )
 */
class SeasonController extends Controller
{
    /**
     * Get all seasons
     *
     * @OA\Get(
     *     tags={"Seasons"},
     *     path="/seasons",
     *     summary="Get all seasons",
     *     description="Returns all seasons from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all seasons",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Season")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Seasons don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No seasons found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllSeasons(): JsonResponse
    {
        $seasons = Season::with("characters")->get();
        // Check if seasons exist
        if (count($seasons) < 1) {
            return response()->json(
                [
                    "message" => "No seasons found",
                ],
                404
            );
        }
        return response()->json($seasons);
    }

    /**
     * Get season by id
     *
     * @OA\Get(
     *     tags={"Seasons"},
     *     path="/seasons/{id}",
     *     summary="Get season",
     *     description="Get a season by ID in the URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of season to return",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns season",
     *         @OA\JsonContent(ref="#/components/schemas/Season")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Season doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Season not found")
     *         )
     *     )
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function getSeasonById($id): JsonResponse
    {
        $season = Season::with("characters", "crops")->find($id);
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
