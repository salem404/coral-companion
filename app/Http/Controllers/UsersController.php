<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Users",description="Endpoints for users")
 *
 * @OA\Schema(
 *     schema="User",
 *     required={"id","email", "password"},
 *     @OA\Property(property="id", type="integer", format="int64", example=1, minimum=1),
 *     @OA\Property(property="email", type="string", format="email", example="example@email.es"),
 *     @OA\Property(property="password", type="string", format="password", example="password123")
 * )
 *
 * @OA\RequestBody (
 *     request="UserLogin",
 *     required=true,
 *     @OA\JsonContent(
 *         required={"email", "password"},
 *         @OA\Property(property="email", type="string", format="email", example="example@email.es"),
 *         @OA\Property(property="password", type="string", format="password", example="password123")
 *     )
 * )
 *
 * @OA\RequestBody (
 *     request="UserRegister",
 *     required=true,
 *     @OA\JsonContent(
 *         required={"email", "password"},
 *         @OA\Property(property="email", type="string", format="email", example="example@email.es"),
 *         @OA\Property(property="password", type="string", format="password", example="password123")
 *     )
 * )
 */
class UsersController extends Controller
{
    /**
     * Get all users
     *
     * @OA\Get(
     *     tags={"Users"},
     *     path="/users",
     *     summary="Get all users",
     *     description="Returns all users from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns an array of all users",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllUsers(): JsonResponse
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Get user by id
     *
     * @OA\Get(
     *     tags={"Users"},
     *     path="/users/{id}",
     *     summary="Get user",
     *     description="Get a user by ID sent in the URL from the database or a message the user is not found",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of user to return",
     *         required=true,
     *         @OA\Schema(type="integer", example=1, minimum=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Returns the user",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: User with given id doesn't exist",
     *         @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User with id 1 not found")
     *        )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getUserById($id): JsonResponse
    {
        $user = User::with("profiles")->find($id);
        // Check if user exists
        if (!$user) {
            return response()->json(
                [
                    "message" => "User with id $id not found",
                ],
                404
            );
        }
        return response()->json($user);
    }
}
