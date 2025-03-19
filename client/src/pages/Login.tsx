
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';
import { ClipboardListIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center space-x-2">
            <ClipboardListIcon className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">TaskFlow</span>
          </Link>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <AuthForm mode="login" />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p className="mt-1">Admin: admin@example.com / password</p>
          <p>User: user@example.com / password</p>
        </div>
        
        <Separator className="my-8 max-w-xs mx-auto" />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? <Link to="/" className="text-primary hover:underline">Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
