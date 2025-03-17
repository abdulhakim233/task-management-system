<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Task Management Routes (protected by Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);       // Show a specific task
    Route::put('/tasks/{id}', [TaskController::class, 'update']);     // Update a task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->middleware(AdminMiddleware::class);;
    Route::put('/tasks/{id}/assign', [TaskController::class, 'assignUser'])->middleware(AdminMiddleware::class); // Assign a user to a task
});
