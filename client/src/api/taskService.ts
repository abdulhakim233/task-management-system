import API from "./api";
import { Task } from "../types/tasks";

// ✅ Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await API.get<Task[]>("/tasks");
  return response.data;
};

// ✅ Fetch a single task by ID
export const fetchTask = async (id: string): Promise<Task> => {
  const response = await API.get<Task>(`/tasks/${id}`);
  return response.data;
};

// ✅ Create a new task
export const createTask = async (
  taskData: Omit<Task, "id" | "created_at" | "updated_at">
): Promise<Task> => {
  const response = await API.post<Task>("/tasks", taskData);
  return response.data;
};

// ✅ Update a task
export const updateTask = async (
  id: string,
  taskData: Partial<Task>
): Promise<Task> => {
  const response = await API.put<Task>(`/tasks/${id}`, taskData);
  return response.data;
};

// ✅ Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};

// ✅ Assign a task to a user (Admin only)
export const assignTask = async (id: string, userId: string): Promise<Task> => {
  const response = await API.put<Task>(`/tasks/${id}/assign`, {
    assigned_user_id: userId,
  });
  return response.data;
};
