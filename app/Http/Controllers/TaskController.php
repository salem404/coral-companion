<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Create a new task
    public function createTask(Request $request): \Illuminate\Http\JsonResponse
    {
        // Check if the profile belongs to the user or is Admin
        $user = Auth::user();
        $profile = Profile::find($request->profile_id);
        if ($profile->user_id !== $user->id || !$user->isAdmin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to delete this profile",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "profile_id" => "required|integer",
            "description" => "required|string",
            "completed" => "required|tinyint",
            "character_id" => "integer",
            "item_id" => "integer",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create task
        $task = Task::create([
            "profile_id" => $request->profile_id,
            "description" => $request->description,
            "completed" => $request->completed,
            "character_id" => $request->character_id,
            "item_id" => $request->item_id,
        ]);

        return response()->json(
            [
                "message" => "Task created successfully",
            ],
            201
        );
    }

    // Get all tasks
    public function getAllTasks(): \Illuminate\Http\JsonResponse
    {
        $tasks = Task::with("profile", "character", "item")->get();
        // Check if tasks exist
        if (count($tasks) === 0) {
            return response()->json(
                [
                    "message" => "No tasks found",
                ],
                404
            );
        }
        return response()->json($tasks);
    }

    // Get a task
    public function getTaskById(int $id): \Illuminate\Http\JsonResponse
    {
        $task = Task::with("profile", "character", "item")->find($id);
        // Check if task exists
        if (!$task) {
            return response()->json(
                [
                    "message" => "Task not found",
                ],
                404
            );
        }
        return response()->json($task);
    }

    // Update a task
    public function updateTask(
        Request $request,
        int $id
    ): \Illuminate\Http\JsonResponse {
        // Check if the profile belongs to the user or is Admin
        $user = Auth::user();
        $profile = Profile::find($request->profile_id);
        if ($profile->user_id !== $user->id || !$user->isAdmin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to delete this profile",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "profile_id" => "required|integer",
            "description" => "required|string",
            "completed" => "required|tinyint",
            "character_id" => "integer",
            "item_id" => "integer",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update task
        $task = Task::find($id);
        $task->update([
            "profile_id" => $request->profile_id,
            "description" => $request->description,
            "completed" => $request->completed,
            "character_id" => $request->character_id,
            "item_id" => $request->item_id,
        ]);

        return response()->json([
            "message" => "Task updated successfully",
        ]);
    }

    // Delete a task
    public function deleteTask(
        Request $request,
        int $id
    ): \Illuminate\Http\JsonResponse {
        $task = Task::find($id);
        // Check if task exists
        if (!$task) {
            return response()->json(
                [
                    "message" => "Task with id {$id} not found",
                ],
                404
            );
        }

        // Check if the profile belongs to the user or is Admin
        $user = Auth::user();
        $profile = Profile::find($request->profile_id);
        if ($profile->user_id !== $user->id || !$user->isAdmin) {
            return response()->json(
                [
                    "message" =>
                        "You are not authorized to delete this profile",
                ],
                401
            );
        }

        // Delete task
        $task->delete();
        return response()->json([
            "message" => "Task deleted successfully",
        ]);
    }
}
