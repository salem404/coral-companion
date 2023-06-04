<?php

namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FamilyController extends Controller
{
    // Create a family
    public function createFamily(
        Request $request
    ): \Illuminate\Http\JsonResponse {
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
        $family = Family::create([
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

    // Get all families
    public function getAllFamilies(): \Illuminate\Http\JsonResponse
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
    public function getFamily($id): \Illuminate\Http\JsonResponse
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
    ): \Illuminate\Http\JsonResponse {
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
    public function deleteFamily($id): \Illuminate\Http\JsonResponse
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
