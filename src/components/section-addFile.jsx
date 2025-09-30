// src/components/section-addFile.jsx
"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

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
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPreview(null); // Limpiar preview anterior
      setIsProcessing(true); // Indicar que se está procesando
      setAlert("success");
    } else {
      setFile(null);
      setPreview(null);
      setIsProcessing(false);
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

  const handleUpload = () => {
    if (!file) {
      setAlert("error");
      return;
    }
    console.log("Subiendo archivo:", file);
    setAlert("success");
  };

  return (
    <div className="max-w-md md:max-w-2/3 flex flex-col gap-4 p-4 rounded-md bg-card mx-6">
      <Label>Sube tu archivo PDF</Label>

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
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Subir PDF
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
  );
}