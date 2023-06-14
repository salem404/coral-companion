<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(name="Crops",description="Endpoints for crops")
 * @OA\Schema(
 *     schema="Crop",
 *     required={"id", "name"},
 *     @OA\Property(property="id", type="integer", example=2,),
 *     @OA\Property(property="type_id", type="object", ref="#/components/schemas/Type"),
 *     @OA\Property(property="isGigantic", type="boolean"),
 * )
 */
class CropController extends Controller
{
    /**
     * Get all crops
     * @OA\Get(
     *     tags={"Crops"},
     *     path="/crops",
     *     summary="Get all crops",
     *     description="Returns all crops from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all crops",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Crop")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Crops don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No crops found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllCrops(): JsonResponse
    {
        $crops = Crop::with("type", "item")->get();
        // Check if crops exist
        if (count($crops) < 1) {
            return response()->json(
                [
                    "message" => "No crops found",
                ],
                404
            );
        }
        return response()->json($crops);
    }

    // Get crop by id
    /**
     * @OA\Get(
     *     tags={"Crops"},
     *     path="/crops/{id}",
     *     summary="Get crop by id",
     *     description="Returns a crop from the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="id of crop to return",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             minimum=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns a crop",
     *         @OA\JsonContent(ref="#/components/schemas/Crop")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Crop doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No crop found with given id")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getCropById(int $id): JsonResponse
    {
        $crop = Crop::with("type", "item")->find($id);
        // Check if crop exists
        if (!$crop) {
            return response()->json(
                [
                    "message" => "No crop found with given id",
                ],
                404
            );
        }
        return response()->json($crop);
    }
}
