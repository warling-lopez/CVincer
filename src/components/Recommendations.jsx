"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Recommendations({ user }) {
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLastRecommendation = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_sources")
        .select("id, source, recomendaciones, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single(); // trae solo la última fila

      if (error) {
        console.error("Error obteniendo última recomendación:", error);
        setSource(null);
      } else {
        setSource(data);
      }

      setLoading(false);
    };

    fetchLastRecommendation();
  }, [user]);

  if (!user) {
    return <p className="text-sm text-gray-500">Inicia sesión para ver tus recomendaciones.</p>;
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando recomendaciones...</p>;
  }

  if (!source || !source.recomendaciones) {
    return <p className="text-sm text-gray-500">Aún no tienes recomendaciones guardadas.</p>;
  }

  // Convertimos la recomendación a objeto si viene como string
  let recs = source.recomendaciones;
  if (typeof recs === "string") {
    try {
      recs = JSON.parse(recs);
    } catch (e) {
      recs = {};
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Tus recomendaciones</h2>
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-base">
            Fuente: <span className="font-normal text-gray-600">{source.source}</span>
          </CardTitle>
          <p className="text-xs text-gray-400">
            {new Date(source.created_at).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {recs.keywords_sugeridas && (
            <>
              <h3 className="font-semibold">Keywords sugeridas:</h3>
              <ul className="list-disc list-inside">
                {recs.keywords_sugeridas.map((kw, idx) => (
                  <li key={idx}>{kw}</li>
                ))}
              </ul>
            </>
          )}

          {recs.proximos_pasos && (
            <>
              <h3 className="font-semibold mt-2">Próximos pasos:</h3>
              <ul className="list-disc list-inside">
                {recs.proximos_pasos.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </>
          )}

          {recs.resumen_general && (
            <>
              <h3 className="font-semibold mt-2">Resumen general:</h3>
              <p>Fortalezas: {recs.resumen_general.fortalezas.join(", ")}</p>
              <p>Áreas críticas: {recs.resumen_general.areas_criticas.join(", ")}</p>
              <p>Puntuación ATS: {recs.resumen_general.puntuacion_ats}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
