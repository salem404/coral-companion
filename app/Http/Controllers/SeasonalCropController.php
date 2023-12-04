<?php

namespace App\Http\Controllers;

use App\Models\SeasonalCrop;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="SeasonalCrop",
 *     required={"id", "season_id", "crop_id"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="season_id", type="object", ref="#/components/schemas/Season"),
 *     @OA\Property(property="crop_id", type="integer", ref="#/components/schemas/Crop"),
 *)
 */
class SeasonalCropController extends Controller
{
    /**
     * Get all seasonal crops
     * @OA\Get(
     *     tags={"Crops"},
     *     path="/crops/season/{id}",
     *     summary="Get all seasonal crops",
     *     description="Returns all seasonal crops from the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Season id",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all seasonal crops",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/SeasonalCrop")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Seasonal crops don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No seasonal crops found for this season")
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
        $seasonalCrops = SeasonalCrop::with("season", "crop", "crop.resources")
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
