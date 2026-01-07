import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@/components/Analytics";
import { AuthProvider } from "@/contexts/AuthContext";

// Public routes - eager load
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Lazy-load service pages (below fold)
const CustomSoftwareDevelopment = lazy(() => import("./pages/services/CustomSoftwareDevelopment"));
const WebApplicationDevelopment = lazy(() => import("./pages/services/WebApplicationDevelopment"));
const AIWorkflowAutomation = lazy(() => import("./pages/services/AIWorkflowAutomation"));
const SalesOperationsSystems = lazy(() => import("./pages/services/SalesOperationsSystems"));
const About = lazy(() => import("./pages/About"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Lazy-load all admin routes (excluded from public bundle)
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminRoutes = lazy(() => 
  import("./components/admin/AdminRoutes").then(module => ({ default: module.AdminRoutes }))
);
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const PostList = lazy(() => import("./pages/admin/posts/PostList"));
const PostForm = lazy(() => import("./pages/admin/posts/PostForm"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const Leads = lazy(() => import("./pages/admin/Leads"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const ServiceList = lazy(() => import("./pages/admin/services/ServiceList"));
const ServiceForm = lazy(() => import("./pages/admin/services/ServiceForm"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

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
              <Route 
                path="/services/custom-software-development" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CustomSoftwareDevelopment />
                  </Suspense>
                } 
              />
              <Route 
                path="/services/web-application-development" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <WebApplicationDevelopment />
                  </Suspense>
                } 
              />
              <Route 
                path="/services/ai-workflow-automation" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AIWorkflowAutomation />
                  </Suspense>
                } 
              />
              <Route 
                path="/services/sales-operations-systems" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <SalesOperationsSystems />
                  </Suspense>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <About />
                  </Suspense>
                } 
              />
              <Route 
                path="/case-studies" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CaseStudies />
                  </Suspense>
                } 
              />
              <Route 
                path="/case-studies/:id" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CaseStudyDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="/blog" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Blog />
                  </Suspense>
                } 
              />
              <Route 
                path="/blog/:slug" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <BlogPost />
                  </Suspense>
                } 
              />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin routes - lazy loaded */}
              <Route 
                path="/admin/login" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminLogin />
                  </Suspense>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminRoutes />
                  </Suspense>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route 
                  path="dashboard" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <AdminDashboard />
                    </Suspense>
                  } 
                />
                <Route 
                  path="posts" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PostList />
                    </Suspense>
                  } 
                />
                <Route 
                  path="posts/new" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PostForm />
                    </Suspense>
                  } 
                />
                <Route 
                  path="posts/edit/:id" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PostForm />
                    </Suspense>
                  } 
                />
                <Route 
                  path="services" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ServiceList />
                    </Suspense>
                  } 
                />
                <Route 
                  path="services/new" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ServiceForm />
                    </Suspense>
                  } 
                />
                <Route 
                  path="services/edit/:id" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ServiceForm />
                    </Suspense>
                  } 
                />
                <Route 
                  path="leads" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Leads />
                    </Suspense>
                  } 
                />
                <Route 
                  path="analytics" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <AdminAnalytics />
                    </Suspense>
                  } 
                />
                <Route 
                  path="settings" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Settings />
                    </Suspense>
                  } 
                />
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
