import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CheckCircleIcon,
  ListTodoIcon,
  ClockIcon,
  AlertTriangleIcon,
} from "lucide-react";

// Sample data for demonstration
const sampleTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write a detailed proposal for the new client project",
    status: "completed",
    due_date: "2023-08-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Update website content",
    description: "Refresh the company website with new information and images",
    status: "in_progress",
    due_date: "2023-08-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Prepare presentation",
    description: "Create slides for the upcoming board meeting",
    status: "pending",
    due_date: "2023-08-25T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Review code changes",
    description: "Review and approve pending pull requests",
    status: "pending",
    due_date: "2023-08-10T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Weekly team meeting",
    description: "Discuss progress and roadblocks with the team",
    status: "completed",
    due_date: "2023-08-05T00:00:00.000Z",
  },
  {
    id: "6",
    title: "Client call",
    description: "Follow up with client on project requirements",
    status: "in_progress",
    due_date: "2023-08-30T00:00:00.000Z",
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    overdue: 0,
  });

  useEffect(() => {
    // Simulating data loading
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = localStorage.getItem("user");
        if (user) {
          setUserData(JSON.parse(user));
        }

        // Calculate task statistics
        const now = new Date();
        const stats = {
          total: sampleTasks.length,
          completed: sampleTasks.filter((task) => task.status === "completed")
            .length,
          inProgress: sampleTasks.filter(
            (task) => task.status === "in_progress"
          ).length,
          pending: sampleTasks.filter((task) => task.status === "pending")
            .length,
          overdue: sampleTasks.filter(
            (task) =>
              new Date(task.due_date) < now && task.status !== "completed"
          ).length,
        };

        setTaskStats(stats);
      } catch (error) {
        toast({
          title: "Error loading dashboard",
          description: "Could not load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Prepare data for charts
  const statusData = [
    { name: "Completed", value: taskStats.completed, color: "#93C572" },
    { name: "In Progress", value: taskStats.inProgress, color: "#64B5F6" },
    { name: "Pending", value: taskStats.pending, color: "#FFB74D" },
  ];

  const weeklyData = [
    { name: "Mon", completed: 4, pending: 2 },
    { name: "Tue", completed: 3, pending: 1 },
    { name: "Wed", completed: 2, pending: 3 },
    { name: "Thu", completed: 5, pending: 2 },
    { name: "Fri", completed: 3, pending: 1 },
    { name: "Sat", completed: 1, pending: 0 },
    { name: "Sun", completed: 0, pending: 0 },
  ];

  return (
    <MainLayout>
      <div className='space-y-6'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <p className='text-muted-foreground mt-1'>
            Welcome back, {userData?.name || "User"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Card className='bg-white/90 backdrop-blur-sm hover:shadow-card transition-all'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>Total Tasks</CardTitle>
              <ListTodoIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{taskStats.total}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                All tasks in the system
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/90 backdrop-blur-sm hover:shadow-card transition-all'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>Completed</CardTitle>
              <CheckCircleIcon className='h-4 w-4 text-green-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{taskStats.completed}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                {Math.round((taskStats.completed / taskStats.total) * 100) || 0}
                % completion rate
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/90 backdrop-blur-sm hover:shadow-card transition-all'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>In Progress</CardTitle>
              <ClockIcon className='h-4 w-4 text-blue-500' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{taskStats.inProgress}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Tasks currently being worked on
              </p>
            </CardContent>
          </Card>

          <Card className='bg-white/90 backdrop-blur-sm hover:shadow-card transition-all'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>Overdue</CardTitle>
              <AlertTriangleIcon className='h-4 w-4 text-destructive' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{taskStats.overdue}</div>
              <p className='text-xs text-muted-foreground mt-1'>
                Tasks past their due date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm shadow-subtle">
            <CardHeader>
              <CardTitle>Task Status</CardTitle>
              <CardDescription>Distribution of tasks by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm shadow-subtle">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Tasks completed vs pending this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" name="Completed" fill="#93C572" />
                    <Bar dataKey="pending" name="Pending" fill="#FFB74D" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
