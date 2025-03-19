import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import { useToast } from "@/hooks/use-toast";
import { Task, User, TaskStatus } from "@/types/tasks";
import { fetchTasks } from "@/api/taskService";

const Tasks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { id } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const isNewTask = location.pathname === "/tasks/new";
  const isEditTask = location.pathname.includes("/edit");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskData = await fetchTasks();
        setTasks(taskData);

        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser: User = JSON.parse(user);
          setUserData(parsedUser);
          setIsAdmin(parsedUser.role === "admin");
        }

        const sampleUsers: User[] = [
          {
            id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "admin",
          },
          {
            id: "2",
            name: "Bob Smith",
            email: "bob@example.com",
            role: "user",
          },
        ];

        setUsers(sampleUsers);
      } catch (error) {
        console.error("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    toast({
      title: "Task created",
      description: "Your task has been created successfully",
    });

    navigate("/tasks");
  };

  const handleUpdateTask = (taskData: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskData.id ? { ...task, ...taskData } : task
      )
    );

    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    });

    navigate("/tasks");
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  if (isNewTask || isEditTask) {
    const taskToEdit = isEditTask
      ? tasks.find((task) => task.id === id)
      : undefined;

    return (
      <MainLayout>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold mb-6'>
            {isNewTask ? "Create New Task" : "Edit Task"}
          </h2>
          <TaskForm
            onSubmit={isNewTask ? handleCreateTask : handleUpdateTask}
            initialData={taskToEdit}
            isLoading={isLoading}
            users={isAdmin ? users : []}
            isAdmin={isAdmin}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />
    </MainLayout>
  );
};

export default Tasks;
