"use client";

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

export function SectionCards({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
      {/* Ofertas capturadas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ofertas Capturadas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.offersCaptured ?? 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Activas <IconFolder className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Últimas ofertas importadas
          </div>
          <Button className="mt-2 w-full" variant="secondary">
            <IconPlus className="mr-2 size-4" /> Importar oferta
          </Button>
        </CardFooter>
      </Card>

      {/* Documentos generados */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Documentos Generados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.cvsGenerated ?? 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">CVs activos ahora</div>
          <div className="text-muted-foreground">
            CVs adaptados a ofertas y matching
          </div>
          <Button className="mt-2 w-full" variant="secondary">
            <IconPlus className="mr-2 size-4" /> Crear CV
          </Button>
        </CardFooter>
      </Card>

      {/* Categorías usadas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Categorías Usadas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.categoriesUsed ?? 0}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">Diversidad de ofertas</div>
          <div className="text-muted-foreground">Organizadas por categoría</div>
        </CardFooter>
      </Card>

      {/* Plan actual */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Plan Actual</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.plan ?? "Gratis"}
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
