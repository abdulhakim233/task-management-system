import React, { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "@/api/taskService";
import TaskCard from "./TaskCard";
import TaskFilter from "./TaskFilter";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, RefreshCcwIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Task } from "@/types/tasks"; // ✅ Use Task type
import { Link } from "react-router-dom";

interface TaskListProps {
  // ✅ Props are now optional
  tasks?: Task[];
  onDelete?: (id: string) => void;
  onStatusChange?: (
    id: string,
    status: "Pending" | "In Progress" | "Completed"
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks: propTasks,
  onDelete,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(propTasks || []); // ✅ Use props if available
  const [loading, setLoading] = useState<boolean>(!propTasks);
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "due_date",
    sortOrder: "asc",
  });

  useEffect(() => {
    if (!propTasks) {
      // ✅ Fetch tasks only if not provided via props
      const getTasks = async () => {
        try {
          const data = await fetchTasks();
          setTasks(data);
        } catch (error) {
          console.error("Failed to load tasks");
        } finally {
          setLoading(false);
        }
      };
      getTasks();
    } else {
      setTasks(propTasks);
      setLoading(false); // ✅ Set loading to false if propTasks is available
    }
  }, [propTasks]);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted",
    });
    onDelete?.(id); // ✅ Call onDelete if provided
  };

  const handleStatusChange = async (
    id: string,
    status: "Pending" | "In Progress" | "Completed"
  ) => {
    await updateTaskStatus(id, status);
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
    toast({
      title: "Task status updated",
      description: `The task status has been updated to ${status}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold ">My Tasks</h2>
        <Link
          to={"/tasks/new"}
          className="flex text-white bg-blue-500 p-2 mr-4 rounded-md"
        >
          <PlusIcon /> Add Task
        </Link>
      </div>
      <TaskFilter currentFilters={filters} onFilterChange={setFilters} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={() => {
                navigate(`/tasks/${task.id}/edit`);
              }}
              onStatusChange={onStatusChange || handleStatusChange} // ✅ Use onStatusChange if available
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
