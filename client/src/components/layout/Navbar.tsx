import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  BellIcon,
  ClipboardListIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/api/authService";

interface NavbarProps {
  isAuthenticated: boolean;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("user");

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <header className='sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80 border-b'>
      <div className='container flex h-16 items-center px-4 mx-auto'>
        <div className='flex items-center space-x-2'>
          <Link to='/' className='flex items-center space-x-2'>
            <ClipboardListIcon className='h-6 w-6 text-primary' />
            <span className='hidden sm:inline-block font-bold text-xl'>
              TaskFlow
            </span>
          </Link>
        </div>

        <div className='flex-1' />

        <div className='flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <Button
                variant='ghost'
                size='icon'
                className='relative hover:bg-gray-100'
                aria-label='Notifications'
              >
                <BellIcon className='h-5 w-5' />
                <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary' />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='relative h-9 w-9 rounded-full overflow-hidden'
                  >
                    <Avatar>
                      <AvatarFallback className='bg-primary/10 text-primary'>
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium'>{user?.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserIcon className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <SettingsIcon className='mr-2 h-4 w-4' />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant='ghost'
                onClick={() => navigate("/login")}
                className='hidden sm:flex'
              >
                Sign in
              </Button>
              <Button onClick={() => navigate("/register")}>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
