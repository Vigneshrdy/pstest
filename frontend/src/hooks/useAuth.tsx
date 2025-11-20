'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authService } from '@/services';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid by fetching user profile
          try {
            const profile = await authService.getProfile();
            setUser(profile);
          } catch (error) {
            // Token is invalid, clear storage
            clearAuthData();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const saveAuthData = (authResponse: AuthResponse, remember: boolean = false) => {
    const storage = remember ? localStorage : sessionStorage;
    
    setUser(authResponse.user);
    setToken(authResponse.token);
    
    storage.setItem('auth_token', authResponse.token);
    storage.setItem('refresh_token', authResponse.refreshToken);
    storage.setItem('user', JSON.stringify(authResponse.user));
  };

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    
    // Clear from both storages
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
  };

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    
    try {
      const authResponse = await authService.login(credentials);
      saveAuthData(authResponse, credentials.rememberMe || false);
      
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    
    try {
      const authResponse = await authService.register(data);
      saveAuthData(authResponse, false);
      
      toast.success('Registration successful! Welcome to BankFlow!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
      setIsLoading(false);
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
      
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const authResponse = await authService.refreshToken(refreshTokenValue);
      
      // Determine storage type based on where the current token is stored
      const isRemembered = !!localStorage.getItem('auth_token');
      saveAuthData(authResponse, isRemembered);
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuthData();
      router.push('/auth/login');
      throw error;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update in storage
      const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected route HOC
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner h-8 w-8"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Public route HOC (redirect to dashboard if authenticated)
export function withGuest<P extends object>(Component: React.ComponentType<P>) {
  return function GuestComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        router.push('/dashboard');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner h-8 w-8"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}