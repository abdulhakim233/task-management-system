import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  UserPlusIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";

// Sample data for demonstration
const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    tasks: 8,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    tasks: 5,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    tasks: 3,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "user",
    tasks: 7,
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "user",
    tasks: 2,
  },
];

const sampleTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    assigned_to: "John Doe",
    status: "completed",
    due_date: "2023-08-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Update website content",
    assigned_to: "Jane Smith",
    status: "in_progress",
    due_date: "2023-08-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Prepare presentation",
    assigned_to: "Bob Johnson",
    status: "pending",
    due_date: "2023-08-25T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Review code changes",
    assigned_to: "Alice Brown",
    status: "pending",
    due_date: "2023-08-10T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Weekly team meeting",
    assigned_to: "John Doe",
    status: "completed",
    due_date: "2023-08-05T00:00:00.000Z",
  },
  {
    id: "6",
    title: "Client call",
    assigned_to: "Charlie Davis",
    status: "in_progress",
    due_date: "2023-08-30T00:00:00.000Z",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check if user is admin
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);

      if (parsedUser.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You do not have permission to view this page",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }

    // Simulate loading data from API
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUsers(sampleUsers);
        setTasks(sampleTasks);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Could not load admin data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate, toast]);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className='space-y-8'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>Admin Dashboard</h2>
          <p className='text-muted-foreground mt-1'>
            Manage users and tasks in your organization
          </p>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader className='flex flex-row items-start justify-between'>
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </div>
            <Button className='ml-auto'>
              <UserPlusIcon className='h-4 w-4 mr-2' />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <div className='flex items-center mb-4'>
              <div className='relative flex-1 max-w-sm'>
                <SearchIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search users...'
                  className='pl-9'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead className='w-[80px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='text-center py-8 text-muted-foreground'
                      >
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className='font-medium'>
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span
                            className={`capitalize font-medium ${
                              user.role === "admin" ? "text-primary" : ""
                            }`}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.tasks}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8'
                              >
                                <MoreHorizontalIcon className='h-4 w-4' />
                                <span className='sr-only'>Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <EditIcon className='h-4 w-4 mr-2' />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className='text-destructive focus:text-destructive'>
                                <TrashIcon className='h-4 w-4 mr-2' />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Task Management */}
        <Card>
          <CardHeader className='flex flex-row items-start justify-between'>
            <div>
              <CardTitle>Task Overview</CardTitle>
              <CardDescription>All tasks in the system</CardDescription>
            </div>
            <Button className='ml-auto' onClick={() => navigate("/tasks/new")}>
              <PlusIcon className='h-4 w-4 mr-2' />
              New Task
            </Button>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className='w-[80px]'></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className='font-medium'>
                        {task.title}
                      </TableCell>
                      <TableCell>{task.assigned_to}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>
                        {format(new Date(task.due_date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8'
                            >
                              <MoreHorizontalIcon className='h-4 w-4' />
                              <span className='sr-only'>Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => navigate(`/tasks/${task.id}/edit`)}
                            >
                              <EditIcon className='h-4 w-4 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-destructive focus:text-destructive'>
                              <TrashIcon className='h-4 w-4 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Admin;
