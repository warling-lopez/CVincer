"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase";
import { AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp, Lightbulb, TrendingUp, Target, Download, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Recommendations({ user }) {
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

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
        .single();

      if (error) {
        console.log("Error obteniendo última recomendación:", error);
        setSource(null);
      } else {
        setSource(data);
      }

      setLoading(false);
    };

    fetchLastRecommendation();
  }, [user]);

  useEffect(() => {
    if (source?.recomendaciones) {
      setAnimateScore(true);
      const timer = setTimeout(() => setAnimateScore(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [source]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAllSections = () => {
    let recs = source.recomendaciones;
    if (typeof recs === "string") {
      try {
        recs = JSON.parse(recs);
      } catch (e) {
        recs = {};
      }
    }
    
    const allExpanded = {};
    recs.secciones?.forEach((_, idx) => {
      allExpanded[idx] = true;
    });
    setExpandedSections(allExpanded);
    setShowAllDetails(true);
  };

  const collapseAllSections = () => {
    setExpandedSections({});
    setShowAllDetails(false);
  };

  const handleExportReport = () => {
    let recs = source.recomendaciones;
    if (typeof recs === "string") {
      try {
        recs = JSON.parse(recs);
      } catch (e) {
        return;
      }
    }

    let report = `ANÁLISIS DE COMPATIBILIDAD ATS\n`;
    report += `================================\n\n`;
    report += `Puntuación ATS: ${recs.resumen_general?.puntuacion_ats || 0}/100\n\n`;
    
    if (recs.resumen_general?.fortalezas) {
      report += `FORTALEZAS:\n`;
      recs.resumen_general.fortalezas.forEach((f, i) => {
        report += `${i + 1}. ${f}\n`;
      });
    }
    
    if (recs.resumen_general?.areas_criticas) {
      report += `\nÁREAS CRÍTICAS:\n`;
      recs.resumen_general.areas_criticas.forEach((a, i) => {
        report += `${i + 1}. ${a}\n`;
      });
    }
    
    if (recs.keywords_sugeridas) {
      report += `\nPALABRAS CLAVE SUGERIDAS:\n`;
      recs.keywords_sugeridas.forEach((k, i) => {
        report += `${i + 1}. ${k}\n`;
      });
    }
    
    if (recs.secciones) {
      report += `\nANÁLISIS POR SECCIONES:\n`;
      recs.secciones.forEach((s, i) => {
        report += `\n${i + 1}. ${s.nombre} - ${s.estado}\n`;
        s.recomendaciones?.forEach((r, j) => {
          report += `   ${j + 1}. ${r.descripcion}\n`;
        });
      });
    }
    
    if (recs.proximos_pasos) {
      report += `\nPRÓXIMOS PASOS:\n`;
      recs.proximos_pasos.forEach((p, i) => {
        report += `${i + 1}. ${p}\n`;
      });
    }

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analisis-cv-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (estado) => {
    if (estado?.includes('✅') || estado?.includes('Exelente')) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    } else if (estado?.includes('⚠️') || estado?.includes('Necesita')) {
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (estado) => {
    if (estado?.includes('✅') || estado?.includes('Exelente')) {
      return 'bg-green-100 text-green-700 border-green-200';
    } else if (estado?.includes('⚠️') || estado?.includes('Necesita')) {
      return 'bg-amber-100 text-amber-700 border-amber-200';
    } else {
      return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const CircularProgress = ({ score }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    
    const getScoreColor = (score) => {
      if (score >= 70) return '#10b981';
      if (score >= 40) return '#f59e0b';
      return '#ef4444';
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${animateScore ? 'animate-pulse' : ''}`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold" style={{ color: getScoreColor(score) }}>
            {score}
          </span>
          <span className="text-sm text-gray-500">/ 100</span>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">
            Inicia sesión para ver tus recomendaciones.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="border-2">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-blue-600 mb-4 animate-spin" />
          <p className="text-gray-600 text-center">
            Cargando recomendaciones...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!source || !source.recomendaciones) {
    return (
      <Card className="border-2 border-dashed mx-6 h-[70vh]">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <Target className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">
            Aún no tienes recomendaciones guardadas.<br />
            Sube un CV para obtener un análisis detallado.
          </p>
        </CardContent>
      </Card>
    );
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

  // Calcular estadísticas
  const secciones = recs.secciones || [];
  const seccionesCompletas = secciones.filter(s => s.estado?.includes('✅') || s.estado?.includes('Exelente')).length;
  const seccionesConMejoras = secciones.filter(s => s.estado?.includes('⚠️') || s.estado?.includes('Necesita')).length;
  const seccionesCriticas = secciones.filter(s => s.estado?.includes('❌') || s.estado?.includes('Faltante')).length;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header con acciones rápidas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Análisis de CV</h2>
          <p className="text-gray-600 mt-1">
            Fuente: <span className="font-semibold">{source.source}</span>
            <span className="text-sm text-gray-400 ml-2">
              • {new Date(source.created_at).toLocaleDateString('es', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleExportReport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumen General con Score Circular */}
      <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Análisis de Compatibilidad ATS
          </CardTitle>
          <CardDescription>Evaluación detallada de tu CV para sistemas de seguimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Circular Score */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
              <CircularProgress score={recs.resumen_general?.puntuacion_ats || 0} />
              <p className="mt-4 text-sm font-medium text-gray-600">Puntuación ATS</p>
              
              {/* Mini estadísticas */}
              <div className="flex gap-4 mt-4 text-xs">
                <div className="text-center">
                  <div className="font-bold text-green-600">{seccionesCompletas}</div>
                  <div className="text-gray-500">Completas</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-amber-600">{seccionesConMejoras}</div>
                  <div className="text-gray-500">Mejoras</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-red-600">{seccionesCriticas}</div>
                  <div className="text-gray-500">Críticas</div>
                </div>
              </div>
            </div>

            {/* Fortalezas y Áreas Críticas */}
            <div className="space-y-4">
              {recs.resumen_general?.fortalezas && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Fortalezas ({recs.resumen_general.fortalezas.length})
                  </h4>
                  <div className="space-y-1">
                    {recs.resumen_general.fortalezas.slice(0, showAllDetails ? undefined : 2).map((fortaleza, idx) => (
                      <div key={idx} className="text-sm text-gray-700 flex items-start gap-2 animate-fade-in">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{fortaleza}</span>
                      </div>
                    ))}
                    {!showAllDetails && recs.resumen_general.fortalezas.length > 2 && (
                      <p className="text-xs text-gray-500 mt-1">+ {recs.resumen_general.fortalezas.length - 2} más...</p>
                    )}
                  </div>
                </div>
              )}

              {recs.resumen_general?.areas_criticas && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Áreas Críticas ({recs.resumen_general.areas_criticas.length})
                  </h4>
                  <div className="space-y-1">
                    {recs.resumen_general.areas_criticas.slice(0, showAllDetails ? undefined : 2).map((area, idx) => (
                      <div key={idx} className="text-sm text-gray-700 flex items-start gap-2 animate-fade-in">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{area}</span>
                      </div>
                    ))}
                    {!showAllDetails && recs.resumen_general.areas_criticas.length > 2 && (
                      <p className="text-xs text-gray-500 mt-1">+ {recs.resumen_general.areas_criticas.length - 2} más...</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Sugeridas */}
      {recs.keywords_sugeridas && recs.keywords_sugeridas.length > 0 && (
        <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Palabras Clave Recomendadas ({recs.keywords_sugeridas.length})
            </CardTitle>
            <CardDescription>Incluye estas palabras en tu CV para mejorar la detección ATS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recs.keywords_sugeridas.map((keyword, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => navigator.clipboard.writeText(keyword)}
                  title="Click para copiar"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Secciones del CV */}
      {secciones.length > 0 && (
        <Card className="border shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Análisis por Secciones ({secciones.length})
                </CardTitle>
                <CardDescription>Recomendaciones detalladas para cada sección</CardDescription>
              </div>
              <Button
                onClick={showAllDetails ? collapseAllSections : expandAllSections}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                {showAllDetails ? 'Colapsar Todo' : 'Expandir Todo'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {secciones.map((seccion, idx) => (
              <div 
                key={idx} 
                className="border rounded-lg overflow-hidden hover:border-blue-300 transition-all duration-200"
              >
                <div 
                  className={`p-4 cursor-pointer bg-gradient-to-r ${
                    expandedSections[idx] ? 'from-blue-50 to-indigo-50' : 'from-gray-50 to-gray-100'
                  } hover:from-blue-50 hover:to-indigo-50 transition-all duration-300`}
                  onClick={() => toggleSection(idx)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(seccion.estado)}
                      <div>
                        <h4 className="font-semibold text-gray-800">{seccion.nombre}</h4>
                        <Badge variant="outline" className={`mt-1 ${getStatusColor(seccion.estado)}`}>
                          {seccion.estado}
                        </Badge>
                      </div>
                    </div>
                    {expandedSections[idx] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedSections[idx] && (
                  <div className="p-4 bg-white border-t animate-fade-in space-y-3">
                    {seccion.recomendaciones && seccion.recomendaciones.length > 0 ? (
                      seccion.recomendaciones.map((rec, recIdx) => (
                        <div key={recIdx} className="space-y-2 pb-3 border-b last:border-b-0">
                          <div className="flex items-start gap-2">
                            <Badge className="mt-1 bg-blue-600">{rec.tipo}</Badge>
                            <p className="text-sm text-gray-700">{rec.descripcion}</p>
                          </div>
                          {rec.ejemplo_antes && (
                            <div className="grid md:grid-cols-2 gap-3 mt-3">
                              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-xs font-semibold text-red-700 mb-1">❌ Antes</p>
                                <p className="text-xs text-gray-700 whitespace-pre-line">{rec.ejemplo_antes}</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-xs font-semibold text-green-700 mb-1">✅ Después</p>
                                <p className="text-xs text-gray-700 whitespace-pre-line">{rec.ejemplo_despues}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No hay recomendaciones para esta sección</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Próximos Pasos */}
      {recs.proximos_pasos && recs.proximos_pasos.length > 0 && (
        <Card className="border-2 border-blue-200 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Próximos Pasos Recomendados ({recs.proximos_pasos.length})
            </CardTitle>
            <CardDescription className="text-blue-700">Sigue estos pasos para mejorar tu CV</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {recs.proximos_pasos.map((paso, idx) => (
                <li 
                  key={idx} 
                  className="flex gap-3 items-start animate-fade-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-gray-700 pt-0.5">{paso}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
