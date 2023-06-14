<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Item;
use App\Models\Profile;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Task",
 *     description="Endpoints of tasks"
 * )
 * @OA\Schema(
 *     schema="Task",
 *     required={"profile_id", "description", "isCompleted"},
 *     @OA\Property(property="profile_id", type="object", ref="#/components/schemas/Profile"),
 *     @OA\Property(property="description", type="string", description="The description of the task", example="Kill the Night King"),
 *     @OA\Property(property="isCompleted", type="int", description="The status of the task", example=0),
 *     @OA\Property(property="character_id", type="object", ref="#/components/schemas/Character"),
 *     @OA\Property(property="item_id", type="object", ref="#/components/schemas/Item"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-03-25 12:00:00"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-03-25 12:00:00")
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
 *     @OA\JsonContent(required={"profile_id", "description", "isCompleted"},
 *             @OA\Property(property="profile_id", type="integer", description="The id of the profile", example=1),
 *             @OA\Property(property="description", type="string", description="The description of the task", example="Kill the Night King"),
 *             @OA\Property(property="isCompleted", type="int", description="The status of the task", example=0),
 *             @OA\Property(property="character_id", type="integer", description="The id of the character", example=1),
 *             @OA\Property(property="item_id", type="integer", description="The id of the item", example=1)
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
     *      tags={"Task"},
     *      path="/tasks",
     *      summary="Create a new task",
     *      description="Create a new task using the data provided in the request body. (Admins can create tasks for other users)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/TaskCreate"),
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
     *      @OA\Response(
     *          response=201,
     *          description="Success: Task created",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Task created successfully")
     *         )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request: Data validation error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="The description field is required")
     *         )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized: Tasks can only be created by admins or the user themself",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="You are not authorized to create a task")
     *         )
     *      )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createTask(Request $request): JsonResponse
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            "description" => "required|string",
            "isCompleted" => "required|integer",
            "profile_id" => "required|integer",
            "character_id" => "integer",
            "item_id" => "integer",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Check if  profile exists
        $profile = Profile::find($request->profile_id);
        if (!$profile) {
            return response()->json(
                ["message" => "Profile with id $request->profile_id not found"],
                404
            );
        }
        // Check if character exists
        $character = Character::find($request->character_id);
        if ($request->character_id) {
            if (!$character) {
                return response()->json(
                    [
                        "message" => "Character with id $request->character_id",
                    ],
                    400
                );
            }
        }

        // Check if item exists
        $item = Item::find($request->item_id);
        if ($request->item_id) {
            if (!$item) {
                return response()->json(
                    ["message" => "Item with id $request->item_id"],
                    400
                );
            }
        }

        // Check if the profile belongs to the user or is Admin
        $admin = Auth::user()->isAdmin;
        if (!$admin and $profile->user_id != Auth::id()) {
            return response()->json(
                ["message" => "You are not authorized to create a task"],
                401
            );
        }

        // Create task
        Task::create([
            "description" => $request->description,
            "isCompleted" => $request->isCompleted,
            "profile_id" => $request->profile_id,
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
     *      tags={"Task"},
     *      path="/tasks",
     *      summary="Get all tasks",
     *      description="Get all tasks from the database",
     *      @OA\Response(
     *          response=200,
     *          description="Success: Returns all tasks",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/Task")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found: Tasks don't exist",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="No tasks found")
     *          )
     *      )
     * )
     *
     * @return JsonResponse
     */
    public function getAllTasks(): JsonResponse
    {
        $tasks = Task::with("profile", "character", "item")->get();
        // Check if tasks exist
        if (count($tasks) < 1) {
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
     * Get a task
     *
     * @OA\Get(
     *      tags={"Task"},
     *      path="/tasks/{id}",
     *      summary="Get a task",
     *      description="Get a task by ID sent in the URL from the database",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of task to return",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success: Returns a task",
     *          @OA\JsonContent(ref="#/components/schemas/Task")
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found: Task doesn't exist",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Task not found")
     *         )
     *       ),
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getTaskById($id): JsonResponse
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
     * Get tasks by profile ID
     *
     * @OA\Get(
     *      tags={"Task"},
     *      path="/tasks/profile/{id}",
     *      summary="Get tasks by profile ID",
     *      description="Get a task by the profile ID sent in the URL from the database",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of profile of tasks to return",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success: Returns all tasks from a profile",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/Task")
     *          )
     *      ),
     *     @OA\Response(
     *          response=400,
     *          description="Bad Request: Profile doesn't exist",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Profile not found")
     *         )
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found: Tasks don't exist",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Task not found")
     *         )
     *       ),
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getTasksByProfileId($id): JsonResponse
    {
        $profile = Profile::find($id);
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile not found",
                ],
                401
            );
        }
        $task = Task::with("profile", "character", "item")
            ->where("profile_id", $id)
            ->get();

        // Check if tasks exists
        if (!$task) {
            return response()->json(
                [
                    "message" => "Tasks not found",
                ],
                404
            );
        }
        return response()->json($task);
    }

    /**
     * Update a task
     *
     * @OA\Put(
     *      tags={"Task"},
     *      path="/tasks/{id}",
     *      summary="Update a task",
     *      description="Update a task by ID sent in the URL and data provided in the request body. Only the user who created the task and admins can update it.",
     *      security={{"sanctum":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of task to update",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
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
     *     @OA\RequestBody(ref="#/components/requestBodies/TaskUpdate"),
     *      @OA\Response(
     *          response=200,
     *          description="Success: Task updated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Task updated successfully")
     *         )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request: Data validation error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="The isCompleted field must be 0 or 1")
     *         )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized: Only the user who created the task and admins can update it",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="You are not authorized to update this task")
     *         )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found: Task doesn't exist",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Task not found")
     *         )
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
        if ($profile->user_id !== $user->id and !$user->isAdmin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update this task",
                ],
                401
            );
        }

        $validator = Validator::make($request->all(), [
            "profile_id" => "required|integer",
            "description" => "required|string",
            "isCompleted" => "required|integer",
            "character_id" => "integer",
            "item_id" => "integer",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Check if profile exists
        $profile = Profile::find($request->profile_id);
        if (!$profile) {
            return response()->json(
                [
                    "message" => "Profile with id $request->profile_id not found",
                ],
                400
            );
        }

        // Check if character exists
        $character = Character::find($request->character_id);
        if (!$character) {
            return response()->json(
                [
                    "message" => "Character with id $request->character_id not found",
                ],
                400
            );
        }

        // Check if item exists
        $item = Item::find($request->item_id);
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id $request->item_id not found",
                ],
                400
            );
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
     *
     * @OA\Delete(
     *      tags={"Task"},
     *      path="/tasks/{id}",
     *      summary="Delete a task",
     *      description="Delete a task by ID sent in the URL. Only the user who created the task and admins can delete it.",
     *      security={{"sanctum":{}}},
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of task to delete",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *     @OA\Parameter(
     *         name="Accept",
     *         in="header",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="application/json"
     *         )
     *     ),
     *      @OA\Response(
     *          response=200,
     *          description="Success: Task deleted",
     *          @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Task deleted successfully")
     *         )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to delete this task",
     *          @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete this task")
     *         )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Task not found",
     *          @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Task with id 1 not found")
     *         )
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
        if (!$user->isAdmin) {
            $profile = Profile::find($request->profile_id);
            if ($profile->user_id !== $user->id) {
                return response()->json(
                    [
                        "message" =>
                            "You are not authorized to delete this task",
                    ],
                    401
                );
            }
        }
        // Delete task
        $task->delete();
        return response()->json([
            "message" => "Task deleted successfully",
        ]);
    }
}
