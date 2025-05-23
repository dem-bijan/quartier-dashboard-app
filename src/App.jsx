
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ResidentsPage from "./pages/ResidentsPage";
import ResidentDetailPage from "./pages/ResidentDetailPage";
import RepairsPage from "./pages/RepairsPage";
import MeetingsPage from "./pages/MeetingsPage";
import StaffPage from "./pages/StaffPage";
import GaragePage from "./pages/GaragePage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="residents" element={<ResidentsPage />} />
        <Route path="residents/:id" element={<ResidentDetailPage />} />
        <Route path="repairs" element={<RepairsPage />} />
        <Route path="meetings" element={<MeetingsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="garage" element={<GaragePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
