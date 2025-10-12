// src/components/section-addFile.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Upload, Loader2, AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp, Target, TrendingUp, Lightbulb, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import supabase from "@/supabase/supabase";
import { usePlanRealtime } from "@/hooks/usePlanRealtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Importación dinámica del PdfViewer (sin SSR)
const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((mod) => ({ default: mod.PdfViewer })),
  { ssr: false }
);

export function AddFile({ user }) {
  const plan = usePlanRealtime(user?.id);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Cargar recomendaciones al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("recommendations");
    if (saved) {
      setRecommendations(JSON.parse(saved));
    }
  }, []);

  // Guardar recomendaciones cuando cambien
  useEffect(() => {
    if (recommendations) {
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
    }
  }, [recommendations]);

  // Animar score cuando cambien las recomendaciones
  useEffect(() => {
    if (recommendations?.resumen_general) {
      setAnimateScore(true);
      const timer = setTimeout(() => setAnimateScore(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [recommendations]);

  // Función para extraer texto del PDF
  const extractTextFromPDF = async (pdfFile) => {
    try {
      const pdfjsLib = await import("pdfjs-dist/webpack");
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      return fullText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "";
    }
  };

  const handleFiles = async (selectedFile) => {
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.name.toLowerCase().endsWith(".pdf"))
    ) {
      setFile(selectedFile);
      setPreview(null);
      setIsProcessing(true);
      setAlert("success");
      setRecommendations(null);

      const text = await extractTextFromPDF(selectedFile);
      setPdfText(text);
    } else {
      setFile(null);
      setPreview(null);
      setIsProcessing(false);
      setPdfText("");
      setRecommendations(null);
      setAlert("error");
    }
  };

  const handlePreviewGenerated = (dataUrl) => {
    setPreview(dataUrl);
    setIsProcessing(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    handleFiles(droppedFile);
  };

  const recomendaciones = async (info) => {
    setIsLoadingRecommendations(true);
    try {
      const response = await fetch("/api/match-offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ info }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching recomendaciones:", errorData);
        setAlert("error");
        return {};
      }

      const result = await response.json();
      if (result.success && result.data) {
        return result.data;
      }

      console.error("Respuesta sin éxito:", result);
      return {};
    } catch (error) {
      console.error("Error:", error);
      return {};
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !pdfText) {
      setAlert("error");
      return;
    }
    if (!user) {
      console.error("No hay usuario logueado");
      setAlert("error");
      return;
    }
    if (!plan || plan.credits < 15) {
      router.push("/dashboard/buy-credits");
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from("plans")
        .update({ credits: plan.credits - 15 })
        .eq("id", plan.id);
      if (updateError) throw updateError;

      console.log("Generando recomendaciones...", pdfText);
      const recs = await recomendaciones(pdfText);
      const recsJson = recs || {};

      const { error: insertError } = await supabase
        .from("user_sources")
        .insert([
          {
            user_id: user.id,
            source: file.name,
            recomendaciones: recsJson,
          },
        ]);
      if (insertError) throw insertError;

      setRecommendations(recsJson);
      setAlert("success");
      console.log("Archivo procesado y recomendaciones guardadas");
    } catch (err) {
      console.error("Error al procesar el archivo:", err);
      setAlert("error");
    }
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAllSections = () => {
    const allExpanded = {};
    recommendations?.secciones?.forEach((_, idx) => {
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
    if (!recommendations) return;
    
    let report = `ANÁLISIS DE COMPATIBILIDAD ATS\n`;
    report += `================================\n\n`;
    report += `Puntuación ATS: ${recommendations.resumen_general?.puntuacion_ats || 0}/100\n\n`;
    
    if (recommendations.resumen_general?.fortalezas) {
      report += `FORTALEZAS:\n`;
      recommendations.resumen_general.fortalezas.forEach((f, i) => {
        report += `${i + 1}. ${f}\n`;
      });
    }
    
    if (recommendations.resumen_general?.areas_criticas) {
      report += `\nÁREAS CRÍTICAS:\n`;
      recommendations.resumen_general.areas_criticas.forEach((a, i) => {
        report += `${i + 1}. ${a}\n`;
      });
    }
    
    if (recommendations.keywords_sugeridas) {
      report += `\nPALABRAS CLAVE SUGERIDAS:\n`;
      recommendations.keywords_sugeridas.forEach((k, i) => {
        report += `${i + 1}. ${k}\n`;
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
    if (estado?.includes('✓') || estado?.includes('Completo')) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    } else if (estado?.includes('⚠️') || estado?.includes('Necesita')) {
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (estado) => {
    if (estado?.includes('✓') || estado?.includes('Completo')) {
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

  // Calcular estadísticas
  const secciones = recommendations?.secciones || [];
  const seccionesCompletas = secciones.filter(s => s.estado?.includes('✓') || s.estado?.includes('Completo')).length;
  const seccionesConMejoras = secciones.filter(s => s.estado?.includes('⚠️') || s.estado?.includes('Necesita')).length;
  const seccionesCriticas = secciones.filter(s => s.estado?.includes('❌') || s.estado?.includes('Faltante')).length;

  return (
    <div className="flex flex-col items-center gap-4 w-full px-6">
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

      {!recommendations? (
        /* Sección principal (archivo PDF) */
        <div className="flex-1 w-[95%] flex flex-col gap-4 p-4 rounded-md bg-card">
        <Label>Feedback Clave - Recomendaciones Para Tu CVs</Label>

        {/* Drag & Drop area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
          className="flex w-full flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-blue-50 transition"
        >
          {!file && !preview ? (
            <p className="text-center w-full text-blue-800/40 py-40 border-2 border-dashed border-blue-800/50 rounded-lg">
              Arrastra tu PDF aquí o haz clic para seleccionar
            </p>
          ) : isProcessing ? (
            <div className="text-center w-full py-40 border-2 border-dashed border-blue-800/50 rounded-lg">
              <p className="text-blue-800/60">Generando vista previa...</p>
            </div>
          ) : preview ? (
            <img
              src={preview}
              alt="Vista previa del PDF"
              className="mt-4 border rounded shadow-sm max-w-full"
            />
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFiles(e.target.files?.[0])}
          className="hidden"
        />

        {file && (
          <PdfViewer file={file} onPreviewGenerated={handlePreviewGenerated} />
        )}

        {file && (
          <Button
            onClick={handleUpload}
            className="flex items-center gap-2"
            disabled={isLoadingRecommendations}
          >
            {isLoadingRecommendations ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Procesando...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" /> Subir PDF
              </>
            )}
          </Button>
        )}

        {alert === "error" && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Solo se permiten archivos PDF. Selecciona otro archivo.
            </AlertDescription>
          </Alert>
        )}

        {alert === "success" && file && (
          <Alert variant="default">
            <AlertTitle>Archivo listo</AlertTitle>
            <AlertDescription>
              {file?.name} se seleccionó correctamente.
            </AlertDescription>
          </Alert>
        )}
      </div>
      ):(
        /* Panel de recomendaciones con diseño de Recommendations */
      <div className="w-[95%] md:w-[90%] flex flex-col gap-4">
        {isLoadingRecommendations ? (
          <Card className="border-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-blue-600 mb-4 animate-spin" />
              <p className="text-gray-600 text-center">Analizando tu CV...</p>
            </CardContent>
          </Card>
        ) : !recommendations ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
                Sube un PDF para obtener<br />un análisis detallado
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
            {/* Header con Exportar */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Análisis de CV</h2>
              <div className="flex gap-5">
              <Button
                onClick={handleExportReport}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button
                onClick={()=> setRecommendations(null)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Crear Otro
              </Button>
              </div>
            </div>

            {/* Resumen General con Score Circular */}
            {recommendations.resumen_general && (
              <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    Análisis de Compatibilidad ATS
                  </CardTitle>
                  <CardDescription>Evaluación detallada de tu CV</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Circular Score */}
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                      <CircularProgress score={recommendations.resumen_general.puntuacion_ats || 0} />
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
                      {recommendations.resumen_general.fortalezas && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-green-700 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Fortalezas ({recommendations.resumen_general.fortalezas.length})
                          </h4>
                          <div className="space-y-1">
                            {recommendations.resumen_general.fortalezas.slice(0, showAllDetails ? undefined : 2).map((fortaleza, idx) => (
                              <div key={idx} className="text-sm text-gray-700 flex items-start gap-2 animate-fade-in">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{fortaleza}</span>
                              </div>
                            ))}
                            {!showAllDetails && recommendations.resumen_general.fortalezas.length > 2 && (
                              <p className="text-xs text-gray-500 mt-1">+ {recommendations.resumen_general.fortalezas.length - 2} más...</p>
                            )}
                          </div>
                        </div>
                      )}

                      {recommendations.resumen_general.areas_criticas && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-red-700 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Áreas Críticas ({recommendations.resumen_general.areas_criticas.length})
                          </h4>
                          <div className="space-y-1">
                            {recommendations.resumen_general.areas_criticas.slice(0, showAllDetails ? undefined : 2).map((area, idx) => (
                              <div key={idx} className="text-sm text-gray-700 flex items-start gap-2 animate-fade-in">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{area}</span>
                              </div>
                            ))}
                            {!showAllDetails && recommendations.resumen_general.areas_criticas.length > 2 && (
                              <p className="text-xs text-gray-500 mt-1">+ {recommendations.resumen_general.areas_criticas.length - 2} más...</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Keywords Sugeridas */}
            {recommendations.keywords_sugeridas && recommendations.keywords_sugeridas.length > 0 && (
              <Card className="border shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Palabras Clave Recomendadas ({recommendations.keywords_sugeridas.length})
                  </CardTitle>
                  <CardDescription>Incluye estas palabras para mejorar detección ATS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recommendations.keywords_sugeridas.map((keyword, idx) => (
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
                      <CardDescription>Recomendaciones detalladas</CardDescription>
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
                                      <p className="text-xs font-semibold text-green-700 mb-1">✓ Después</p>
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
            {recommendations.proximos_pasos && recommendations.proximos_pasos.length > 0 && (
              <Card className="border-2 border-blue-200 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Próximos Pasos Recomendados ({recommendations.proximos_pasos.length})
                  </CardTitle>
                  <CardDescription className="text-blue-700">Sigue estos pasos para mejorar tu CV</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {recommendations.proximos_pasos.map((paso, idx) => (
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
          </div>
        )}
      </div>
      )}
    </div>
  );
}