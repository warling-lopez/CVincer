"use client";
import React, { useEffect, useEffectEvent, useState } from "react";
import {
  FileText,
  Plus,
  Zap,
  Save,
  ArrowRight,
  Copy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const ActionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  variant = "default",
}) => {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <Card className="h-full border-2 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div
              className={`p-4 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                variant === "primary"
                  ? "bg-blue-100"
                  : variant === "success"
                  ? "bg-green-100"
                  : "bg-purple-100"
              }`}
            >
              <Icon
                className={`w-8 h-8 ${
                  variant === "primary"
                    ? "text-blue-600"
                    : variant === "success"
                    ? "text-green-600"
                    : "text-purple-600"
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function CVMatcherDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [jobOffer, setJobOffer] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopyExample = () => {
    const example = `Empresa: Tech Solutions Inc.
Posición: Senior React Developer
Ubicación: Remote

Requisitos:
- 5+ años de experiencia con React
- Experiencia con TypeScript
- Conocimiento de Node.js
- Experiencia con bases de datos SQL
- Git y control de versiones
- Inglés fluido

Responsabilidades:
- Desarrollar componentes React reutilizables
- Optimizar performance de aplicaciones
- Colaborar con equipo de backend
- Mentorear desarrolladores junior`;

    navigator.clipboard.writeText(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyzeMatch = async () => {
    if (!jobOffer.trim()) {
      setError("Por favor ingresa una oferta laboral");
      return;
    }

    setLoading(true);
    setError(null);
    setMatchResult(null);

    try {
      const response = await fetch("/api/oferta-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobOffer: jobOffer.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al analizar la oferta");
      }

      const data = await response.json();
      setMatchResult(data);
    } catch (err) {
      setError(err.message || "Ocurrió un error al procesar la oferta");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (activeTab === "crear_cv") {
      router.push("/dashboard/cv-generator");
    }
    if (activeTab === "Analisis_cv") {
      router.push("/dashboard/analytics");
    }
  }, [activeTab]);

  // Vista de inicio
  if (activeTab === "home") {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-4xl font-bold text-gray-900">CV Analyzer Pro</h1>
          <p className="text-gray-600 text-lg">
            Optimiza tu CV y encuentra la mejor oferta para ti
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard
            icon={Plus}
            title="Crear CV"
            description="Comienza a crear tu CV desde cero con nuestra herramienta intuitiva"
            onClick={() => setActiveTab("crear_cv")}
            variant="primary"
          />
          <ActionCard
            icon={FileText}
            title="Analizar CV"
            description="Obtén recomendaciones detalladas para mejorar tu CV"
            onClick={() => setActiveTab("Analisis_cv")}
            variant="success"
          />
          <ActionCard
            icon={Zap}
            title="Match con Oferta"
            description="Compara tu CV con ofertas laborales y obtén un score de compatibilidad"
            onClick={() => setActiveTab("match")}
            variant="default"
          />
        </div>

        {/* Features */}
        <Card className="border-2 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Análisis ATS",
                  desc: "Compatible con sistemas de seguimiento automático",
                },
                {
                  title: "Recomendaciones IA",
                  desc: "Sugerencias personalizadas con IA avanzada",
                },
                {
                  title: "Match Inteligente",
                  desc: "Compara tu perfil con ofertas laborales reales",
                },
              ].map((feature, idx) => (
                <div key={idx} className="text-center space-y-2">
                  <h4 className="font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Vista Match
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("home")}
          className="mr-4"
        >
          ← Volver
        </Button>
        <h2 className="text-3xl font-bold text-gray-900">
          Análisis de Compatibilidad
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="border-2 shadow-lg h-fit lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Oferta Laboral
            </CardTitle>
            <CardDescription>
              Pega aquí la oferta de trabajo que deseas analizar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Pega la oferta laboral aquí..."
              value={jobOffer}
              onChange={(e) => {
                setJobOffer(e.target.value);
                setError(null);
              }}
              className="min-h-64 resize-none border-2 focus:border-purple-500"
            />

            <Button
              onClick={handleCopyExample}
              variant="outline"
              className="w-full text-xs"
            >
              <Copy className="w-3 h-3 mr-2" />
              {copied ? "Copiado!" : "Copiar Ejemplo"}
            </Button>

            <Button
              onClick={handleAnalyzeMatch}
              disabled={loading || !jobOffer.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analizar Compatibilidad
                </>
              )}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {matchResult ? (
            <>
              {/* Score Card */}
              <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                    Puntuación de Compatibilidad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Circular Score */}
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke={
                            matchResult.score >= 80
                              ? "#10b981"
                              : matchResult.score >= 60
                              ? "#f59e0b"
                              : "#ef4444"
                          }
                          strokeWidth="8"
                          strokeDasharray={`${
                            (matchResult.score / 100) * 339.29
                          } 339.29`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900">
                            {matchResult.score}
                          </div>
                          <div className="text-xs text-gray-600">/ 100</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Interpretation */}
                  <div className="text-center space-y-2">
                    <Badge
                      className={`${
                        matchResult.score >= 80
                          ? "bg-green-100 text-green-700"
                          : matchResult.score >= 60
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {matchResult.score >= 80
                        ? "Excelente compatibilidad"
                        : matchResult.score >= 60
                        ? "Buena compatibilidad"
                        : "Compatibilidad media"}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {matchResult.interpretation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Match */}
              {matchResult.skillsMatch && (
                <Card className="border shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Habilidades Requeridas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {matchResult.skillsMatch.map((skill, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <Badge variant={skill.match ? "default" : "outline"}>
                            {skill.match ? "✓ Tienes" : "○ Falta"}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              skill.match ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ width: `${skill.match ? 100 : 40}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              {matchResult.recommendations &&
                matchResult.recommendations.length > 0 && (
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Save className="w-5 h-5 text-blue-600" />
                        Recomendaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {matchResult.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex gap-3 items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-700 pt-0.5">
                              {rec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
            </>
          ) : (
            <Card className="border-2 border-dashed h-96 flex items-center justify-center">
              <CardContent className="text-center space-y-2">
                <FileText className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-gray-500">Los resultados aparecerán aquí</p>
                <p className="text-xs text-gray-400">
                  Pega una oferta laboral y haz clic en analizar
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
      `}</style>
    </div>
  );
}
