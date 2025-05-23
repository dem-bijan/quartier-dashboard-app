
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // You might want to create an endpoint to check auth status
        // const user = await authAPI.checkStatus();
        // If no endpoint exists, you can use localStorage as fallback
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear potentially invalid stored data
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      // Try to login via API
      const response = await authAPI.login({ email, password });
      
      // Store user data
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${response.user.name}`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      
      // Fallback to demo login if backend is not available
      if (email === "admin@example.com" && password === "password123") {
        const demoUser = {
          id: 1,
          name: "Admin",
          email: "admin@example.com",
          role: "admin",
        };
        setUser(demoUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        toast({
          title: "Mode démo activé",
          description: "Connexion avec compte de démonstration",
        });
        
        return true;
      }
      
      toast({
        variant: "destructive",
        title: "Échec de connexion",
        description: "Email ou mot de passe incorrect",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Try to logout via API
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state regardless of API success
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
