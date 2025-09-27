// components/SupabaseSessionHandler.jsx
"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function parseHash(hash) {
  return Object.fromEntries(new URLSearchParams(hash.replace(/^#/, "")));
}

export default function SupabaseSessionHandler() {
  useEffect(() => {
    const handleSession = async () => {
      if (!window.location.hash) return;

      const params = parseHash(window.location.hash);
      const access_token = params["access_token"];
      const refresh_token = params["refresh_token"];

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("Error al establecer sesión:", error);
        } else {
          localStorage.setItem("supabase_session", JSON.stringify(data.session));
          console.log("Sesión guardada:", data.session);
        }
      }

      // limpiar hash
      const cleanUrl =
        window.location.origin +
        window.location.pathname +
        window.location.search;
      window.history.replaceState({}, document.title, cleanUrl);
    };

    handleSession();
  }, []);

  return null;
}
