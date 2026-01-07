import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safe initialization: don't throw at module level
// Instead, create a client only if env vars exist, otherwise create a null client
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
    supabase = null;
  }
} else {
  console.warn(
    "Missing Supabase environment variables. Supabase features will be disabled. " +
    "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"
  );
}

// Export a getter function that ensures we always have a client or throw a helpful error
export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      "Supabase client is not initialized. Please check your environment variables."
    );
  }
  return supabase;
}

// Export the client directly (may be null, but components should use getSupabaseClient)
export { supabase };

// Database types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  bullets: string[] | null;
  icon_name: string;
  image_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

