"use client";

import { useEffect, useState } from "react";
import {
  IconTrendingUp,
  IconFileDescription,
  IconFolder,
  IconUser,
  IconPlus,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import { useRouter } from "next/navigation";

export function SectionCards({ user }) {
  const [stats, setStats] = useState(null);
  const router = useRouter();
  // Dashboard inicial
  const defaultDashboard = {
    dash_cards: {
      offers_captured: { clicks: 0, offers: 0 },
      cvs_analyzed: { clicks: 0, cvs_analyzed: 0 },
      cvs_created: { clicks: 0, created: 0 },
    },
  };
  const reDirect = (url) => {
    router.push = `${url}`;
  };
  useEffect(() => {
    if (!user) return;

    async function loadDashboard() {
      const { data, error } = await supabase
        .from("user_dashboard")
        .select("dashboard")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading dashboard:", error);
        return;
      }

      if (!data) {
        // Crear registro si no existe
        const { error: insertError } = await supabase
          .from("user_dashboard")
          .insert([
            {
              user_id: user.id,
              dashboard: defaultDashboard,
            },
          ]);
        if (insertError)
          console.error("Error creating dashboard:", insertError);
        setStats(defaultDashboard.dash_cards);
      } else {
        setStats(data.dashboard.dash_cards);
      }
    }

    loadDashboard();
  }, [user]);

  // Función para actualizar dashboard
  async function updateDashboard(newStats, RedirectUrl) {
    if (!user) return;

    router.push("/dashboard/analytics");

    const { error } = await supabase
      .from("user_dashboard")
      .update({ dashboard: { dash_cards: newStats } })
      .eq("user_id", user.id);

    if (error) console.error("Error updating dashboard:", error);
    setStats(newStats);
  }

  if (!stats)
    return <p className="text-center text-gray-500">Cargando dashboard...</p>;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
      {/* Ofertas capturadas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ofertas Capturadas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.offers_captured.offers}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Activas <IconFolder className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Últimas ofertas importadas
          </div>
          <Button
            className="mt-2 w-full"
            variant="secondary"
            onClick={() =>
              updateDashboard(
                {
                  ...stats,
                  offers_captured: {
                    ...stats.offers_captured,
                    clicks: stats.offers_captured.clicks + 1,
                  },
                },
                "/dashboard/analytics"
              )
            }
          >
            <IconPlus className="mr-2 size-4" /> Importar oferta
          </Button>
        </CardFooter>
      </Card>

      {/* CVs analizados */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>CVs Analizados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.cvs_analyzed.cvs_analyzed}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">CVs activos ahora</div>
          <div className="text-muted-foreground">
            CVs adaptados a ofertas y matching
          </div>
          <Button
            className="mt-2 w-full"
            variant="secondary"
            onClick={() =>
              updateDashboard({
                ...stats,
                cvs_analyzed: {
                  ...stats.cvs_analyzed,
                  clicks: stats.cvs_analyzed.clicks + 1,
                },
              })
            }
          >
            <IconPlus className="mr-2 size-4" /> Analizar CV
          </Button>
        </CardFooter>
      </Card>

      {/* CVs creados (nuevo) */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>CVs Creados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.cvs_created.created}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Documentos generados</div>
          <div className="text-muted-foreground">
            CVs personalizados y guardados
          </div>
          <Button
            className="mt-2 w-full"
            variant="secondary"
            onClick={() =>
              updateDashboard({
                ...stats,
                cvs_created: {
                  ...stats.cvs_created,
                  created: stats.cvs_created.created + 1,
                  clicks: stats.cvs_created.clicks + 1,
                },
              })
            }
          >
            <IconPlus className="mr-2 size-4" /> Crear CV
          </Button>
        </CardFooter>
      </Card>

      {/* Plan actual */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Plan Actual</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Gratis
          </CardTitle>
          <CardAction>
            <Badge className="bg-green-100 text-green-700 border-green-400">
              <IconUser className="size-4" />
              Básico
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium line-clamp-1">
            Mejora tu plan cuando quieras <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Planes Disponibles</div>

          <Button className="w-full" variant="primary">
            Mejorar plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
