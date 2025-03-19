import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import {
  ClockIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
  UserIcon,
  CheckCircleIcon,
  PlayIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/tasks";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: "Pending" | "In Progress" | "Completed"
  ) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteDialog(false);
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted",
    });
  };

  const handleStatusChange = (
    newStatus: "Pending" | "In Progress" | "Completed"
  ) => {
    onStatusChange(task.id, newStatus);
    toast({
      title: "Status updated",
      description: `Task status set to ${newStatus}`,
    });
  };

  const isOverdue =
    new Date(task.due_date) < new Date() && task.status !== "Completed";

  return (
    <>
      <Card
        className={`
        overflow-hidden transition-all duration-300 hover:shadow-card group
        ${task.status === "Completed" ? "border-green-200" : ""}
        ${isOverdue ? "border-destructive/50" : ""}
      `}
      >
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-bold'>{task.title}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button variant='ghost' size='icon'>
                    <MoreHorizontalIcon />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit()}>
                  <EditIcon className='mr-2 h-4 w-4' />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                  <TrashIcon className='mr-2 h-4 w-4' />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p>{task.description}</p>
          <div className='flex items-center mt-4'>
            <ClockIcon className='mr-2 h-4 w-4' />
            <span>{formatDistanceToNow(new Date(task.due_date))} left</span>
          </div>
          {task.assigned_user && (
            <div className='flex items-center mt-4'>
              <UserIcon className='mr-2 h-4 w-4' />
              <span>{task.assigned_user.name}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <StatusBadge status={task.status} />
          <div className='ml-auto flex space-x-2'>
            {task.status !== "Completed" && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleStatusChange("Completed")}
              >
                <CheckCircleIcon className='mr-2 h-4 w-4' />
                Complete
              </Button>
            )}
            {task.status === "Pending" && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleStatusChange("In Progress")}
              >
                <PlayIcon className='mr-2 h-4 w-4' />
                Start
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title='Delete Task'
        description='Are you sure you want to delete this task? This action cannot be undone.'
      />
    </>
  );
};

export default TaskCard;
