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
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'due_date' => $validated['due_date'],
            'user_id' => $user->id,
        ]);

        return response()->json($task, 201);
    }

    // Show a specific task
    public function show($id)
    {
        $user = Auth::user();
        $task = Task::findOrFail($id);

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

        if ($user->role !== 'admin' && $task->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:Pending,In Progress,Completed',
            'due_date' => 'sometimes|date',
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    // Delete a task
    public function destroy($id)
    {

        $task = Task::findOrFail($id);

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }

    // Assign a user to a task
    public function assignUser(Request $request, $id)
    {


        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'assigned_user_id' => 'nullable|exists:users,id',
        ]);

        $task->update([
            'assigned_user_id' => $validated['assigned_user_id'],
        ]);

        return response()->json($task, 200);
    }
}
