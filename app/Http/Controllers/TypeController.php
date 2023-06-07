<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Types",description="Endpoints of types")
 * @OA\Schema(
 *     schema="Type",
 *     required={"name"},
 *     @OA\Property(property="name",type="string",)
 * )
 * @OA\RequestBody (
 *     request="Type",
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/Type")
 * )
 *
 */
class TypeController extends Controller
{
    /**
     * Create a new type
     *
     * @OA\Post(
     *      tags={"Types"},
     *      path="/types",
     *      summary="Create a new type",
     *      description="Create a new type using the data provided in the request body.",
     *     security={{"sanctum":{}}},
     *      @OA\RequestBody(ref="#/components/requestBodies/Type"),
     *      @OA\Response(
     *          response=201,
     *          description="Success: Type created",
     *          @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Type created successfully")
     *         )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The name field is required")
     *         )
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized. Only admins can create types",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to create a type")
     *         )
     *      ),
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createType(Request $request): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to create a type",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create type
        $type = Type::create([
            "name" => $request->name,
        ]);
        return response()->json(
            [
                "message" => "Type created successfully",
            ],
            201
        );
    }

    /**
     * Get all types
     *
     * openapi php comment block
     *
     * @OA\Get(
     *      tags={"Types"},
     *      path="/types",
     *      summary="Get all types",
     *      description="Get all types from the database",
     *      @OA\Response(
     *          response=200,
     *          description="Success: Returns all types",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Type")
     *         )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Not found: Characters don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No characters found")
     *         )
     *      )
     * )
     *
     * @return JsonResponse
     */
    public function getAllTypes(): JsonResponse
    {
        $types = Type::with("items")->get();
        // Check if types exist
        if (count($types) < 1) {
            return response()->json(
                [
                    "message" => "No types found",
                ],
                404
            );
        }
        return response()->json($types);
    }

    /**
     * Get a type
     *
     * @OA\Get(
     *      tags={"Types"},
     *      path="/types/{id}",
     *      summary="Get a type by id",
     *      description="Get a type by ID sent in the URL from the database",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="Type id",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Success: Returns the type",
     *         @OA\JsonContent(ref="#/components/schemas/Type")
     *      ),
     *      @OA\Response(
     *         response=404,
     *         description="Not found: Type doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Type with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function getTypeById($id): JsonResponse
    {
        $type = Type::with("items")->find($id);
        // Check if type exists
        if (!$type) {
            return response()->json(
                [
                    "message" => "Type with id $id not found",
                ],
                404
            );
        }
        return response()->json($type);
    }

    /**
     * Update a type
     *
     * openapi php comment block
     *
     * @OA\Put(
     *      tags={"Types"},
     *      path="/types/{id}",
     *      summary="Update a type",
     *      description="Update a type by ID in the URL and data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of type to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *      @OA\RequestBody(ref="#/components/requestBodies/Type"),
     *      @OA\Response(
     *         response=200,
     *         description="Success: Type updated",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Type updated successfully")
     *         )
     *     ),
     *      @OA\Response(
     *         response=400,
     *         description="Bad Request: Data validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The name field is required")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can update types",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update a type")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Type doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Type with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function updateType(Request $request, $id): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update a type",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $type = Type::find($id);
        // Check if type exists
        if (!$type) {
            return response()->json(
                [
                    "message" => "Type with id $id not found",
                ],
                404
            );
        }
        // Update type
        $type->update([
            "name" => $request->name,
        ]);
        return response()->json(
            [
                "message" => "Type updated successfully",
            ],
            200
        );
    }

    /**
     * Delete a character
     *
     * @OA\Delete(
     *     tags={"Types"},
     *     path="/types/{id}",
     *     summary="Delete a type",
     *     description="Delete a type by ID sent in the URL (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the type to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: type deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Type deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can delete types",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete a type")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Type doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Type with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteType($id): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to delete a type",
                ],
                401
            );
        }
        $type = Type::find($id);
        // Check if type exists
        if (!$type) {
            return response()->json(
                [
                    "message" => "Type with id $id not found",
                ],
                404
            );
        }
        // Delete type
        $type->delete();
        return response()->json([
            "message" => "Type deleted successfully",
        ]);
    }
}
