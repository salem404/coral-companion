<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SanctumController extends Controller
{
    //register
    public function register(Request $request)
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
        //add the sanctum token to the user and store it in a variable
        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json(
            [
                "message" => "User created successfully",
                "token" => $token,
            ],
            201
        );
    }
    //login
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

        //add the sanctum token to the user
        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json(
            [
                "message" => "User logged in successfully",
                "token" => $token,
            ],
            200
        );
    }

    //logout
    public function logout(Request $request)
    {
        //delete the token of the loged in user with sanctum
        $request
            ->user()
            ->currentAccessToken()
            ->delete();
        //devolver mensaje "logout exitoso"
        return response()->json(
            [
                "message" => "User logged out successfully",
            ],
            200
        );
    }
}
