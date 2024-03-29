<?php

namespace App\Http\Controllers;

use App\Models\SeasonalCrop;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeasonalCrop",
 *     required={"id", "season", "crop"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="season", type="object", ref="#/components/schemas/Season"),
 *     @OA\Property(property="crop", type="object", ref="#/components/schemas/Crop"),
 * )
 */
class SeasonalCropController extends Controller
{
    /**
     * Get all crops for a specific season
     *
     * @OA\Get(
     *     tags={"Crops"},
     *     path="/crops/season/{id}",
     *     summary="Get all crops for a specific season",
     *     description="Returns all crops associated with a specific season from the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Season id",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all crops for the specified season",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/SeasonalCrop")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: No crops found for this season",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No crops found for this season")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getAllSeasonalCrops($id): JsonResponse
    {
        // Find all seasonal crops with the given season id
        $seasonalCrops = SeasonalCrop::with("season", "crop", "crop.resource")
            ->where("season_id", $id)
            ->get();
        // Check if seasonal crops exist
        if (count($seasonalCrops) < 1) {
            return response()->json(
                [
                    "message" => "No seasonal crops found for this season",
                ],
                404
            );
        }
        return response()->json($seasonalCrops);
    }
}
