<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Season;

/**
 * @OA\Tag(
 *     name="Characters",
 *     description="Endpoints for characters"
 * )
 *
 * @OA\Schema(
 *     schema="Character",
 *     required={"id","name","isRomanceable","icon"},
 *     @OA\Property(property="id", type="integer", example=1, minimum=1),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="birthday", type="integer", example=1, minimum=1, maximum=28),
 *     @OA\Property(property="season_id", type="object", ref="#/components/schemas/Season"),
 *     @OA\Property(property="gender", type="string", example="Female"),
 *     @OA\Property(property="occupation", type="string", example="Doctor"),
 *     @OA\Property(property="isRomanceable", type="integer", example=1),
 *     @OA\Property(property="icon", type="string", example="image.jpg"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-01-01 00:00:00"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-01-01 00:00:00")
 * )
 *
 * @OA\RequestBody(
 *     request="CharacterCreate",
 *     required=true,
 *     @OA\JsonContent(
 *         required={"name","isRomanceable","icon"},
 *         @OA\Property(property="name", type="string", example="John Doe"),
 *         @OA\Property(property="birthday", type="integer", example=1, minimum=1, maximum=28),
 *         @OA\Property(property="season_id", type="integer", example=1, minimum=1, maximum=4),
 *         @OA\Property(property="gender", type="string", example="Female"),
 *         @OA\Property(property="occupation", type="string", example="Doctor"),
 *         @OA\Property(property="isRomanceable", type="integer", example=1, minimum=0, maximum=1),
 *         @OA\Property(property="icon", type="string", example="image.jpg")
 *     )
 * )
 *
 * @OA\RequestBody(
 *     request="CharacterUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *         @OA\Property(property="name", type="string", example="John Doe"),
 *         @OA\Property(property="birthday", type="integer", example=1, minimum=1, maximum=28),
 *         @OA\Property(property="season_id", type="integer", example=1, minimum=1, maximum=4),
 *         @OA\Property(property="gender", type="string", example="Female"),
 *         @OA\Property(property="occupation", type="string", example="Doctor"),
 *         @OA\Property(property="isRomanceable", type="integer", example=1, minimum=0, maximum=1),
 *         @OA\Property(property="icon", type="string", example="image.jpg")
 *     )
 * )
 */
class CharacterController extends Controller
{
    /**
     * Create a new character
     *
     * @OA\Post(
     *     tags={"Characters", "Admin"},
     *     path="/characters",
     *     summary="Create a new character",
     *     description="Create a new character using the data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/CharacterCreate"),
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
     *         response=201,
     *         description="Success: Character created",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character created successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The name field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized. Only admins can create characters",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to create a character")
     *         )
     *     )
     * )
     *
     * @param Request $request The request object containing the data to create a new character
     * @return JsonResponse The response containing a success message if the character was created successfully, or an error message otherwise
     */
    public function createCharacter(Request $request): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to create a character",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "birthday" => "integer | min:1 | max:28",
            "season_id" => "integer | min:1 | max:4",
            "gender" => "string",
            "occupation" => "string",
            "isRomanceable" => "required | integer | min:0 | max:1",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Check if season exists
        $season = Season::find($request->season_id);
        if (!$season) {
            return response()->json(
                [
                    "message" => "Season with id $request->season_id not found",
                ],
                400
            );
        }

        // Create character
        Character::create([
            "name" => $request->name,
            "birthday" => $request->birthday,
            "season_id" => $request->season_id,
            "gender" => $request->gender,
            "occupation" => $request->occupation,
            "isRomanceable" => $request->isRomanceable,
            "icon" => $request->icon,
        ]);

        return response()->json(
            [
                "message" => "Character created successfully",
            ],
            201
        );
    }

    /**
     * Get all characters
     *
     * @OA\Get(
     *     tags={"Characters"},
     *     path="/characters",
     *     summary="Get all characters",
     *     description="Get all characters from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all characters",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Character")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Characters don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No characters found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse The response containing all the characters data if found, or an error message otherwise
     */
    public function getAllCharacters(): JsonResponse
    {
        $characters = Character::with("season", "favorites", "family")->get();

        // Check if characters exist
        if (count($characters) < 1) {
            return response()->json(
                [
                    "message" => "No characters found",
                ],
                404
            );
        }
        return response()->json($characters);
    }

    /**
     * Get all characters by season
     *
     * @OA\Get(
     *     tags={"Characters"},
     *     path="/characters/season/{season_id}",
     *     summary="Get all characters by season",
     *     description="Get all characters by season ID sent in the URL from the database",
     *     @OA\Parameter(
     *         name="season_id",
     *         in="path",
     *         description="ID of season to return characters from",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns all characters from the season",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Character")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Characters don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No characters found")
     *         )
     *     )
     * )
     *
     * @param int $season_id The ID of the season to retrieve characters from
     * @return JsonResponse The response containing all the characters data if found, or an error message otherwise
     */
    public function getCharactersBySeasonId($season_id): JsonResponse
    {
        $characters = Character::with("season")
            ->where("season_id", $season_id)
            ->get();

        // Check if characters exist
        if (count($characters) < 1) {
            return response()->json(
                [
                    "message" => "No characters found",
                ],
                404
            );
        }
        return response()->json($characters);
    }

    /**
     * Get a character
     *
     * @OA\Get(
     *     tags={"Characters"},
     *     path="/characters/{id}",
     *     summary="Get a character",
     *     description="Get a character by ID sent in the URL from the database",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of character to return",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns the character",
     *         @OA\JsonContent(ref="#/components/schemas/Character")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Character doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id The ID of the character to retrieve
     * @return JsonResponse The response containing the character data if found, or an error message otherwise
     */
    public function getCharacterById($id): JsonResponse
    {
        $character = Character::with("season", "favorites", "family")->find(
            $id
        );

        // Check if character exists
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id $id not found",
                ],
                404
            );
        }
        return response()->json($character);
    }

    /**
     * Update a character
     *
     * @OA\Put(
     *     tags={"Characters", "Admin"},
     *     path="/characters/{id}",
     *     summary="Update a character",
     *     description="Update a character by ID in the URL and data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of character to update",
     *         required=true,
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
     *     @OA\RequestBody(ref="#/components/requestBodies/CharacterUpdate"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Character updated",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character updated successfully")
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
     *         description="Unauthorized: Only admins can update characters",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update a character")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Character doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request The request object containing the data to update the character
     * @param int $id The ID of the character to update
     * @return JsonResponse The response containing a success message if the character was updated successfully, or an error message otherwise
     */
    public function updateCharacter(Request $request, $id): JsonResponse
    {
        $character = Character::find($id);
        // Check if character exists
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update a character",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "birthday" => "integer | min:1 | max:28",
            "season_id" => "integer | min:1 | max:4",
            "gender" => "string",
            "occupation" => "string",
            "isRomanceable" => "required| integer | min:0 | max:1",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Check if season exists
        $season = Season::find($request->season_id);
        if (!$season) {
            return response()->json(
                [
                    "message" => "Season with id $request->season_id not found",
                ],
                404
            );
        }

        // Update character
        $character->update([
            "name" => $request->name,
            "birthday" => $request->birthday,
            "season_id" => $request->season_id,
            "gender" => $request->gender,
            "occupation" => $request->occupation,
            "isRomanceable" => $request->isRomanceable,
            "icon" => $request->icon,
        ]);

        return response()->json([
            "message" => "Character updated successfully",
        ]);
    }

    /**
     * Delete a character
     *
     * @OA\Delete(
     *     tags={"Characters", "Admin"},
     *     path="/characters/{id}",
     *     summary="Delete a character",
     *     description="Delete a character by ID sent in the URL (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the character to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
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
     *         description="Success: Character deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can delete characters",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete a character")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Character doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id The ID of the character to delete
     * @return JsonResponse The response containing a success message if the character was deleted successfully, or an error message otherwise
     */
    public function deleteCharacter($id): JsonResponse
    {
        $character = Character::find($id);
        // Check if character exists
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete a character",
                ],
                401
            );
        }

        // Delete character
        $character->delete();

        return response()->json([
            "message" => "Character deleted successfully",
        ]);
    }
}
