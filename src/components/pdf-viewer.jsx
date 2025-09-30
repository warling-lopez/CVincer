// src/components/pdf-viewer.jsx
"use client";

import { useState, useEffect } from "react";

export function PdfViewer({ file, onPreviewGenerated }) {
  const [pdfLib, setPdfLib] = useState(null);

  useEffect(() => {
    // Cargar pdfjs-dist solo en el cliente
    import('pdfjs-dist/webpack').then((module) => {
      setPdfLib(module);
    });
  }, []);

  useEffect(() => {
    if (!pdfLib || !file) return;

    const renderPreview = async () => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result);
          const pdf = await pdfLib.getDocument(typedArray).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
          const dataUrl = canvas.toDataURL();
          onPreviewGenerated(dataUrl);
        } catch (error) {
          console.error("Error al renderizar PDF:", error);
          onPreviewGenerated(null);
        }
      };
      reader.readAsArrayBuffer(file);
    };

    renderPreview();
  }, [pdfLib, file, onPreviewGenerated]);

  return null; // Este componente no renderiza nada, solo procesa
}