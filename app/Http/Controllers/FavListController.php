<?php

namespace App\Http\Controllers;

use App\Models\FavList;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Favorite Lists", description="Endpoints for favorite lists")
 * @OA\Schema(
 *     schema="FavList",
 *     required={"id","character_id", "item_id"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="character_id", type="object", ref="#/components/schemas/Character"),
 *     @OA\Property(property="item_id", type="object", ref="#/components/schemas/Item"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-03-26T13:26:14.000000Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-03-26T13:26:14.000000Z")
 * )
 * @OA\RequestBody(
 *     request="FavListCreate",
 *     required=true,
 *     @OA\JsonContent(required={"character_id", "item_id"},
 *         @OA\Property(property="character_id", type="integer", example=1),
 *         @OA\Property(property="item_id", type="integer", example=1)
 *     )
 * ),
 * @OA\RequestBody(
 *     request="FavListUpdate",
 *     required=true,
 *     @OA\JsonContent(required={"character_id", "item_id"},
 *         @OA\Property(property="character_id", type="integer", example=1),
 *         @OA\Property(property="item_id", type="integer", example=1)
 *     )
 * )
 */
class FavListController extends Controller
{
    /**
     * @OA\Post(
     *     tags={"Favorite Lists"},
     *     path="/favlists",
     *     summary="Create a new favorite list",
     *     description="Create a new favorite list using the data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/FavListCreate"),
     *     @OA\Response(response=201, description="Sucess: Favorite list created",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Favorite list created successfully")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Bad request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The character_id field is required")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized. Only admins can create new favorite lists",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to create a favorite list")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createFavList(Request $request): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to create a favorite list",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "character_id" => "required|integer",
            "item_id" => "required|integer",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create favlist
        $favlist = FavList::create([
            "character_id" => $request->character_id,
            "item_id" => $request->item_id,
        ]);

        return response()->json(
            [
                "message" => "Favorite list created successfully",
            ],
            201
        );
    }

    /**
     * Get all favorite lists
     *
     * @OA\Get(
     *     tags={"Favorite Lists"},
     *     path="/favlists",
     *     summary="Get all favorite lists",
     *     description="Get all favorite lists from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all favorite lists",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/FavList")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No favorite lists found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No favorite lists found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllFavLists(): JsonResponse
    {
        $favlists = FavList::with("character", "item")->get();
        // Check if favlists exist
        if (count($favlists) < 1) {
            return response()->json(
                [
                    "message" => "No favorite lists found",
                ],
                404
            );
        }
        return response()->json($favlists);
    }

    /**
     * Get a favorite list
     *
     * @OA\Get(
     *     tags={"Favorite Lists"},
     *     path="/favlists/{id}",
     *     summary="Get a favorite list",
     *     description="Get a favorite lists by the ID in the URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the favorite list",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns the favorite list",
     *         @OA\JsonContent(ref="#/components/schemas/FavList")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found: Favorite list doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Favorite list with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getFavList(int $id): JsonResponse
    {
        $favlist = FavList::with("character", "item")->find($id);
        // Check if favlist exists
        if (!$favlist) {
            return response()->json(
                [
                    "message" => "Favorite list with id $id not found",
                ],
                404
            );
        }

        return response()->json($favlist);
    }

    /**
     * Update a favorite list
     *
     * @OA\Put(
     *     tags={"Favorite Lists"},
     *     path="/favlists/{id}",
     *     summary="Update a favorite list",
     *     description="Update a favorite list by ID in the URL and data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the favorite list",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(ref="#/components/requestBodies/FavListUpdate"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Favorite list updated",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Favorite list updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The name field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update a favorite list")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Favorite list not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Favorite list with id 2 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateFavList(Request $request, int $id): JsonResponse
    {
        $favlist = FavList::find($id);
        // Check if favlist exists
        if (!$favlist) {
            return response()->json(
                [
                    "message" => "Favorite list with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to update a favorite list",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "character_id" => "required|integer",
            "item_id" => "required|integer",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update favlist
        $favlist->update([
            "character_id" => $request->character_id,
            "item_id" => $request->item_id,
        ]);

        return response()->json([
            "message" => "Favorite list updated successfully",
        ]);
    }

    /**
     * Delete a favorite list
     *
     * @OA\Delete(
     *     tags={"Favorite Lists"},
     *     path="/favlists/{id}",
     *     summary="Delete a favorite list",
     *     description="Deletes a favorite list by ID in the URL. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the favorite list to be deleted",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Favorite list deleted",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Favorite list deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can delete favorite lists",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete a favorite list")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Favorite list doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Favorite list with id 2 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteFavList($id): JsonResponse
    {
        $favlist = FavList::find($id);
        // Check if favlist exists
        if (!$favlist) {
            return response()->json(
                [
                    "message" => "Favorite list with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to delete a favorite list",
                ],
                401
            );
        }

        // Delete favlist
        $favlist->delete();

        return response()->json([
            "message" => "Favorite list deleted successfully",
        ]);
    }
}
