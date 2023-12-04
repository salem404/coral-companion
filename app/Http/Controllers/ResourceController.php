<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Resources", description="Endpoints for resources")
 * @OA\Schema(
 *     schema="Resource",
 *     required={"name", "id", "icon"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Sea Grapes"),
 *     @OA\Property(property="icon", type="string", example="sea-grapes.png"),
 * )
 * @OA\RequestBody(
 *     request="ResourceUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *         @OA\Property(property="name", type="string", example="Sea Grapes"),
 *         @OA\Property(property="icon", type="string", example="sea-grapes.png")
 *     )
 * )
 * @OA\RequestBody(
 *     request="ResourceCreate",
 *     required=true,
 *     @OA\JsonContent(required={"name", "icon"},
 *         @OA\Property(property="name", type="string", example="Sea Grapes"),
 *         @OA\Property(property="icon", type="string", example="sea-grapes.png")
 *     )
 * )
 *
 * @param Request $request The request object containing the data to create or update the resource
 * @return JsonResponse The response containing a success message if the resource was created or updated successfully, or an error message otherwise
 */
class ResourceController extends Controller
{
    /**
     * Create a new resource
     *
     * @OA\Post(
     *     tags={"Resources", "Admin"},
     *     path="/resources",
     *     summary="Create a new resource",
     *     description="Create a new resource using the data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/ResourceCreate"),
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
     *         description="Success: Resource created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Resource created")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The name field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can create items",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to create a resource")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createResource(Request $request): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to create a resource",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Check if resource already exists
        $resource = Resource::where("name", $request->name)->first();
        if ($resource) {
            return response()->json(
                [
                    "message" => "Resource already exists",
                ],
                400
            );
        }

        // Create resource
        Resource::create([
            "name" => $request->name,
            "icon" => $request->icon,
        ]);

        return response()->json(
            [
                "message" => "Resource created successfully",
            ],
            201
        );
    }

    /**
     * Get all resources
     *
     * @OA\Get(
     *     tags={"Resources"},
     *     path="/resources",
     *     summary="Get all resources",
     *     description="Get all resources from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Return all resources",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Resource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Resources don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No resources found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getAllResources(): JsonResponse
    {
        $resources = Resource::with("tasks")->get();
        // Check if resources exist
        if (count($resources) < 1) {
            return response()->json(
                [
                    "message" => "No items found",
                ],
                404
            );
        }
        return response()->json($resources);
    }

    /**
     * Get a resource by id
     *
     * @OA\Get(
     *     tags={"Resources"},
     *     path="/resources/{id}",
     *     summary="Get a resource",
     *     description="Get a resource using the id provided in the request URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of resource to return",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Return a resource",
     *         @OA\JsonContent(ref="#/components/schemas/Resource")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Resource doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Resource with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id The ID of the resource to retrieve
     * @return JsonResponse The response containing the resource if found, or an error message otherwise
     */
    public function getResourceById($id): JsonResponse
    {
        $resource = Resource::with("type", "tasks")->find($id);
        // Check if resource exists
        if (!$resource) {
            return response()->json(
                [
                    "message" => "Resource with id $id not found",
                ],
                404
            );
        }
        return response()->json($resource);
    }

    /**
     * Update a resource
     *
     * @OA\Put(
     *     tags={"Resources", "Admin"},
     *     path="/resources/{id}",
     *     summary="Update a resource",
     *     description="Update a resource by ID in the URL and data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of resource to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
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
     *     @OA\RequestBody(ref="#/components/requestBodies/ResourceUpdate"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Resource updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Resource updated")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The name field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can update resources",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update a resource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Resource doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Resource with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @param int $id The ID of the resource to update
     * @return JsonResponse The response containing a success message if the resource was updated successfully, or an error message otherwise
     */
    public function updateResource(Request $request, $id): JsonResponse
    {
        $resource = Resource::find($id);
        // Check if resource exists
        if (!$resource) {
            return response()->json(
                [
                    "message" => "Resource with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update a resource",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update item
        $resource->update([
            "name" => $request->name,
            "icon" => $request->icon,
        ]);

        return response()->json(
            [
                "message" => "Resource updated successfully",
            ],
            200
        );
    }

    /**
     * Delete a resource
     *
     * @OA\Delete(
     *     tags={"Resources", "Admin"},
     *     path="/resources/{id}",
     *     summary="Delete a resource",
     *     description="Delete a resource by ID sent in the URL. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of resource to delete",
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
     *         description="Success: Resource deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Resource deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can delete resources",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete a resource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Resource doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Resource with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id The ID of the resource to delete
     * @return JsonResponse The response containing a success message if the resource was deleted successfully, or an error message otherwise
     */
    public function deleteResource($id): JsonResponse
    {
        $resource = Resource::find($id);
        // Check if resource exists
        if (!$resource) {
            return response()->json(
                [
                    "message" => "Resource with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete an item",
                ],
                401
            );
        }

        // Delete resource
        $resource->delete();

        return response()->json(
            [
                "message" => "Resource deleted successfully",
            ],
            200
        );
    }
}
