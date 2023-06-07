<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(name="Items", description="Endpoints for items")
 * @OA\Schema(
 *     schema="Item",
 *     required={"name", "id", "icon"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Sea Grapes"),
 *     @OA\Property(property="type_id", type="object", ref="#/components/schemas/Type"),
 *     @OA\Property(property="icon", type="string", example="sea-grapes.png"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2021-03-10T17:26:00.000000Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2021-03-10T17:26:00.000000Z")
 * )
 * @OA\RequestBody(
 *     request="ItemUpdate",
 *     required=true,
 *     @OA\JsonContent(
 *         @OA\Property(property="name", type="string", example="Sea Grapes"),
 *         @OA\Property(property="type_id", type="integer", example=1),
 *         @OA\Property(property="icon", type="string", example="sea-grapes.png")
 *     )
 * )
 * @OA\RequestBody(
 *     request="ItemCreate",
 *     required=true,
 *     @OA\JsonContent(required={"name", "icon"},
 *         @OA\Property(property="name", type="string", example="Sea Grapes"),
 *         @OA\Property(property="type_id", type="integer", example=1),
 *         @OA\Property(property="icon", type="string", example="sea-grapes.png")
 *     )
 * )
 */
class ItemController extends Controller
{
    /**
     * Create a new item
     *
     * @OA\Post(
     *     tags={"Items"},
     *     path="/items",
     *     summary="Create a new item",
     *     description="Create a new item using the data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(ref="#/components/requestBodies/ItemCreate"),
     *     @OA\Response(
     *         response=201,
     *         description="Success: Item created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Item created")
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
     *             @OA\Property(property="message", type="string", example="You are not authorized to create an item")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createItem(Request $request): JsonResponse
    {
        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to create an item",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "type_id" => "required|integer",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create item
        Item::create([
            "name" => $request->name,
            "type_id" => $request->type_id,
            "icon" => $request->icon,
        ]);

        return response()->json(
            [
                "message" => "Item created successfully",
            ],
            201
        );
    }

    /**
     * Get all items
     *
     * @OA\Get(
     *     tags={"Items"},
     *     path="/items",
     *     summary="Get all items",
     *     description="Get all items from the database",
     *     @OA\Response(
     *         response=200,
     *         description="Success: Return all items",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Item")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Items don't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No items found")
     *         )
     *     )
     * )
     *
     * @return JsonResponse
     */
    public function getItems(): JsonResponse
    {
        $items = Item::with("type", "tasks")->get();
        // Check if items exist
        if (count($items) < 1) {
            return response()->json(
                [
                    "message" => "No items found",
                ],
                404
            );
        }
        return response()->json($items);
    }

    /**
     * Get an item
     *
     * @OA\Get(
     *     tags={"Items"},
     *     path="/items/{id}",
     *     summary="Get an item",
     *     description="Get an item using the id provided in the request URL",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of item to return",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Return an item",
     *         @OA\JsonContent(ref="#/components/schemas/Item")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Item doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Item with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getItem($id): JsonResponse
    {
        $item = Item::with("type", "tasks")->find($id);
        // Check if item exists
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id $id not found",
                ],
                404
            );
        }
        return response()->json($item);
    }

    /**
     * Update an item
     *
     * @OA\Put(
     *     tags={"Items"},
     *     path="/items/{id}",
     *     summary="Update an item",
     *     description="Update an item by ID in the URL and data provided in the request body. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of item to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(ref="#/components/requestBodies/ItemUpdate"),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Item updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Item updated")
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
     *         description="Unauthorized: Only admins can update items",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to update an item")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Item doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Item with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function updateItem(Request $request, $id): JsonResponse
    {
        $item = Item::find($id);
        // Check if item exists
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id $id not found",
                ],
                404
            );
        }

        // Check if user is admin
        $admin = Auth::user()->isAdmin;
        if (!$admin) {
            return response()->json(
                [
                    "message" => "You are not authorized to update an item",
                ],
                401
            );
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "type_id" => "integer",
            "icon" => "required|string",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Update item
        $item->update([
            "name" => $request->name,
            "type_id" => $request->type_id,
            "icon" => $request->icon,
        ]);

        return response()->json(
            [
                "message" => "Item updated successfully",
            ],
            200
        );
    }

    /**
     * Delete an item
     *
     * @OA\Delete(
     *     tags={"Items"},
     *     path="/items/{id}",
     *     summary="Delete an item",
     *     description="Delete an item by ID sent in the URL. (Admin only)",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of item to delete",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success: Item deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Item deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized: Only admins can delete items",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="You are not authorized to delete an item")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not found: Item doesn't exist",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Item with id 1 not found")
     *         )
     *     )
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteItem($id): JsonResponse
    {
        $item = Item::find($id);
        // Check if item exists
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id $id not found",
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

        // Delete item
        $item->delete();

        return response()->json(
            [
                "message" => "Item deleted successfully",
            ],
            200
        );
    }
}
