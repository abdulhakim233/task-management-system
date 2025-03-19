
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardListIcon, CheckCircleIcon, ListTodoIcon, UsersIcon } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 animate-fade-in">
                  Task Management{' '}
                  <span className="bg-clip-text text-transparent bg-primary">Simplified</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Streamline your workflow, collaborate effectively, and achieve more with our intuitive task management platform.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Button size="lg" onClick={() => navigate('/register')}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="relative z-10 rounded-xl overflow-hidden shadow-elevation animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <img
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Task Management Dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent rounded-xl transform -translate-x-4 translate-y-4 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-lg mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600">
              Everything you need to manage tasks efficiently and boost productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <ClipboardListIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600">
                  Create, organize, and track tasks with ease. Set priorities and deadlines.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600">
                  Assign tasks to team members and collaborate efficiently.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <ListTodoIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor task status and progress with visual indicators.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-card transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                <p className="text-gray-600">
                  Control who can view and modify tasks with role-based permissions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your workflow?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of teams using our platform to improve productivity and collaboration.
          </p>
          <Button size="lg" onClick={() => navigate('/register')}>
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-100 border-t">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ClipboardListIcon className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">TaskFlow</span>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
