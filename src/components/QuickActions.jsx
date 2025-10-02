"use client";
import { Button } from "@/components/ui/button";

export function QuickActions({ user }) {
  return (
    <div className="flex gap-4 flex-wrap">
      <Button onClick={() => (window.location.href = "/dashboard/create-cv")}>
        Crear CV
      </Button>
      <Button onClick={() => (window.location.href = "/dashboard/improve-cv")}>
        Mejorar CV
      </Button>
      <Button
        onClick={() => (window.location.href = "/dashboard/import-offers")}
      >
        Importar Ofertas
      </Button>
    </div>
  );
}
