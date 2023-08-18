<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileActionsController;
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

Route::resource('profile_actions', ProfileActionsController::class);
Route::resource('dashboard', AdminController::class);
Route::resource('profile', ProfileController::class);
Route::resource('filter', FilterController::class);
Route::resource('photo', PhotoController::class);

Route::post('checkAuth',    [AuthorizationController::class, 'checkAuth']);
Route::post('login',        [AuthorizationController::class, 'authenticate']);
Route::post('register',     [AuthorizationController::class, 'register']);
Route::get('find_person',   [AdminController::class, 'findPersons']);
Route::get('logout',        [AuthorizationController::class, 'logout']);
Route::get('moderation',    [AdminController::class, 'moderation']);
Route::get('export',        [AdminController::class, 'export']);
Route::get('lines',         [AdminController::class, 'lines']);






// Route::group(['middleware' => ['auth:sanctum']],  function() {
//     Route::post('logout', [UserAuthenticationController::class, 'logout']);
// });
