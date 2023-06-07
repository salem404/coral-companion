<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(name="Users",description="Endpoints for users")
 * @OA\Schema(
 *     schema="User",
 *     required={"id","username", "email", "password"},
 *     @OA\Property(property="id", type="integer", example=1, minimum=1),
 *     @OA\Property(property="username", type="string", example="john_doe"),
 *     @OA\Property(property="email", type="string", format="email", example="example@email.es"),
 *     @OA\Property(property="password", type="string", format="password", example="password123")
 * )
 * @OA\RequestBody (
 *     request="UserLogin",
 *     required=true,
 *     @OA\JsonContent(
 *     @OA\Property(property="email", type="string", format="email", example="example@email.es"),
 *     @OA\Property(property="password", type="string", format="password", example="password123")
 * ))
 * @OA\RequestBody (
 *     request="UserRegister",
 *     required=true,
 *     @OA\JsonContent(
 *     @OA\Property(property="username", type="string", example="john_doe"),
 *     @OA\Property(property="email", type="string", format="email", example="example@email.es"),
 *     @OA\Property(property="password", type="string", format="password", example="password123")
 * ))
 */
class UsersController extends Controller
{
    /**
     * Get all users
     *
     * Openapi php comment block
     *
     * @OA\Get(
     *     tags={"Users"},
     *     path="/users",
     *     summary="Get all users",
     *     @OA\Response(
     *         response=200,
     *         description="List of users",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No users found"
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllUsers(): JsonResponse
    {
        $users = User::all();
        // Check if users exist
        if (count($users) === 0) {
            return response()->json(
                [
                    "message" => "No users found",
                ],
                404
            );
        }
        return response()->json($users);
    }

    /**
     * Get user by id
     *
     * Openapi php comment block
     *
     * @OA\Get(
     *     tags={"Users"},
     *     path="/users/{id}",
     *     summary="Get user by id",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="User id",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64", example=1, minimum=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User with id",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User with id not found"
     *     )
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function getUserById($id): JsonResponse
    {
        $user = User::find($id);
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
