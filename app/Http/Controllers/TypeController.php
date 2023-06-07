<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Types",description="API Endpoints of Types")
 * @OA\Schema(
 *     schema="Type",
 *     required={"name"},
 *     @OA\Property(property="name",type="string",)
 * )
 */
class TypeController extends Controller
{
    /**
     * Create a new type
     *
     * openapi php comment block
     *
     * @OA\Post(
     *      path="/types",
     *      tags={"Types"},
     *      summary="Create a type",
     *      description="Create a new type",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              example={"name": "Sword"},
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                  ),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Type created successfully",
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to create a type",
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
     *      path="/types",
     *      tags={"Types"},
     *      summary="Get all types",
     *      description="Get all types",
     *      @OA\Response(
     *          response=200,
     *          description="Types retrieved successfully",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No types found",
     *      ),
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
     * Get a type by id
     *
     * openapi php comment block
     *
     * @OA\Get(
     *      path="/types/{id}",
     *      tags={"Types"},
     *      summary="Get a type by id",
     *      description="Get a type by id",
     *      @OA\Parameter(
     *          name="id",
     *          description="Type id",
     *          required=true,
     *          in="path",
     *          example=1,
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Type retrieved successfully",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Type with id 1 not found",
     *      ),
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
     *      path="/types/{id}",
     *      tags={"Types"},
     *      summary="Update a type",
     *      description="Update a type",
     *      @OA\Parameter(
     *          name="id",
     *          description="Type id",
     *          required=true,
     *          in="path",
     *          example=1,
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              example={"name": "Sword"},
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="name",
     *                      type="string",
     *                  ),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Type updated successfully",
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to update a type",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Type with id 1 not found",
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad request",
     *      ),
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
     * Delete a type
     *
     * openapi php comment block
     *
     * @OA\Delete(
     *      path="/types/{id}",
     *      tags={"Types"},
     *      summary="Delete a type",
     *      description="Delete a type",
     *      @OA\Parameter(
     *          name="id",
     *          description="Type id",
     *          required=true,
     *          in="path",
     *          example=1,
     *          @OA\Schema(
     *              type="integer",
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Type deleted successfully",
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="You are not authorized to delete a type",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Type with id 1 not found",
     *      ),
     * )
     *
     * @param $id
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
