<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(name="Items",description="Endpoints for items"),
 * @OA\Schema(
 *     schema="Item",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Sea Grapes"),
 *     @OA\Property(property="type_id", type="integer", example=1),
 *     @OA\Property(property="icon", type="string", example="https://www.nookipedia.com/w/images/thumb/4/4a/NH-Sea_Grapes.png/64px-NH-Sea_Grapes.png")
 * )
 * TODO: Add request body
 */
class ItemController extends Controller
{
    //Create a new item
    public function createItem(Request $request): \Illuminate\Http\JsonResponse
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
        $item = Item::create([
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

    // Get all items
    public function getItems(): \Illuminate\Http\JsonResponse
    {
        $items = Item::with("type", "tasks")->get();
        // Check if items exist
        if (count($items) === 0) {
            return response()->json(
                [
                    "message" => "No items found",
                ],
                404
            );
        }
        return response()->json($items);
    }

    // Get an item
    public function getItem($id): \Illuminate\Http\JsonResponse
    {
        $item = Item::with("type", "tasks")->find($id);
        // Check if item exists
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id {$id} not found",
                ],
                404
            );
        }
        return response()->json($item);
    }

    // Update an item
    public function updateItem(
        Request $request,
        $id
    ): \Illuminate\Http\JsonResponse {
        // Check if item exists
        $item = Item::find($id);
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id {$id} not found",
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

    // Delete an item
    public function deleteItem($id): \Illuminate\Http\JsonResponse
    {
        // Check if item exists
        $item = Item::find($id);
        if (!$item) {
            return response()->json(
                [
                    "message" => "Item with id {$id} not found",
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
