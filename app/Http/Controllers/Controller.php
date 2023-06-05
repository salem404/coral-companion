<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      x={
 *          "logo": {
 *              "url": "https://raw.githubusercontent.com/salem404/coral-companion/02b2826183f4a25dbc0cd79d8ea361067ef74ea0/frontend/src/assets/img/logo-color.svg"
 *          }
 *      },
 *      title="Coral Companion API Documentation",
 *      description="Documentation for the API used in the Coral Companion app",
 *      @OA\Contact(name="Paula Rumeu",email="paururo08@hotmail.com"),
 *      @OA\License(
 *         name="Creative Commons Attribution Share Alike 4.0 International",
 *         url="https://creativecommons.org/licenses/by-sa/4.0/"
 *     )
 * )
 * @OA\Server(url="http://localhost/api",description="Localhost")
 * @OA\Server(url="https://coral-companion.railway.com/api",description="Railway")
 * @OA\Component(
 *     @OA\SecurityScheme(securityScheme="sanctum",type="http",scheme="bearer")
 * ),
 * @OA\Component (
 *     @OA\Schema(
 *     schema="Season",
 *     @OA\Property(property="id",type="integer",example=1),
 *     @OA\Property(property="name",type="string",example="Winter")
 *     )
 * )
 * TODO: Change Railway server when deployed
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
