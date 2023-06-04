<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TypeController extends Controller
{
    // Create a new type
    public function createType(Request $request): \Illuminate\Http\JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to create a type",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create type
        $type = Type::create([
            "name" => $request->name,
        ]);
        return response()->json(
            [
                "message" => "Type created successfully",
            ],
            201
        );
    }

    // Get all types
    public function getAllTypes(): \Illuminate\Http\JsonResponse
    {
        $types = Type::with("items")->get();
        // Check if types exist
        if (count($types) === 0) {
            return response()->json(
                [
                    "message" => "No types found",
                ],
                404
            );
        }
        return response()->json($types);
    }

    // Get a type
    public function getTypeById($id): \Illuminate\Http\JsonResponse
    {
        $type = Type::with("items")->find($id);
        // Check if type exists
        if (!$type) {
            return response()->json(
                [
                    "message" => "Type with id {$id} not found",
                ],
                404
            );
        }
        return response()->json($type);
    }

    // Update a type
    public function updateType(
        Request $request,
        $id
    ): \Illuminate\Http\JsonResponse {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update a type",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $type = Type::find($id);
        // Check if type exists
        if (!$type) {
            return response()->json(
                [
                    "message" => "Type with id {$id} not found",
                ],
                404
            );
        }
        // Update type
        $type->update([
            "name" => $request->name,
        ]);
        return response()->json(
            [
                "message" => "Type updated successfully",
            ],
            200
        );
    }

    // Delete a type
    public function deleteType($id): \Illuminate\Http\JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete a type",
                ],
                401
            );
        }
        $type = Type::find($id);
        // Check if type exists
        if (!$type) {
            return response()->json(
                [
                    "message" => "Type with id {$id} not found",
                ],
                404
            );
        }
        // Delete type
        $type->delete();
        return response()->json([
            "message" => "Type deleted successfully",
        ]);
    }
}
