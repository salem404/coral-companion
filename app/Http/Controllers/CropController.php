<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Crops",description="Endpoints for crops")
 * @OA\Schema(
 *     schema="Crop",
 *     required={"id", "resource_id", "category_id"},
 *     @OA\Property(property="id", type="integer", example=2,),
 *     @OA\Property(property="category_id", type="object", ref="#/components/schemas/Category"),
 *     @OA\Property(property="resource_id", type="object", ref="#/components/schemas/Resource"),
 *     @OA\Property(property="type", type="string", example="Vegetable"),
 *     @OA\Property(property="rank", type="string", example="D"),
 *     @OA\Property(property="seed_price", type="integer", example=20),
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
        $crops = Crop::with("category", "resource", "seasons")->get();
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
        $crop = Crop::with("category", "resource", "seasons")->find($id);
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
