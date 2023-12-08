<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Profiles",
 *     description="Endpoints for profiles"
 * )
 *
 * @OA\Schema(
 *     schema="Profile",
 *     required={"id", "farmer_name", "farm_name", "user_id"},
 *     @OA\Property(property="id", type="integer", example=4, description="The unique identifier of the profile"),
 *     @OA\Property(property="farmer_name", type="string", example="John Doe", description="The name of the farmer"),
 *     @OA\Property(property="farm_name", type="string", example="John's Farm", description="The name of the farm"),
 *     @OA\Property(property="user_id", type="object", ref="#/components/schemas/User", description="The user associated with the profile"),
 * )
 *
 * @OA\RequestBody(
 *     request="ProfileCreate",
 *     required=true,
 *     @OA\JsonContent(
 *         required={"farmer_name", "farm_name"},
 *         @OA\Property(property="farmer_name", type="string", example="John Doe", description="The name of the farmer"),
 *         @OA\Property(property="farm_name", type="string", example="John's Farm", description="The name of the farm"),
 *         @OA\Property(property="user_id", type="integer", example=1, description="The user ID associated with the profile")
 *     )
 * )
 *
 * @OA\RequestBody(
 *     request="ProfileUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *         @OA\Property(property="farmer_name", type="string", example="John Doe", description="The updated name of the farmer"),
 *         @OA\Property(property="farm_name", type="string", example="John's Farm", description="The updated name of the farm"),
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
     *             @OA\Property(property="message", type="string", example="farmer_name and farm_name are required"),
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
     * @param Request $request The request object containing the data to create a new profile
     * @return JsonResponse The response containing a success message if the profile was created successfully, or an error message otherwise
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
                "user_id" => "required|integer",
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Check if user exists
            $user = User::find($request->user_id);
            if (!$user) {
                return response()->json(
                    [
                        "message" => "User with id $request->user_id doesn't exist",
                    ],
                    400
                );
            }

            // Create profile (admin)
            Profile::create([
                "farmer_name" => $request->farmer_name,
                "farm_name" => $request->farm_name,
                "user_id" => $request->user_id,
            ]);
        } else {
            // Validate request
            $validator = Validator::make($request->all(), [
                "farmer_name" => "required|string",
                "farm_name" => "required|string",
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Create profile
            Profile::create([
                "farmer_name" => $request->farmer_name,
                "farm_name" => $request->farm_name,
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
     * @return JsonResponse The response containing all the profiles data if found, or an error message otherwise
     */
    public function getAllProfiles(): JsonResponse
    {
        $profiles = Profile::with("tasks")->get();
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
     *         @OA\Schema(
     *             type="integer",
     *             minimum=1
     *         )
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
     * @param int $id The ID of the profile to retrieve
     * @return JsonResponse The response containing the profile data if found, or an error message otherwise
     */
    public function getProfileById($id): JsonResponse
    {
        $profile = Profile::with("tasks")->find($id);
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
     * Get profiles by user ID
     *
     * @OA\Get(
     *     tags={"Profiles"},
     *     path="/user/{id}/profiles",
     *     summary="Get profiles by user ID",
     *     description="Retrieves profiles associated with a specific user ID",
     *     operationId="getProfilesByUserId",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="The user ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             minimum=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns profiles associated with the user ID",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Profile")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found: No profiles found for the user ID",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No profiles found for the user ID")
     *         )
     *     )
     * )
     *
     * @param int $id The user ID to retrieve profiles for
     * @return JsonResponse The response containing the profiles data if found, or an error message otherwise
     */
    public function getProfilesByUserId($id): JsonResponse
    {
        $profiles = Profile::with("tasks")
            ->where("user_id", $id)
            ->get();

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
     * Update a profile
     *
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
     *         @OA\Schema(type="integer", example=1)
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
     * @param Request $request The request object containing the data to update the profile
     * @param int $id The ID of the profile to update
     * @return JsonResponse The response containing a success message if the profile was updated successfully, or an error message otherwise
     */
    public function updateProfile(Request $request, $id): JsonResponse
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
        if ($profile->user_id !== $user->id and !$user->isAdmin) {
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
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update profile
        $profile->update($request->all(), [
            "farmer_name" => $request->farmer_name,
            "farm_name" => $request->farm_name,
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
     * @param int $id The ID of the profile to delete
     * @return JsonResponse The response containing a success message if the profile was deleted successfully, or an error message otherwise
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
        if ($profile->user_id !== $user->id and !$user->isAdmin) {
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
