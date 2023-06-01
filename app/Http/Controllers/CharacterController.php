<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CharacterController extends Controller
{
    // Get all characters
    public function getAllCharacters(): \Illuminate\Http\JsonResponse
    {
        $characters = Character::all();
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

    // Get one character
    public function getCharacterById($id): \Illuminate\Http\JsonResponse
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
        return response()->json($character);
    }

    // Delete a character
    public function deleteCharacter($id): \Illuminate\Http\JsonResponse
    {
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
        // Delete character
        $character->delete();
        return response()->json([
            "message" => "Character deleted successfully",
        ]);
    }

    // Create a new character
    public function createCharacter(
        Request $request
    ): \Illuminate\Http\JsonResponse {
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

        $character = Character::create([
            "name" => $request["name"],
            "birthday" => $request["birthday"],
            "season_id" => $request["season_id"],
            "gender" => $request["gender"],
            "occupation" => $request["occupation"],
            "romanceable" => $request["romanceable"],
            "icon" => $request["icon"],
        ]);

        return response()->json(
            [
                "message" => "Character created successfully",
                "character" => $character,
            ],
            201
        );
    }

    // Update a character
    public function updateCharacter(
        Request $request,
        $id
    ): \Illuminate\Http\JsonResponse {
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

        $character->update([
            "name" => $request["name"],
            "birthday" => $request["birthday"],
            "season_id" => $request["season_id"],
            "gender" => $request["gender"],
            "occupation" => $request["occupation"],
            "romanceable" => $request["romanceable"],
            "icon" => $request["icon"],
        ]);

        return response()->json([
            "message" => "Character updated successfully",
            "character" => $character,
        ]);
    }
}
