<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // Get all profiles
    public function getAllProfiles(): \Illuminate\Http\JsonResponse
    {
        $profiles = Profile::all();
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

    // Get one profile
    public function getProfileById($id): \Illuminate\Http\JsonResponse
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
        return response()->json($profile);
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

        // Check if the profile belongs to the user
        $user = Auth::user();
        if ($profile->user_id !== $user->id) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to delete this profile",
                ],
                401
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete a profile",
                ],
                401
            );
        }

        $profile->delete();
        return response()->json([
            "message" => "Profile with id {$id} deleted successfully",
        ]);
    }

    // Create a profile
    public function createProfile(
        Request $request
    ): \Illuminate\Http\JsonResponse {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if ($admin) {
            $profile = Profile::create([
                "farmer_name" => $request["farmer_name"],
                "farm_name" => $request["farm_name"],
                "user_id" => $request["user_id"],
            ]);
        } else {
            $profile = Profile::create([
                "farmer_name" => $request["farmer_name"],
                "farm_name" => $request["farm_name"],
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
}
