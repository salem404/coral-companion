<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Task",
 *     description="API Endpoints of Task Controller"
 * )
 * @OA\Schema(
 *     schema="Task",
 *     required={"profile_id", "description", "completed"},
 *     @OA\Property(property="profile_id", type="integer", description="The id of the profile", example=1),
 *     @OA\Property(property="description", type="string", description="The description of the task", example="Kill the Night King"),
 *     @OA\Property(property="isCompleted", type="int", description="The status of the task", example=0),
 *     @OA\Property(property="character_id", type="integer", description="The id of the character", example=2),
 *     @OA\Property(property="item_id", type="integer", description="The id of the item", example=4)
 * )
 * @OA\RequestBody (
 *     request="TaskUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *     @OA\Property(property="profile_id", type="integer", description="The id of the profile", example=1),
 *     @OA\Property(property="description", type="string", description="The description of the task", example="Kill the Night King"),
 *     @OA\Property(property="isCompleted", type="int", description="The status of the task", example=0),
 *     @OA\Property(property="character_id", type="integer", description="The id of the character", example=1),
 *     @OA\Property(property="item_id", type="integer", description="The id of the item", example=1)
 * ))
 *
 * @OA\RequestBody(
 *     request="TaskCreate",
 *     required=true,
 *     @OA\MediaType(
 *         mediaType="application/json",
 *         example={"profile_id": 1, "description": "Kill the Night King", "completed": 0},
 *         @OA\Schema(
 *             @OA\Property(property="profile_id", type="integer", description="The id of the profile", example=1),
 *             @OA\Property(property="description", type="string", description="The description of the task", example="Kill the Night King"),
 *             @OA\Property(property="isCompleted", type="int", description="The status of the task", example=0),
 *             @OA\Property(property="character_id", type="integer", description="The id of the character", example=1),
 *             @OA\Property(property="item_id", type="integer", description="The id of the item", example=1)
 *         )
 *     )
 * )
 *
 */
class TaskController extends Controller
{
    /**
     * Create a new task
     *
     * openapi php comment block
     *
     * @OA\Post(
     *      path="/tasks",
     *      tags={"Task"},
     *      summary="Create a task",
     *      description="Create a new task",
     *      @OA\Response(
     *          response=201,
     *          description="Task created successfully",
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to create a task",
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request",
     *      ),
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createTask(Request $request): JsonResponse
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

    /**
     * Get all tasks
     *
     * @OA\Get(
     *      path="/tasks",
     *      tags={"Task"},
     *      summary="Get all tasks",
     *      description="Returns all tasks",
     *      @OA\Response(
     *         response=404,
     *         description="Not found: Tasks don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No tasks found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllTasks(): JsonResponse
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

    /**
     * Get a task by id
     *
     * @OA\Get(
     *      path="/tasks/{id}",
     *      tags={"Task"},
     *      summary="Get a task by id",
     *      description="Returns a task",
     *      @OA\Parameter(
     *          name="id",
     *          description="Task id",
     *          required=true,
     *          in="path",
     *          example=1,
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Task not found",
     *       ),
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getTaskById(int $id): JsonResponse
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

    /**
     * Update a task
     * openapi php comment block
     * @OA\Put(
     *      path="/tasks/{id}",
     *      tags={"Task"},
     *      summary="Update a task",
     *      description="Update a task",
     *      @OA\Parameter(
     *          name="id",
     *          description="Task id",
     *          required=true,
     *          in="path",
     *          example=1,
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Task updated successfully",
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to update this task",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Task not found",
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request",
     *      ),
     * )
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateTask(Request $request, int $id): JsonResponse
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
            "isCompleted" => "required|tinyint max:1 min:0",
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
            "isCompleted" => $request->isCompleted,
            "character_id" => $request->character_id,
            "item_id" => $request->item_id,
        ]);

        return response()->json([
            "message" => "Task updated successfully",
        ]);
    }

    /**
     * Delete a task
     * openapi php comment block
     * @OA\Delete(
     *      path="/tasks/{id}",
     *      tags={"Task"},
     *      summary="Delete a task",
     *      description="Delete a task",
     *      @OA\Parameter(
     *          name="id",
     *          description="Task id",
     *          required=true,
     *          in="path",
     *          example=1,
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Task deleted successfully",
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to delete this task",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Task not found",
     *      ),
     * )
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function deleteTask(Request $request, int $id): JsonResponse
    {
        $task = Task::find($id);
        // Check if task exists
        if (!$task) {
            return response()->json(
                [
                    "message" => "Task with id $id not found",
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
