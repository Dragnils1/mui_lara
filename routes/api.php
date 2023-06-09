<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorizationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});

Route::resource('profile', ProfileController::class);

Route::post('login', [AuthorizationController::class, 'authenticate']);
Route::post('register', [AuthorizationController::class, 'register']);
Route::post('checkAuth', [AuthorizationController::class, 'checkAuth']);
Route::get('find_person', [AdminController::class, 'findPersons']);
Route::get('moderation', [AdminController::class, 'moderation']);
Route::get('lines', [AdminController::class, 'lines']);



// Route::group(['middleware' => ['auth:sanctum']],  function() {
//     Route::post('logout', [UserAuthenticationController::class, 'logout']);
// });
