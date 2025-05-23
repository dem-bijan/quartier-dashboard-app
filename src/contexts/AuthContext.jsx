
import React, { createContext, useState, useContext } from 'react';

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

  // Simulating authentication - would be connected to backend in production
  const login = async (email, password) => {
    try {
      // Fake API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === "admin@example.com" && password === "password123") {
        const user = {
          id: 1,
          name: "Admin",
          email: "admin@example.com",
          role: "admin",
        };
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
