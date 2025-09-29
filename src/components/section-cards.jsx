"user client";
import {
  IconTrendingUp,
  IconFileDescription,
  IconFolder,
  IconUser,
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

export function SectionCards() {
  return (
    <div className="w-full flex flex-nowrap justify-center ">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:max-h-50 w-full flex flex-wrap gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs *:data-[slot=card]:min-w-[390] lg:px-6 @xl/main:flex justify-between @xl/main:gap-6 @2xl/main:gap-8 @3xl/main:gap-10">
        {/* Card 1 - Ofertas capturadas */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Ofertas Capturadas</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconFolder className="size-4" />
                Nuevas esta semana
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Captura activa <IconFolder className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Últimas ofertas importadas
            </div>
          </CardFooter>
        </Card>

        {/* Card 2 - Documentos generados */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Documentos Generados</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconFileDescription className="size-4" />
                +0 hoy
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Activos ahora <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">CVs adaptados a ofertas</div>
          </CardFooter>
        </Card>

        {/* Card 3 - Categorías activas */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Categorías Usadas</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0
            </CardTitle>
            <CardAction>
              <Badge variant="outline">Backend · Frontend · Fullstack</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Diversidad de ofertas <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Organizadas por categoría
            </div>
          </CardFooter>
        </Card>
      </div>
      <div>
        {/* Card 4 - Lead Magnet */}
        <Card className="w-full border-2 border-green-500 shadow-lg hover:shadow-xl transition">
          <CardHeader>
            <CardDescription className="text-green-600 font-medium">
              Tu Plan Actual
            </CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-green-700">
              Gratis
            </CardTitle>
            <CardAction>
              <Badge className="bg-green-100 text-green-700 border-green-400">
                <IconUser className="size-4" />
                Básico
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-3 text-sm">
            <div className="flex gap-2 font-semibold text-green-700">
              🚀 Actualiza a Pro y desbloquea todo
            </div>
            <div className="text-muted-foreground">
              Genera más documentos y accede a funciones exclusivas.
            </div>
            <Button className="mt-2 w-full" variant="primary" size="lg">
              🔓 Desbloquear Pro
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
