<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // Create a profile
    public function createProfile(
        Request $request
    ): \Illuminate\Http\JsonResponse {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if ($admin) {
            // Validate request
            $validator = Validator::make($request->all(), [
                "farmer_name" => "required|string",
                "farm_name" => "required|string",
                "color" => "required|string",
                "user_id" => "required|integer",
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }
            // Create profile (admin)
            $profile = Profile::create([
                "farmer_name" => $request["farmer_name"],
                "farm_name" => $request["farm_name"],
                "color" => $request["color"],
                "user_id" => $request["user_id"],
            ]);
        } else {
            // Validate request
            $validator = Validator::make($request->all(), [
                "farmer_name" => "required|string",
                "farm_name" => "required|string",
                "color" => "required|string",
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Create profile
            $profile = Profile::create([
                "farmer_name" => $request["farmer_name"],
                "farm_name" => $request["farm_name"],
                "color" => $request["color"],
                "user_id" => Auth::user()->id,
            ]);
        }

        return response()->json(
            [
                "message" => "Profile created successfully",
            ],
            201
        );
    }

    // Get all profiles
    public function getAllProfiles(): \Illuminate\Http\JsonResponse
    {
        $profiles = Profile::with("user", "tasks")->get();
        // Check if profiles exist
        if (count($profiles) === 0) {
            return response()->json(
                [
                    "message" => "No profiles found",
                ],
                404
            );
        }
        return response()->json($profiles);
    }

    // Get a profile
    public function getProfileById($id): \Illuminate\Http\JsonResponse
    {
        $profile = Profile::with("user", "tasks")->find($id);
        // Check if profile exists
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id {$id} not found",
                ],
                404
            );
        }
        return response()->json($profile);
    }

    // Update a profile
    public function updateProfile(
        Request $request,
        $id
    ): \Illuminate\Http\JsonResponse {
        $profile = Profile::find($id);
        // Check if profile exists
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id {$id} not found",
                ],
                404
            );
        }

        // Check if the profile belongs to the user or is Admin
        $user = Auth::user();
        if ($profile->user_id !== $user->id || !$user->isAdmin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to update this profile",
                ],
                401
            );
        }

        $profile->update($request->all());
        return response()->json([
            "message" => "Profile with id {$id} updated successfully",
        ]);
    }
    // Delete a profile
    public function deleteProfile($id): \Illuminate\Http\JsonResponse
    {
        $profile = Profile::find($id);
        // Check if profile exists
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id {$id} not found",
                ],
                404
            );
        }

        // Check if the profile belongs to the user or is Admin
        $user = Auth::user();
        if ($profile->user_id !== $user->id || !$user->isAdmin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to delete this profile",
                ],
                401
            );
        }

        $profile->delete();
        return response()->json([
            "message" => "Profile with id {$id} deleted successfully",
        ]);
    }
}
