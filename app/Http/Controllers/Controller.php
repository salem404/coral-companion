<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Coral Companion API Documentation",
 *     description="Documentation for the API used in the Coral Companion app",
 *     @OA\Contact(name="Paula Rumeu", email="paururo08@hotmail.com"),
 *     @OA\License(
 *         name="Creative Commons Attribution Share Alike 4.0 International",
 *         url="https://creativecommons.org/licenses/by-sa/4.0/"
 *     ),
 *     x={
 *         "logo": {
 *             "url": "https://github.com/salem404/coral-companion/raw/master/frontend/src/assets/img/logo-color.svg"
 *         }
 *     }
 * )
 *
 * @OA\Server(url="http://localhost/api", description="Local")
 *
 * @OA\Component(
 *     @OA\SecurityScheme(securityScheme="sanctum", type="http", scheme="bearer")
 * )
 *
 * @OA\Tag(name="Admin", description="Admin operations")
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
