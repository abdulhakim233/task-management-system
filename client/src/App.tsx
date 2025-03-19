import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tasks/new' element={<Tasks />} />
          <Route path='/tasks/:id/edit' element={<Tasks />} />
          <Route path='/tasks/completed' element={<Tasks />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/users' element={<Admin />} />
          <Route path='/admin/tasks' element={<Admin />} />
          <Route path='/admin/settings' element={<Admin />} />
          <Route path='*' element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
