// src/components/section-addFile.jsx
"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Upload, Loader2 } from "lucide-react";

// Importación dinámica del PdfViewer (sin SSR)
const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((mod) => ({ default: mod.PdfViewer })),
  { ssr: false }
);

export function AddFile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState(null); // "error" | "success" | null
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const fileInputRef = useRef(null);

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

      // Extraer texto del PDF
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

  const recomendaciones = async (info) => {
    setIsLoadingRecommendations(true);
    try {
      const response = await fetch("/api/match-offert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching recomendaciones:", errorData);
        setAlert("error");
        setIsLoadingRecommendations(false);
        return;
      }

      const result = await response.json();
      console.log("Recomendaciones:", result);

      if (result.success && result.data) {
        setRecommendations(result.data);
      } else {
        console.error("Respuesta sin éxito:", result);
        setAlert("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert("error");
    } finally {
      setIsLoadingRecommendations(false);
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

  const handleUpload = async() => {
    if (!file || !pdfText) {
      setAlert("error");
      return;
    }
    console.log("Subiendo archivo:", file);
    console.log("Texto extraído:", pdfText);

    // Enviar el texto a la API
    await recomendaciones(pdfText);
    setAlert("success");
  };

  return (
    <div className="flex flex-wrap md:flex-row gap-4 w-full px-6">
      {/* Sección principal (archivo PDF) */}
      <div className="flex-1 flex flex-col gap-4 p-4 rounded-md bg-card">
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

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => handleFiles(e.target.files?.[0])}
          className="hidden"
        />

        {/* PdfViewer - Se renderiza solo cuando hay archivo */}
        {file && (
          <PdfViewer file={file} onPreviewGenerated={handlePreviewGenerated} />
        )}

        {/* Upload button (aparece solo si hay archivo) */}
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

        {/* Alerts */}
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

      {/* Panel de recomendaciones (lado derecho) */}
      <div className="w-full md:w-1/3  flex flex-col gap-4 p-4 rounded-md bg-card">
        <Label>Recomendaciones</Label>

        {isLoadingRecommendations ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-500">Analizando tu CV...</p>
          </div>
        ) : recommendations ? (
          <div className="space-y-4  max-h-[800px] bg-scroll overflow-y-auto pr-2">
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
                        {recommendations.resumen_general.fortalezas.map(
                          (f, i) => (
                            <li key={i}>{f}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {recommendations.resumen_general.areas_criticas?.length >
                    0 && (
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
    </div>
  );
}
