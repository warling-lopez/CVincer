"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Coins } from "lucide-react";
import supabase from "@/supabase/supabase";

export function SiteHeader({ user }) {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (!user) return;

    async function fetchCredits() {
      const { data, error } = await supabase
        .from("plans")
        .select("credits")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching user credits:", error);
        setCredits(0);
      } else {
        setCredits(data?.credits ?? 0);
      }
    }

    fetchCredits();
  }, [user]);
  return (
    <header className="flex fixed md:relative h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="border fixed right-4 bg-background rounded-2xl">
            <a href="/dashboard/buy-credits">
              <Coins className="mr-2 size-4" />
              <span className="font-mono tabular-nums">{credits}</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
