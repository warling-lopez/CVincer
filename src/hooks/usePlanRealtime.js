import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase";

export function usePlanRealtime(userId) {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let channel;

    const fetchPlan = async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .single();
      if (!error) setPlan(data);
    };

    fetchPlan();

    channel = supabase
      .channel(`plans_user_${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // solo updates
          schema: "public",
          table: "plans",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime update:", payload.new);
          setPlan(payload.new);
        }
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [userId]);

  return plan;
}
