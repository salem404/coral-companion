<?php

namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Families", description="Endpoints for families")
 * @OA\Schema(
 *     schema="Family",
 *     required={"character_id", "familiar_id", "relationship"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="character_id", type="object", ref="#/components/schemas/Character"),
 *     @OA\Property(property="familiar_id", type="object", ref="#/components/schemas/Character"),
 *     @OA\Property(property="relationship", type="string", example="Mother"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-03-24 14:48:00"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-03-24 14:48:00")
 * )
 * @OA\RequestBody(
 *     request="FamilyCreate",
 *     required=true,
 *     @OA\JsonContent(required={"character_id", "familiar_id", "relationship"},
 *             @OA\Property(property="character_id", type="integer", example=1),
 *             @OA\Property(property="familiar_id", type="integer", example=2),
 *             @OA\Property(property="relationship", type="string", example="Mother")
 *     )
 * ),
 * @OA\RequestBody(
 *     request="FamilyUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *             @OA\Property(property="character_id", type="integer", example=1),
 *             @OA\Property(property="familiar_id", type="integer", example=2),
 *             @OA\Property(property="relationship", type="string", example="Mother")
 *     )
 * )
 */
class FamilyController extends Controller
{
    /**
     * @OA\Post(
     *     tags={"Families"},
     *     path="/families",
     *     summary="Create a new family",
     *     description="Create a new family using the data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/FamilyCreate"),
     *     @OA\Parameter(
     *         name="Accept",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="application/json"
     *         )
     *     ),
     *     @OA\Response(response=201, description="Success: Family created",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Family created successfully")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Bad request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The character_id field is required")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized: Only admins can create a family",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to create a family")
     *         )
     *     )
     * )
     * @param Request $request
     * @return JsonResponse
     */
    public function createFamily(Request $request): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to create a family",
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

        // Check if family already exists
        $family = Family::where("character_id", "=", $request->character_id)
            ->where("familiar_id", "=", $request->familiar_id)
            ->first();
        if ($family) {
            return response()->json(
                [
                    "message" => "Family already exists",
                ],
                400
            );
        }

        // Check if character and familiar exist
        $character = Character::find($request->character_id);
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id  $request->character_id not found",
                ],
                400
            );
        }
        $familiar = Character::find($request->familiar_id);
        if (!$familiar) {
            return response()->json(
                [
                    "message" => "Familiar with id $request->familiar_id not found",
                ],
                400
            );
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
     *
     * @OA\Get(
     *     tags={"Families"},
     *     path="/families",
     *     summary="Get all families",
     *     description="Get all families from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all families",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Family")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Families don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No families found")
     *         )
     *     )
     * )
     *
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

    /**
     * Get a family
     *
     * @OA\Get(
     *     tags={"Families"},
     *     path="/families/{id}",
     *     summary="Get a family",
     *     description="Get a family by ID in the URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the family to return",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns the family",
     *         @OA\JsonContent(ref="#/components/schemas/Family")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Family doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Family with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getFamilyById($id): JsonResponse
    {
        $family = Family::with("character", "familiar")->find($id);

        // Check if family exists
        if (!$family) {
            return response()->json(
                [
                    "message" => "Family with id $id not found",
                ],
                404
            );
        }
        return response()->json($family);
    }

    /**
     * Update a family
     *
     * @OA\Put(
     *     tags={"Families"},
     *     path="/families/{id}",
     *     summary="Update a family",
     *     description="Update a family by ID in the URL and data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the family to update",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(ref="#/components/requestBodies/FamilyUpdate"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Family updated",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Family updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The relationship field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can update a family",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update a family")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Family doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Family with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateFamily(Request $request, $id): JsonResponse
    {
        $family = Family::find($id);
        // Check if family exists
        if (!$family) {
            return response()->json(
                [
                    "message" => "Family with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update a family",
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

        // Check if character and familiar exist
        $character = Character::find($request->character_id);
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id  $request->character_id not found",
                ],
                400
            );
        }
        $familiar = Character::find($request->familiar_id);
        if (!$familiar) {
            return response()->json(
                [
                    "message" => "Familiar with id $request->familiar_id not found",
                ],
                400
            );
        }

        // Update family
        $family->update([
            "character_id" => $request->character_id,
            "familiar_id" => $request->familiar_id,
            "relationship" => $request->relationship,
        ]);

        return response()->json([
            "message" => "Family updated successfully",
        ]);
    }

    /**
     * Delete a family
     * @OA\Delete(
     *     tags={"Families"},
     *     path="/families/{id}",
     *     summary="Delete a family",
     *     description="Delete a family by ID sent in the URL. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the family to delete",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="Content-Type",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="application/json"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="Accept",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="application/json"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Family deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Family with id 1 deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can delete a family",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete a family")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Family doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Family with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteFamily($id): JsonResponse
    {
        $family = Family::find($id);
        // Check if family exists
        if (!$family) {
            return response()->json(
                [
                    "message" => "Family with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete a family",
                ],
                401
            );
        }

        // Delete family
        $family->delete();

        return response()->json([
            "message" => "Family deleted successfully",
        ]);
    }
}
