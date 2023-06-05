<?php

namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Families",description="Everything about Families")
 * @OA\Component (
 *     @OA\Schema(
 *      schema="Family",
 *           @OA\Property(
 *              property="family_id",
 *              type="integer",
 *              example=1
 *          ),
 *          @OA\Property(
 *              property="character_id",
 *              type="object",
 *                  @OA\Property(
 *                      ref="#/components/schemas/Character"
 *                  )
 *          ),
 *          @OA\Property(
 *              property="familiar_id",
 *              type="integer",
 *              example=2
 *          ),
 *          @OA\Property(
 *              property="relationship",
 *              type="string",
 *              example="Mother"
 *          )
 *      )
 * ),
 */
class FamilyController extends Controller
{
    /**
     * Create a new family
     * @OA\Post(
     *     path="/api/families",
     *     summary="Create a new family",
     *     tags={"Families"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(ref="#/components/schemas/Family")
     *          )
     *      ),
     *     @OA\Response(
     *      response=201,
     *      description="Family created successfully"
     *      ),
     *     @OA\Response(
     *      response=401,
     *      description="You are not authorized to create a family",
     *     ),
     *     @OA\Response(
     *      response=400,
     *      description="Bad request. Please enter valid data"
     *     )
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function createFamily(
        Request $request
    ): JsonResponse {
        // Validate request
        $validator = Validator::make($request->all(), [
            "character_id" => "required|integer",
            "familiar_id" => "required|integer",
            "relationship" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create family
        Family::create([
            "character_id" => $request["character_id"],
            "familiar_id" => $request["familiar_id"],
            "relationship" => $request["relationship"],
        ]);

        return response()->json(
            [
                "message" => "Family created successfully",
            ],
            201
        );
    }

    /**
     * Get all families
     * @OA\Get(
     *     path="/api/families",
     *     summary="Get all families",
     *     tags={"Families"},
     *     @OA\Response(
     *      response=200,
     *      description="All families",
     *      @OA\JsonContent(
     *          type="array",
     *          @OA\Items(ref="#/components/schemas/Family")
     *      )
     *    ),
     *     @OA\Response(
     *      response=404,
     *      description="No families found"
     *   )
     * )
     * @return JsonResponse
     */
    public function getAllFamilies(): JsonResponse
    {
        $families = Family::with("character", "familiar")->get();
        // Check if families exist
        if (count($families) < 1) {
            return response()->json(
                [
                    "message" => "No families found",
                ],
                404
            );
        }
        return response()->json($families);
    }

    // Get a family
    public function getFamily($id): JsonResponse
    {
        $family = Family::with("character", "familiar")->find($id);
        // Check if family exists
        if (!$family) {
            return response()->json(
                [
                    "message" => "Family with id {$id} not found",
                ],
                404
            );
        }
        return response()->json($family);
    }

    // Update a family
    public function updateFamily(
        Request $request,
        $id
    ): JsonResponse {
        $family = Family::find($id);
        // Check if family exists
        if (!$family) {
            return response()->json(
                [
                    "message" => "Family with id {$id} not found",
                ],
                404
            );
        }
        // Check if user is admin
        $user = Auth::user();
        if (!$user->isAdmin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to update this profile",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "character_id" => "required|integer",
            "familiar_id" => "required|integer",
            "relationship" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update family
        $family->update([
            "character_id" => $request["character_id"],
            "familiar_id" => $request["familiar_id"],
            "relationship" => $request["relationship"],
        ]);

        return response()->json([
            "message" => "Family updated successfully",
        ]);
    }

    // Delete a family
    public function deleteFamily($id): JsonResponse
    {
        $family = Family::find($id);
        // Check if family exists
        if (!$family) {
            return response()->json(
                [
                    "message" => "Family with id {$id} not found",
                ],
                404
            );
        }
        // Check if user is admin
        $user = Auth::user();
        if (!$user->isAdmin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete this family",
                ],
                401
            );
        }

        // Delete family
        $family->delete();
        return response()->json([
            "message" => "Family with id {$id} deleted successfully",
        ]);
    }
}
