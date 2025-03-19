
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Check authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(user));
    } else {
      // Redirect to login if on a protected route
      const publicRoutes = ['/', '/login', '/register'];
      if (!publicRoutes.includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [location.pathname, navigate]);
  
  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Authentication routes don't need the full layout
  if (['/login', '/register'].includes(location.pathname)) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
        <main className="flex-1 flex items-center justify-center p-6">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar 
        user={userData} 
        isAuthenticated={isAuthenticated} 
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          user={userData}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <div className="container px-4 py-4 mx-auto">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden mb-4"
                aria-label="Open sidebar"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            )}
            <div className="animate-fade-in">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
