"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist/webpack";

export function AddFile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alert, setAlert] = useState(null); // "error" | "success" | null
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      renderPreview(selectedFile); // <--- aquí se genera la portada
      setAlert("success");
    } else {
      setFile(null);
      setPreview(null); // limpia la preview si no es PDF
      setAlert("error");
    }
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
  const renderPreview = (pdfFile) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      setPreview(canvas.toDataURL());
    };
    reader.readAsArrayBuffer(pdfFile);
  };

  return (
    <div className="max-w-md md:max-w-2/3 flex flex-col gap-4 p-4 rounded-md bg-card  mx-6">
      <Label>Sube tu archivo PDF</Label>

      {/* Drag & Drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        className="flex w-full flex-col items-center justify-center  rounded-lg cursor-pointer hover:bg-blue-50 transition"
      >
        {!file && !preview ? (
          <p className="text-center w-full text-blue-800/40 py-40 border-2 border-dashed border-blue-800/50 rounded-lg">
            Arrastra tu PDF aquí o haz clic para seleccionar
          </p>
        ) : (
          <img
            src={preview}
            alt="Vista previa del PDF"
            className="mt-4 border rounded shadow-sm max-w-full"
          />
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => handleFiles(e.target.files?.[0])}
        className="hidden"
      />

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

      {alert === "success" && (
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
