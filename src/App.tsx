
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletContextProvider from "@/contexts/WalletProvider";
import { AdminViewProvider } from "@/contexts/AdminViewContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletContextProvider>
      <AdminViewProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Routes outside of layout */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
              
              {/* Routes inside layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </TooltipProvider>
    </AdminViewProvider>
  </WalletContextProvider>
</QueryClientProvider>
);

export default App;
