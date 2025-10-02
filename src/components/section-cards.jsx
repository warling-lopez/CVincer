"use client";
import {
  IconTrendingUp,
  IconFileDescription,
  IconFolder,
  IconUser,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SectionCards({ user }) {
  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Card 1 - Ofertas capturadas */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Ofertas Capturadas</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0
            </CardTitle>
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
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Activos ahora 
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
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              Diversidad de ofertas 
            </div>
            <div className="text-muted-foreground">
              Organizadas por categoría
            </div>
          </CardFooter>
        </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Plan</CardDescription>
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
          <div className="line-clamp-1 flex gap-2 font-medium">
            mejora cuando quieras <IconTrendingUp className="size-4" />
          </div>
          <Button className="w-full" variant="primary">Mejorar plan</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
