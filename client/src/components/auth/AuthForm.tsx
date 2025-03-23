import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loginUser, registerUser } from "@/api/authService";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This would be replaced with actual API call in a real implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulating authentication for now
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          name: formData.name || "User",
          email: formData.email,
          phone_number: formData.phone_number,
          role: formData.role,
        })
      );

      if (mode === "login") {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        if (response.errors) {
          toast({
            title: "Authentication error",
            description: response.errors.email,
          });
          return;
        }
        toast({
          title: "Logged in successfully",
          description: "Welcome to the Task Management System",
        });
      }
      if (mode === "register") {
        registerUser(formData);
        toast({
          title: "Account created successfully",
          description: "Welcome to the Task Management System",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Card className='w-full max-w-md mx-auto shadow-card overflow-hidden backdrop-blur-sm bg-white/90 animate-fade-in'>
      <CardHeader className='space-y-1 pb-6'>
        <CardTitle className='text-2xl font-bold tracking-tight'>
          {mode === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Fill out the form below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {mode === "register" && (
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                placeholder='John Doe'
                required
                value={formData.name}
                onChange={handleChange}
                className='h-11'
              />
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='name@example.com'
              required
              value={formData.email}
              onChange={handleChange}
              className='h-11'
            />
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input 
                id="phone_number" 
                name="phone_number" 
                type="tel" 
                placeholder="0921607264" 
                required
                value={formData.phone_number}
                onChange={handleChange}
                className="h-11"
              />
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder='••••••••'
                required
                value={formData.password}
                onChange={handleChange}
                className='h-11 pr-10'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <>
              <div className='space-y-2'>
                <Label htmlFor='password_confirmation'>Confirm Password</Label>
                <Input
                  id='password_confirmation'
                  name='password_confirmation'
                  type={showPassword ? "text" : "password"}
                  placeholder='••••••••'
                  required
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className='h-11'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='role'>Role</Label>
                <Select
                  name='role'
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className='h-11'>
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='user'>User</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <Button
            type='submit'
            className='w-full h-11 mt-6 transition-all'
            disabled={loading}
          >
            {loading ? (
              <LoaderCircleIcon className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='justify-center border-t px-8 py-4'>
        <div className='text-sm text-center'>
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Button
                variant='link'
                className='p-0 h-auto font-semibold hover:text-primary'
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button
                variant='link'
                className='p-0 h-auto font-semibold hover:text-primary'
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
