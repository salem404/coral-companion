<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Crops",
 *     description="Endpoints for crops"
 * )
 *
 * @OA\Schema(
 *     schema="Crop",
 *     required={"id", "resource_id"},
 *     @OA\Property(property="id", type="integer", example=2, description="The unique identifier of the crop"),
 *     @OA\Property(property="resource_id", type="object", ref="#/components/schemas/Resource", description="The resource associated with the crop"),
 *     @OA\Property(property="type", type="string", example="Vegetable", description="The type of the crop"),
 *     @OA\Property(property="rank", type="string", example="D", description="The rank of the crop"),
 *     @OA\Property(property="seed_price", type="integer", example=20, description="The price of the seed for the crop"),
 * )
 */
class CropController extends Controller
{
    /**
     * Get all crops
     *
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
     * @return JsonResponse The response containing all the crops data if found, or an error message otherwise
     */
    public function getAllCrops(): JsonResponse
    {
        $crops = Crop::with("resource", "seasons")->get();
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

    /**
     * Get crop by id
     *
     * @OA\Get(
     *     tags={"Crops"},
     *     path="/crops/{id}",
     *     summary="Get crop by id",
     *     description="Returns a crop from the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of crop to return",
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
     * @param int $id The ID of the crop to retrieve
     * @return JsonResponse The response containing the crop data if found, or an error message otherwise
     */
    public function getCropById(int $id): JsonResponse
    {
        $crop = Crop::with("resource", "seasons")->find($id);
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
