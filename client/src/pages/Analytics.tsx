import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
} from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

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
  {
    id: "7",
    title: "Finalize budget",
    description: "Complete the budget for Q3",
    status: "completed",
    due_date: "2023-08-08T00:00:00.000Z",
  },
  {
    id: "8",
    title: "Training session",
    description: "Conduct training for new team members",
    status: "completed",
    due_date: "2023-08-12T00:00:00.000Z",
  },
  {
    id: "9",
    title: "Documentation update",
    description: "Update the product documentation",
    status: "pending",
    due_date: "2023-08-18T00:00:00.000Z",
  },
  {
    id: "10",
    title: "Security audit",
    description: "Perform security review of the application",
    status: "in_progress",
    due_date: "2023-08-22T00:00:00.000Z",
  },
];

// Sample historical data
const monthlyData = [
  { month: "Jan", completed: 15, pending: 8, inProgress: 5 },
  { month: "Feb", completed: 18, pending: 6, inProgress: 7 },
  { month: "Mar", completed: 22, pending: 9, inProgress: 4 },
  { month: "Apr", completed: 25, pending: 7, inProgress: 6 },
  { month: "May", completed: 20, pending: 10, inProgress: 8 },
  { month: "Jun", completed: 28, pending: 5, inProgress: 9 },
  { month: "Jul", completed: 30, pending: 8, inProgress: 7 },
  { month: "Aug", completed: 24, pending: 11, inProgress: 5 },
];

const Analytics = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticData, setAnalyticData] = useState({
    completionRate: 0,
    tasksByStatus: [],
    tasksByMonth: [],
    averageCompletionTime: 0,
    recentlyCompletedTasks: [],
  });

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Calculate completion rate
        const completedCount = sampleTasks.filter(
          (task) => task.status === "completed"
        ).length;
        const completionRate = Math.round(
          (completedCount / sampleTasks.length) * 100
        );

        // Tasks by status
        const tasksByStatus = [
          { name: "Completed", value: completedCount, color: "#93C572" },
          {
            name: "In Progress",
            value: sampleTasks.filter((task) => task.status === "in_progress")
              .length,
            color: "#64B5F6",
          },
          {
            name: "Pending",
            value: sampleTasks.filter((task) => task.status === "pending")
              .length,
            color: "#FFB74D",
          },
        ];

        // Calculate average completion time (simulated data)
        const averageCompletionTime = 3.2; // days

        // Get recently completed tasks
        const recentlyCompletedTasks = sampleTasks
          .filter((task) => task.status === "completed")
          .sort(
            (a, b) =>
              new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
          )
          .slice(0, 5);

        setAnalyticData({
          completionRate,
          tasksByStatus,
          tasksByMonth: monthlyData,
          averageCompletionTime,
          recentlyCompletedTasks,
        });
      } catch (error) {
        toast({
          title: "Error loading analytics",
          description: "Could not load analytics data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  return (
    <MainLayout>
      <h1>Analytics</h1>
    </MainLayout>
  );
};

export default Analytics;
