import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "sb-auth-token",
    flowType: "pkce",
    storage: {
      getItem: (key) => {
        if (typeof window === "undefined") return null;
        const value = localStorage.getItem(key);
        return value;
      },
      setItem: (key, value) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(key, value);
      },
      removeItem: (key) => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(key);
      },
    },
  },
});
