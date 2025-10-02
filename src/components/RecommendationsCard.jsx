"use client";

import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function RecommendationsCard({
  recommendations,
  isLoadingRecommendations,
}) {
  return (
    <div className="w-full md:w-1/3 flex flex-col gap-4 p-4 rounded-md bg-card">
      <Label>Recomendaciones</Label>

      {isLoadingRecommendations ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-500">Analizando tu CV...</p>
        </div>
      ) : recommendations ? (
        <div className="space-y-4 max-h-[800px] bg-scroll overflow-y-auto pr-2">
          {/* Resumen General */}
          {recommendations.resumen_general && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">
                📊 Resumen General
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Puntuación ATS:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {recommendations.resumen_general.puntuacion_ats}/100
                  </span>
                </div>

                {recommendations.resumen_general.fortalezas?.length > 0 && (
                  <div>
                    <p className="font-medium text-green-700 mb-1">
                      ✅ Fortalezas:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {recommendations.resumen_general.fortalezas.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendations.resumen_general.areas_criticas?.length > 0 && (
                  <div>
                    <p className="font-medium text-red-700 mb-1">
                      ⚠️ Áreas Críticas:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {recommendations.resumen_general.areas_criticas.map(
                        (a, i) => (
                          <li key={i}>{a}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Secciones */}
          {recommendations.secciones?.map((seccion, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  {seccion.nombre}
                </h4>
                <span className="text-sm">{seccion.estado}</span>
              </div>

              {seccion.recomendaciones?.length > 0 && (
                <div className="space-y-3 mt-3">
                  {seccion.recomendaciones.map((rec, ridx) => (
                    <div
                      key={ridx}
                      className="pl-3 border-l-2 border-blue-300"
                    >
                      <p className="text-sm text-gray-700 mb-1">
                        {rec.descripcion}
                      </p>
                      {rec.ejemplo_antes && rec.ejemplo_despues && (
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="bg-red-50 p-2 rounded">
                            <span className="font-medium text-red-700">
                              ❌ Antes:{" "}
                            </span>
                            <span className="text-gray-600">
                              {rec.ejemplo_antes}
                            </span>
                          </div>
                          <div className="bg-green-50 p-2 rounded">
                            <span className="font-medium text-green-700">
                              ✅ Después:{" "}
                            </span>
                            <span className="text-gray-600">
                              {rec.ejemplo_despues}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Keywords Sugeridas */}
          {recommendations.keywords_sugeridas?.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">
                🔑 Keywords Sugeridas
              </h3>
              <div className="flex flex-wrap gap-2">
                {recommendations.keywords_sugeridas.map((keyword, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Próximos Pasos */}
          {recommendations.proximos_pasos?.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">
                🎯 Próximos Pasos
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                {recommendations.proximos_pasos.map((paso, i) => (
                  <li key={i}>{paso}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <p className="text-center">
            Sube un PDF para obtener recomendaciones
          </p>
        </div>
      )}
    </div>
  );
}
