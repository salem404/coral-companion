<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Characters",description="Everything about Characters")
 * @OA\Component (
 *     @OA\Schema(
 *     schema="Character",
 *          @OA\Property(property="id",type="integer",example=1),
 *          @OA\Property(property="name",type="string",example="John Doe"),
 *          @OA\Property(property="birthday",type="integer",example=1),
 *          @OA\Property(property="season_id", type="object",
 *                  @OA\Property(
 *                      ref="#/components/schemas/Season"
 *                  ),
 *              example={ "id":4,"name": "Winter"}
 *           ),
 *           @OA\Property(property="gender",type="string",example="Female"),
 *           @OA\Property(property="occupation",type="string",example="Doctor"),
 *           @OA\Property(property="romanceable",type="integer",example=1),
 *           @OA\Property(property="icon",type="string",example="https://www.example.com/image.jpg")
 *      )
 * ),
 * @OA\Component (
 *     @OA\RequestBody (request="Character",required=true,
 *          @OA\MediaType(mediaType="application/json",
 *              @OA\Schema(
 *                  @OA\Property(property="name",type="string",example="John Doe"),
 *                  @OA\Property(property="birthday",type="integer",example=1),
 *                  @OA\Property(property="season_id",type="integer",example=1),
 *                  @OA\Property(property="gender",type="string",example="Female"),
 *                  @OA\Property(property="occupation",type="string",example="Doctor"),
 *                  @OA\Property(property="romanceable",type="integer",example=1),
 *                  @OA\Property(property="icon",type="string",example="https://www.example.com/image.jpg")
 *              )
 *          )
 *      )
 * )
 */
class CharacterController extends Controller
{
    /**
     * Create a new character
     * @OA\Post(
     *     path="/api/characters",
     *     summary="Create a new character",
     *     description="Create a new character using the data provided in the request body. (Admin only)",
     *     tags={"Characters"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/Character"),
     *     @OA\Response(response=201,description="Character created successfully"),
     *     @OA\Response(response=401,description="You are not authorized to create a character"),
     *     @OA\Response(response=400,description="Bad request. Please enter valid data")
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
            "birthday" => "integer",
            "season_id" => "integer",
            "gender" => "string",
            "occupation" => "string",
            "romanceable" => "required|tinyint",
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
            "romanceable" => $request->romanceable,
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
     * @OA\Get(
     *      path="/api/characters",
     *      summary="Get all characters",
     *      description="Get all characters",
     *      tags={"Characters"},
     *      @OA\Response(response=200,description="Success: Get all characters",
     *          @OA\MediaType(mediaType="application/json",
     *                  @OA\Schema(ref="#/components/schemas/Character")
     *          )
     *     ),
     *      @OA\Response(response=404,description="No characters found")
     * )
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
        if (count($characters) === 0) {
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
     * @OA\Get(
     *     path="/api/characters/{id}",
     *     summary="Get a character",
     *     description="Get a character by id",
     *     tags={"Characters"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id",in="path",description="Character id",required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *     @OA\Response(response=200,description="Success: Return the character",
     *      @OA\MediaType(mediaType="application/json",
     *          @OA\Schema(ref="#/components/schemas/Character")
     *      )
     *     ),
     *     @OA\Response(response=404,description="Character not found")
     * )
     *
     * @param $id
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
                    "message" => "Character with id {$id} not found",
                ],
                404
            );
        }
        return response()->json($character);
    }

    /**
     * Update a character
     * @OA\Put(
     *     path="/api/characters/{id}",
     *     summary="Update a character",
     *     description="Update a character by id and a request body (ADMIN ONLY)",
     *     tags={"Characters"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id",in="path",description="Character id",required=true,
     *          @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(ref="#/components/requestBodies/Character"),
     *     @OA\Response(response=200,description="Success: Character updated successfully"),
     *     @OA\Response(response=404,description="Character not found"),
     *     @OA\Response(response=401,description="Unauthorized")
     * )
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function updateCharacter(Request $request, $id): JsonResponse
    {
        $character = Character::find($id);
        // Check if character exists
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id {$id} not found",
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
            "birthday" => "integer",
            "season_id" => "integer",
            "gender" => "string",
            "occupation" => "string",
            "romanceable" => "required|boolean",
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
            "romanceable" => $request->romanceable,
            "icon" => $request->icon,
        ]);

        return response()->json([
            "message" => "Character updated successfully",
        ]);
    }

    /**
     * Delete a character
     * @OA\Delete(
     *     path="/api/characters/{id}",
     *     summary="Delete a character",
     *     tags={"Characters"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id",in="path",description="Character id",required=true,
     *          @OA\Schema(type="integer")
     *    ),
     *     @OA\Response(response=200,description="Success: Character deleted successfully"),
     *     @OA\Response(response=404,description="Character not found"),
     *     @OA\Response(response=401,description="Unauthorized")
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function deleteCharacter($id): JsonResponse
    {
        $character = Character::find($id);
        // Check if character exists
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id {$id} not found",
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
