<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Tag(name="Profiles", description="Endpoints for profiles")
 * @OA\Schema(
 *     schema="Profile",
 *     required={"id", "farmer_name", "farm_name", "color", "user_id"},
 *     @OA\Property(property="id", type="integer", example=4),
 *     @OA\Property(property="farmer_name", type="string", example="John Doe"),
 *     @OA\Property(property="farm_name", type="string", example="John's Farm"),
 *     @OA\Property(property="color", type="string", example="#000000"),
 *     @OA\Property(property="user_id", type="object", ref="#/components/schemas/User"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-03-25T20:29:48.000000Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-03-25T20:29:48.000000Z"),
 * ),
 *
 * @OA\RequestBody(
 *     request="ProfileCreate",
 *     required=true,
 *     @OA\JsonContent(required={"farmer_name", "farm_name", "color"},
 *         @OA\Property(property="farmer_name", type="string", example="John Doe"),
 *         @OA\Property(property="farm_name", type="string", example="John's Farm"),
 *         @OA\Property(property="color", type="string", example="#000000"),
 *         @OA\Property(property="user_id", type="integer", example=1)
 *     )
 * ),
 * @OA\RequestBody(
 *     request="ProfileUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *         @OA\Property(property="farmer_name", type="string", example="John Doe"),
 *         @OA\Property(property="farm_name", type="string", example="John's Farm"),
 *         @OA\Property(property="color", type="string", example="#000000"),
 *     )
 * )
 */
class ProfileController extends Controller
{
    /**
     * Create a profile
     *
     * @OA\Post(
     *     tags={"Profiles"},
     *     path="/profiles",
     *     summary="Create a profile",
     *     description="Create a new profile using the data provided in the request body. The user must be an admin to create a profile for other users. An user can create a profile for themselves (user_id not required).",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/ProfileCreate"),
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
     *         description="Success: A profile created",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Profile created successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request: The request you sent was invalid",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="farmer_name, farm_name and color are required"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins or the user themselves can create a profile",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to create a profile"),
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createProfile(Request $request): JsonResponse
    {
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
            Profile::create([
                "farmer_name" => $request->farmer_name,
                "farm_name" => $request->farm_name,
                "color" => $request->color,
                "user_id" => $request->user_id,
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
            Profile::create([
                "farmer_name" => $request->farmer_name,
                "farm_name" => $request->farm_name,
                "color" => $request->color,
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

    /**
     * Get all profiles
     *
     * @OA\Get(
     *     tags={"Profiles"},
     *     path="/profiles",
     *     summary="Get all profiles",
     *     description="Get all profiles from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Return all profiles",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Profile")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No profiles found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No profiles found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllProfiles(): JsonResponse
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

    /**
     * Get a profile
     *
     * @OA\Get(
     *     tags={"Profiles"},
     *     path="/profiles/{id}",
     *     summary="Get a profile",
     *     description="Get a profile by ID in the URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of profile",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns a profile",
     *         @OA\JsonContent(ref="#/components/schemas/Profile")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found: Profile doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Profile with id 4 not found")
     *         )
     *     )
     * )
     *
     * @param $id
     * @return JsonResponse
     */

    public function getProfileById($id): JsonResponse
    {
        $profile = Profile::with("user", "tasks")->find($id);
        // Check if profile exists
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id $id not found",
                ],
                404
            );
        }
        return response()->json($profile);
    }

    /**
     * Update a profile
     * @OA\Put(
     *     tags={"Profiles"},
     *     path="/profiles/{id}",
     *     summary="Update a profile",
     *     description="Update a profile by ID in the URL and data provided in the request body. Admins can update any profile, users can only update their own profiles",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of profile",
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
     *     @OA\RequestBody(ref="#/components/requestBodies/ProfileUpdate"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Profile has been updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Profile updated successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The farmer name field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins or the user who created the profile can update it",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update this profile")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found: Profile doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Profile with id 4 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function updateProfile(Request $request, $id): JsonResponse
    {
        $profile = Profile::find($id);
        // Check if profile exists
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id {id}not found",
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

        // Validate request
        $validator = Validator::make($request->all(), [
            "farmer_name" => "required|string|max:255",
            "farm_name" => "required|string|max:255",
            "color" => "required|string|max:255",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update profile
        $profile->update($request->all(), [
            "farmer_name" => $request->farmer_name,
            "farm_name" => $request->farm_name,
            "color" => $request->color,
        ]);
        return response()->json([
            "message" => "Profile updated successfully",
        ]);
    }

    /**
     * Delete a profile
     *
     * @OA\Delete(
     *     tags={"Profiles"},
     *     path="/profiles/{id}",
     *     summary="Delete a profile",
     *     description="Delete a profile by ID in the URL. Admins can delete any profile, users can only delete their own profiles",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of profile to delete",
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
     *         description="Success: Profile deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Profile deleted successfully"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins or the user who created the profile can delete it",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete this profile"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found: Profile doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Profile with id 4 not found"),
     *         )
     *     )
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function deleteProfile($id): JsonResponse
    {
        $profile = Profile::find($id);
        // Check if profile exists
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id $id not found",
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

        // Delete profile
        $profile->delete();

        return response()->json([
            "message" => "Profile deleted successfully",
        ]);
    }
}
