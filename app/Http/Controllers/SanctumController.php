<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SanctumController extends Controller
{
    /**
     * Register a new user.
     *
     * @OA\Post(
     *     tags={"Users"},
     *     path="/register",
     *     summary="Register a new user",
     *     @OA\RequestBody(ref="#/components/requestBodies/UserRegister"),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User created successfully"
     *             ),
     *     @OA\Property(property="token", type="string", example="2|3f4e5d6c7b8a9z0x")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *             )
     *         )
     *     )
     * )
     */
    public function register(Request $request): JsonResponse
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            "username" => "required",
            "email" => "required|email",
            "password" => "required|min:6",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            "username" => $request->username,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);

        // Add the Sanctum token to the user and store it in a variable
        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json(
            [
                "message" => "User created successfully",
                "token" => $token,
            ],
            201
        );
    }

    /**
     * Login a user.
     * Openapi php comment block
     * @OA\Post(
     *     tags={"Users"},
     *     path="/login",
     *     summary="Login a user",
     *     @OA\RequestBody(ref="#/components/requestBodies/UserLogin"),
     *     @OA\Response(
     *         response=200,
     *         description="User logged in successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User logged in successfully"
     *             ),
     *     @OA\Property(property="token", type="string", example="2|3f4e5d6c7b8a9z0x")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid login details",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Invalid login details"
     *             )
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required|min:6",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::where("email", $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(
                [
                    "message" => "Invalid login details",
                ],
                401
            );
        }

        // Add the sanctum token to the user
        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json([
            "message" => "User logged in successfully",
            "token" => $token,
        ]);
    }

    /**
     * Logout a user.
     * Openapi php comment block
     * @OA\Post(
     *     tags={"Users"},
     *     path="/logout",
     *     summary="Logout a user",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="User logged out successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User logged out successfully"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Unauthenticated"
     *             )
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        // Delete the token of the logged-in user with sanctum
        $request
            ->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            "message" => "User logged out successfully",
        ]);
    }
}
