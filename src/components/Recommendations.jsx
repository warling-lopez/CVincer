"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Recommendations({ user, source }) {
  if (!user) {
    return <p className="text-sm text-gray-500">Inicia sesión para ver tus recomendaciones.</p>;
  }

  if (!source || !source.recomendaciones) {
    return <p className="text-sm text-gray-500">Aún no tienes recomendaciones guardadas.</p>;
  }

  let recs = source.recomendaciones;
  if (typeof recs === "string") {
    try {
      recs = JSON.parse(recs);
    } catch (e) {
      recs = [];
    }
  }
  if (!Array.isArray(recs)) recs = [recs];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Tus recomendaciones</h2>
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-base">
            Fuente: <span className="font-normal text-gray-600">{source.source}</span>
          </CardTitle>
          <p className="text-xs text-gray-400">
            {new Date(source.created).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {recs.map((rec, idx) => (
            <p key={idx} className="text-sm text-gray-700">
              • {rec}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
