<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    // Get all users
    public function getAllUsers(): \Illuminate\Http\JsonResponse
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

    // Get a user by id
    public function getUserById($id): \Illuminate\Http\JsonResponse
    {
        $user = User::find($id);
        // Check if user exists
        if (!$user) {
            return response()->json(
                [
                    "message" => "User with id {$id} not found",
                ],
                404
            );
        }
        return response()->json($user);
    }
}
