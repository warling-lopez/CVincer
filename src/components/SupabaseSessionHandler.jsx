// components/SupabaseSessionHandler.jsx
"use client";

import { useEffect } from "react";
import supabase from "@/supabase/supabase";

export default function SupabaseSessionHandler() {
  useEffect(() => {
    const handleSession = async () => {
      if (!window.location.hash) return;

      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true, // Supabase ya lo guarda en su storage
      });

      if (error) {
        console.error("Error obteniendo sesión desde URL:", error);
        return;
      }

      if (data && data.session) {
        // Guardar también en localStorage manualmente
        localStorage.setItem("supabase_session", JSON.stringify(data.session));
        console.log("Sesión guardada en localStorage:", data.session);
      }

      // Limpia el hash para no dejar tokens en la URL
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
