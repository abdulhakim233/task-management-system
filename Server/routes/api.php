<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    // List all tasks (with optional filtering)
    Route::get('/tasks', [TaskController::class, 'index']);

    // Create a new task
    Route::post('/tasks', [TaskController::class, 'store']);

    // View a specific task
    Route::get('/tasks/{id}', [TaskController::class, 'show']);

    // Update a task
    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    // Delete a task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
});



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
