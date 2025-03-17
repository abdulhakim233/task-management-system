<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{


    // Get all tasks (filtered by role)
    public function index(Request $request)
    {
        $user = Auth::user();

        // Admin can see all tasks, regular user sees only their own
        if ($user->role === 'admin') {
            $tasks = Task::query()
                ->when($request->status, fn($query) => $query->where('status', $request->status))
                ->orderBy('due_date')
                ->get();
        } else {
            $tasks = Task::query()
                ->where('user_id', $user->id)
                ->when($request->status, fn($query) => $query->where('status', $request->status))
                ->orderBy('due_date')
                ->get();
        }

        return response()->json($tasks, 200);
    }

    // Create a new task
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:Pending,In Progress,Completed',
            'due_date' => 'required|date',
            'assigned_user_id' => 'nullable|exists:users,id'
        ]);

        // Only admin can assign tasks to other users
        if (isset($validated['assigned_user_id']) && $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized to assign tasks'], 403);
        }

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'due_date' => $validated['due_date'],
            'user_id' => $user->id,
            'assigned_user_id' => $validated['assigned_user_id'] ?? null,
        ]);

        return response()->json($task, 201);
    }

    // Show a specific task
    public function show($id)
    {
        $user = Auth::user();
        $task = Task::findOrFail($id);

        // Check if user has permission to view this task
        if ($user->role !== 'admin' && $task->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($task, 200);
    }

    // Update a task
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $task = Task::findOrFail($id);

        // Check if user has permission to update this task
        if ($user->role !== 'admin' && $task->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:Pending,In Progress,Completed',
            'due_date' => 'sometimes|date',
            'assigned_user_id' => 'nullable|exists:users,id'
        ]);

        // Only admin can reassign tasks
        if (isset($validated['assigned_user_id']) && $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized to reassign tasks'], 403);
        }

        $task->update($validated);

        return response()->json($task, 200);
    }

    // Delete a task
    public function destroy($id)
    {
        $user = Auth::user();
        $task = Task::findOrFail($id);

        // Check if user has permission to delete this task
        if ($user->role !== 'admin' && $task->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
