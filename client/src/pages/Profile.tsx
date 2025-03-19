
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EyeIcon, EyeOffIcon, LoaderCircleIcon, UserIcon } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    woreda: '',
    kebele: '',
    house_number: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  
  useEffect(() => {
    // Load user data
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setProfileForm({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        woreda: parsedUser.woreda || '',
        kebele: parsedUser.kebele || '',
        house_number: parsedUser.house_number || ''
      });
    }
  }, []);
  
  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local storage with new user data
      const updatedUser = { ...userData, ...profileForm };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: 'Could not update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast({
        title: 'Passwords do not match',
        description: 'New password and confirmation do not match',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      
      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error updating password',
        description: 'Could not update password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and address</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="flex flex-col items-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                        {getInitials(profileForm.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="woreda">Woreda</Label>
                      <Input
                        id="woreda"
                        name="woreda"
                        value={profileForm.woreda}
                        onChange={handleProfileFormChange}
                        placeholder="e.g. Kombolcha"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="kebele">Kebele</Label>
                      <Input
                        id="kebele"
                        name="kebele"
                        value={profileForm.kebele}
                        onChange={handleProfileFormChange}
                        placeholder="e.g. 9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="house_number">House Number</Label>
                      <Input
                        id="house_number"
                        name="house_number"
                        value={profileForm.house_number}
                        onChange={handleProfileFormChange}
                        placeholder="e.g. 1414"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current_password"
                        name="current_password"
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.current_password}
                        onChange={handlePasswordFormChange}
                        required
                        className="pr-10"
                      />
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input
                      id="new_password"
                      name="new_password"
                      type={showPassword ? "text" : "password"}
                      value={passwordForm.new_password}
                      onChange={handlePasswordFormChange}
                      required
                      className="pr-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input
                      id="confirm_password"
                      name="confirm_password"
                      type={showPassword ? "text" : "password"}
                      value={passwordForm.confirm_password}
                      onChange={handlePasswordFormChange}
                      required
                      className="pr-10"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading && <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
