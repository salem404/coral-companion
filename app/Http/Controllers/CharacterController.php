<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Characters", description="Endpoints for characters")
 * @OA\Schema(
 *     schema="Character",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="birthday", type="integer", example=1, minimum=1, maximum=28),
 *     @OA\Property(property="season_id", type="object", ref="#/components/schemas/Season"),
 *     @OA\Property(property="gender", type="string", example="Female"),
 *     @OA\Property(property="occupation", type="string", example="Doctor"),
 *     @OA\Property(property="romanceable", type="integer", example=1),
 *     @OA\Property(property="icon", type="string", example="https://www.example.com/image.jpg")
 * )
 *
 * @OA\RequestBody(
 *     request="Character",
 *     required=true,
 *     @OA\JsonContent(
 *         @OA\Property(property="name", type="string", example="John Doe"),
 *         @OA\Property(property="birthday", type="integer", example=1, minimum=1, maximum=28),
 *         @OA\Property(property="season_id", type="integer", example=1, minimum=1, maximum=4),
 *         @OA\Property(property="gender", type="string", example="Female"),
 *         @OA\Property(property="occupation", type="string", example="Doctor"),
 *         @OA\Property(property="isRomanceable", type="integer", example=1, minimum=0, maximum=1),
 *         @OA\Property(property="icon", type="string", example="https://www.example.com/image.jpg")
 *     )
 * )
 */
class CharacterController extends Controller
{
    /**
     * Create a new character
     *
     * @OA\Post(
     *     tags={"Characters"},
     *     path="/characters",
     *     summary="Create a new character",
     *     description="Create a new character using the data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/Character"),
     *     @OA\Response(
     *         response=201,
     *         description="Success: Character created successfully",
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
     * @param Request $request
     * @return JsonResponse
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
            "isRomanceable" => "required | tinyint | min:0 | max:1",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
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
     * @return JsonResponse
     */
    public function getAllCharacters(): JsonResponse
    {
        $characters = Character::with(
            "season",
            "favorites",
            "family",
            "tasks"
        )->get();

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
     *     description="Get a character by ID sent in the URL",
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
     * @param int $id
     * @return JsonResponse
     */
    public function getCharacterById($id): JsonResponse
    {
        $character = Character::with(
            "season",
            "favorites",
            "family",
            "tasks"
        )->find($id);

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
     *     tags={"Characters"},
     *     path="/characters/{id}",
     *     summary="Update a character",
     *     description="Update a character by ID in the URL and a request body (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of character to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(ref="#/components/requestBodies/Character"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Character updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Character updated successfully")
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
     * @param Request $request
     * @param int $id
     * @return JsonResponse
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
            "isRomanceable" => "required|tinyInteger | min:0 | max:1",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
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
     *     tags={"Characters"},
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
     * @param int $id
     * @return JsonResponse
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
