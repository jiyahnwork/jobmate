"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        setSession(null);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        // Refresh session if needed
        if (session?.expires_at && session.expires_at * 1000 < Date.now()) {
          const {
            data: { session: newSession },
            error,
          } = await supabase.auth.refreshSession();
          if (error) throw error;
          session = newSession;
        }

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        setSession(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    loading,
    isAuthenticated: !!session,
  };
}
