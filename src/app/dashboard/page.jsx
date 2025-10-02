"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SourcePopup from "@/components/SourcePopup";
import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase";

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // Asignar plan free si el usuario es nuevo
      if (currentUser) {
        const { data, error } = await supabase
          .from("plans")
          .select("*")
          .eq("user_id", currentUser.id)
          .limit(1);

        if (error) {
          console.error("Error verificando plan:", error);
        }

        if (!data || data.length === 0) {
          const { error: insertError } = await supabase.from("plans").insert([
            {
              user_id: currentUser.id,
              plan_type: "free",
              plan_name: "Free Plan",
              credits: 10,
              week_free: 0,
              duration: 1, // <--- obligatorio según la tabla
              status: "active",
            },
          ]);

          if (insertError)
            console.error("Error asignando plan FREE:", insertError);
          else
            console.log(
              "Plan FREE asignado correctamente al usuario:",
              currentUser.id
            );
        }
      }

      // Escuchar cambios de auth
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    };

    init();
  }, []);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader user={user} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
            </div>
            {user && <SourcePopup user={user} />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
