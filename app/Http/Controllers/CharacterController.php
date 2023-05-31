<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CharacterController extends Controller
{
    // Get all characters
    public function getAllCharacters()
    {
        return Character::all();
    }

    // Get one character
    public function getCharacterById($id)
    {
        return Character::find($id);
    }

    // Delete a character
    public function deleteCharacter($id)
    {
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response(
                "You don't have permission to delete a character.",
                401
            );
        }
        $character = Character::find($id);
        if (!$character) {
            return response("The character with id {$id} doesn't exist.", 404);
        }
        $character->delete();
        return response("The character with id {$id} has been deleted.", 200);
    }

    // Create a new character
    public function createCharacter(Request $request)
    {
        return Character::create([
            "name" => $request["name"],
            "birthday" => $request["birthday"],
            "season_id" => $request["season_id"],
            "gender" => $request["gender"],
            "occupation" => $request["occupation"],
            "romanceable" => $request["romanceable"],
            "icon" => $request["icon"],
        ]);
    }

    // Update a character
    public function updateCharacter(Request $request, $id)
    {
        $character = Character::find($id);
        $character->update([
            "name" => $request["name"],
            "birthday" => $request["birthday"],
            "season_id" => $request["season_id"],
            "gender" => $request["gender"],
            "occupation" => $request["occupation"],
            "romanceable" => $request["romanceable"],
            "icon" => $request["icon"],
        ]);
        return $character;
    }
}
