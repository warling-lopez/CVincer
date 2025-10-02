"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import SourcePopup from "@/components/SourcePopup";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    cvsGenerated: 0,
    offersCaptured: 0,
    categoriesUsed: 0,
    credits: 0,
    plan: "Gratis",
  });

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      if (!isMounted) return;
      setUser(currentUser);

      if (!currentUser) return;

      // Verificar plan activo
      const { data: plansData, error: planError } = await supabase
        .from("plans")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("status", "active")
        .limit(1)
        .single();

      if (planError && planError.code !== "PGRST116") console.error("Error verificando plan:", planError);

      if (!plansData) {
        // Asigna plan free si no existe
        const { error: insertError } = await supabase.from("plans").insert([
          {
            user_id: currentUser.id,
            plan_type: "free",
            plan_name: "Free Plan",
            credits: 10,
            week_free: 0,
            duration: 1,
            status: "active",
          },
        ]);
        if (insertError) console.error("Error asignando plan FREE:", insertError);
      }

      // Fetch stats
      const [cvs, offers, categories] = await Promise.all([
        supabase.from("cvs").select("*").eq("user_id", currentUser.id),
        supabase.from("offers").select("*").eq("user_id", currentUser.id),
        supabase.from("categories").select("*").eq("user_id", currentUser.id),
      ]);

      if (!isMounted) return;
      setStats({
        cvsGenerated: cvs.data?.length ?? 0,
        offersCaptured: offers.data?.length ?? 0,
        categoriesUsed: categories.data?.length ?? 0,
        credits: plansData?.credits ?? 10,
        plan: plansData?.plan_name ?? "Gratis",
      });
    };

    init();

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      supabase.removeSubscription(subscription);
    };
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
        <SiteHeader user={user} credits={stats.credits} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards stats={stats} />
            </div>
            {user && <SourcePopup user={user} />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
