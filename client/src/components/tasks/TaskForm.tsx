import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTask } from "@/api/taskService";

interface User {
  id: string;
  name: string;
}

interface TaskFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  users?: User[];
  isAdmin?: boolean;
  isLoading?: boolean;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(["Pending", "In Progress", "Completed"]),
  due_date: z.date({
    required_error: "Due date is required.",
  }),
  assigned_user_id: z.string().optional(),
});

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  users = [],
  isAdmin = false,
  isLoading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData?.due_date ? new Date(initialData.due_date) : undefined
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "Pending",
      due_date: initialData?.due_date
        ? new Date(initialData.due_date)
        : undefined,
      assigned_user_id: initialData?.assigned_user?.id || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedDueDate = values.due_date.toISOString(); // Format to ISO string
    const taskData = {
      ...values,
      due_date: formattedDueDate,
    };

    console.log("Form Data:", taskData); // Console the form data

    try {
      const newTask = await createTask(taskData);

      console.log("Task Created:", newTask);
      if (onSubmit) {
        onSubmit(newTask);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter task title' {...field} />
              </FormControl>
              <FormDescription>Keep it short and descriptive.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter task details'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide enough details for the task to be understood.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Pending'>Pending</SelectItem>
                    <SelectItem value='In Progress'>In Progress</SelectItem>
                    <SelectItem value='Completed'>Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='due_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setSelectedDate(date);
                      }}
                      initialFocus
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      className='p-3 pointer-events-auto'
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isAdmin && users.length > 0 && (
          <FormField
            control={form.control}
            name='assigned_user_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign To</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select user' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Assign this task to a team member.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className='flex justify-end space-x-2'>
          <Button
            variant='outline'
            type='button'
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isLoading}>
            {isLoading && (
              <LoaderCircleIcon className='mr-2 h-4 w-4 animate-spin' />
            )}
            {initialData ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
