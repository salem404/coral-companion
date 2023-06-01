<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class SanctumController extends Controller
{
    // Register
    /**
     * @throws ValidationException
     */
    public function register(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validate($request, [
            "username" => "required",
            "email" => "required|email",
            "password" => "required|min:6",
        ]);

        $user = User::create([
            "username" => $request->username,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);

        // Add the sanctum token to the user and store it in a variable
        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json(
            [
                "message" => "User created successfully",
                "token" => $token,
            ],
            201
        );
    }

    // Login
    public function login(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email",
            "password" => "required|min:6",
        ]);

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

    // Logout
    public function logout(Request $request)
    {
        // Delete the token of the loged in user with sanctum
        $request
            ->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            "message" => "User logged out successfully",
        ]);
    }
}
