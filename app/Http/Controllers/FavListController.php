<?php

namespace App\Http\Controllers;

use App\Models\FavList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FavListController extends Controller
{
    // Create a new favlist
    public function createFavList(
        Request $request
    ): \Illuminate\Http\JsonResponse {
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

    // Get all favlists
    public function getAllFavLists(): \Illuminate\Http\JsonResponse
    {
        $favlists = FavList::with("character", "item")->get();
        // Check if favlists exist
        if (count($favlists) === 0) {
            return response()->json(
                [
                    "message" => "No favorite lists found",
                ],
                404
            );
        }

        return response()->json($favlists);
    }

    // Get a favlist
    public function getFavList(int $id): \Illuminate\Http\JsonResponse
    {
        $favlist = FavList::with("character", "item")->find($id);
        // Check if favlist exists
        if (!$favlist) {
            return response()->json(
                [
                    "message" => "Favorite list with id {$id} not found",
                ],
                404
            );
        }

        return response()->json($favlist);
    }

    // Update a favlist
    public function updateFavList(
        Request $request,
        int $id
    ): \Illuminate\Http\JsonResponse {
        $favlist = FavList::find($id);
        // Check if favlist exists
        if (!$favlist) {
            return response()->json(
                [
                    "message" => "Favorite list with id {$id} not found",
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

    // Delete a favlist
    public function deleteFavList(int $id): \Illuminate\Http\JsonResponse
    {
        $favlist = FavList::find($id);
        // Check if favlist exists
        if (!$favlist) {
            return response()->json(
                [
                    "message" => "Favorite list with id {$id} not found",
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
