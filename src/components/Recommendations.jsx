"use client";
import { Badge } from "@/components/ui/badge";

export function Recommendations({ user }) {
  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h2 className="font-semibold text-lg mb-2">Recomendaciones</h2>
      <ul className="list-disc pl-5 text-sm text-muted-foreground">
        <li>Agrega más categorías a tus CVs para aumentar matching.</li>
        <li>Completa tu perfil para obtener mejores sugerencias.</li>
        <li>
          Usa la función de “Mejorar CV” para optimizar documentos
          automáticamente.
        </li>
      </ul>
      <Badge className="mt-2 bg-blue-100 text-blue-700">
        Tip: Mantén tus CVs actualizados
      </Badge>
    </div>
  );
}
