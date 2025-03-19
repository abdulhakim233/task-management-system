
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { 
  ChevronLeftIcon, 
  HomeIcon, 
  CheckCircleIcon, 
  ListTodoIcon, 
  UsersIcon, 
  UserIcon,
  PieChartIcon,
  SettingsIcon,
  LayoutDashboardIcon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdmin = user?.role === 'admin';

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
      href: '/dashboard',
      admin: false,
    },
    {
      title: 'My Tasks',
      icon: <ListTodoIcon className="h-5 w-5" />,
      href: '/tasks',
      admin: false,
    },
    {
      title: 'Completed',
      icon: <CheckCircleIcon className="h-5 w-5" />,
      href: '/tasks/completed',
      admin: false,
    },
    {
      title: 'Analytics',
      icon: <PieChartIcon className="h-5 w-5" />,
      href: '/analytics',
      admin: false,
    },
    {
      title: 'User Management',
      icon: <UsersIcon className="h-5 w-5" />,
      href: '/admin/users',
      admin: true,
    },
    {
      title: 'All Tasks',
      icon: <ListTodoIcon className="h-5 w-5" />,
      href: '/admin/tasks',
      admin: true,
    },
    {
      title: 'System Settings',
      icon: <SettingsIcon className="h-5 w-5" />,
      href: '/admin/settings',
      admin: true,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white/90 backdrop-blur-sm border-r px-3 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0", 
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between">
          <span className="font-semibold text-lg">Navigation</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-6 py-3">
            <div className="space-y-1.5">
              {navItems
                .filter(item => !item.admin || (item.admin && isAdmin))
                .map((item) => (
                  <Button
                    key={item.href}
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start overflow-hidden text-left", 
                      location.pathname === item.href 
                        ? "bg-secondary font-medium" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => {
                      navigate(item.href);
                      if (window.innerWidth < 768) setIsOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Button>
                ))}
            </div>

            <Separator />
            
            <div className="space-y-1.5">
              <Button
                variant="ghost"
                className="w-full justify-start overflow-hidden text-left text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => {
                  navigate('/profile');
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
              >
                <UserIcon className="h-5 w-5" />
                <span className="ml-3">Profile Settings</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
