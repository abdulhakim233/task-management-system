export interface User {
  id: string;
  name: string;
  email?: string;
  role?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  due_date: string;
  assigned_user?: User;
}

export type TaskStatus = "Pending" | "In Progress" | "Completed";
