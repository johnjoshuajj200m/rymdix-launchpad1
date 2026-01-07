import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@/components/Analytics";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Services from "./pages/Services";
import CustomSoftwareDevelopment from "./pages/services/CustomSoftwareDevelopment";
import WebApplicationDevelopment from "./pages/services/WebApplicationDevelopment";
import AIWorkflowAutomation from "./pages/services/AIWorkflowAutomation";
import SalesOperationsSystems from "./pages/services/SalesOperationsSystems";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin routes
import AdminLogin from "./pages/admin/Login";
import { AdminRoutes } from "./components/admin/AdminRoutes";
import AdminDashboard from "./pages/admin/Dashboard";
import PostList from "./pages/admin/posts/PostList";
import PostForm from "./pages/admin/posts/PostForm";
import AdminAnalytics from "./pages/admin/Analytics";
import Leads from "./pages/admin/Leads";
import Settings from "./pages/admin/Settings";
import ServiceList from "./pages/admin/services/ServiceList";
import ServiceForm from "./pages/admin/services/ServiceForm";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Analytics />
            <Routes>
              {/* Redirects */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopment />} />
              <Route path="/services/web-application-development" element={<WebApplicationDevelopment />} />
              <Route path="/services/ai-workflow-automation" element={<AIWorkflowAutomation />} />
              <Route path="/services/sales-operations-systems" element={<SalesOperationsSystems />} />
              <Route path="/about" element={<About />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminRoutes />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="posts" element={<PostList />} />
                <Route path="posts/new" element={<PostForm />} />
                <Route path="posts/edit/:id" element={<PostForm />} />
                <Route path="services" element={<ServiceList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/edit/:id" element={<ServiceForm />} />
                <Route path="leads" element={<Leads />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
