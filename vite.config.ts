import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@tanstack/react-query'],
          // Admin routes in separate chunk (excluded from public bundle)
          'admin': [
            './src/components/admin/AdminRoutes',
            './src/components/admin/AdminLayout',
            './src/components/admin/ProtectedRoute',
            './src/pages/admin/Login',
            './src/pages/admin/Dashboard',
            './src/pages/admin/posts/PostList',
            './src/pages/admin/posts/PostForm',
            './src/pages/admin/services/ServiceList',
            './src/pages/admin/services/ServiceForm',
            './src/pages/admin/Analytics',
            './src/pages/admin/Leads',
            './src/pages/admin/Settings',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
