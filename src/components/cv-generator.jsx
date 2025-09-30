// src/components/cv-generator.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Wand2, Eye } from "lucide-react";

export function CVGenerator() {
  const [prompt, setPrompt] = useState("");
  const [cvData, setCvData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Simular llamada a IA (reemplaza con tu API real)
  const generateCVWithAI = async () => {
    setLoading(true);
    
    try {
      // Aquí llamarías a tu API de IA (OpenAI, Claude, etc.)
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      setCvData(data);
      
      // Generar HTML del CV
      const html = generateCVHTML(data);
      setHtmlContent(html);
      setShowPreview(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar CV');
    } finally {
      setLoading(false);
    }
  };

  // Generar HTML optimizado para PDF
  const generateCVHTML = (data) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.nombre} - CV</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
    }
    
    .cv-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      background: white;
    }
    
    .header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 32px;
      color: #1e40af;
      margin-bottom: 8px;
    }
    
    .header .title {
      font-size: 18px;
      color: #64748b;
      margin-bottom: 12px;
    }
    
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 14px;
      color: #475569;
    }
    
    .contact-info span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 20px;
      color: #1e40af;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .experience-item, .education-item {
      margin-bottom: 20px;
      padding-left: 15px;
      border-left: 3px solid #e2e8f0;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }
    
    .item-title {
      font-size: 16px;
      font-weight: bold;
      color: #1e293b;
    }
    
    .item-company {
      font-size: 15px;
      color: #2563eb;
      margin-bottom: 3px;
    }
    
    .item-date {
      font-size: 13px;
      color: #64748b;
      font-style: italic;
    }
    
    .item-description {
      font-size: 14px;
      color: #475569;
      margin-top: 8px;
    }
    
    .item-description ul {
      margin-left: 20px;
      margin-top: 5px;
    }
    
    .item-description li {
      margin-bottom: 4px;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }
    
    .skill-category {
      margin-bottom: 15px;
    }
    
    .skill-category h4 {
      font-size: 14px;
      color: #1e40af;
      margin-bottom: 5px;
    }
    
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .skill-tag {
      background: #eff6ff;
      color: #1e40af;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      border: 1px solid #dbeafe;
    }
    
    .summary {
      font-size: 15px;
      color: #475569;
      line-height: 1.8;
      text-align: justify;
    }
    
    @media print {
      body {
        background: white;
      }
      .cv-container {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <!-- HEADER -->
    <div class="header">
      <h1>${data.nombre}</h1>
      <div class="title">${data.titulo}</div>
      <div class="contact-info">
        <span>📧 ${data.email}</span>
        <span>📱 ${data.telefono}</span>
        <span>📍 ${data.ubicacion}</span>
        ${data.linkedin ? `<span>💼 ${data.linkedin}</span>` : ''}
        ${data.github ? `<span>💻 ${data.github}</span>` : ''}
      </div>
    </div>

    <!-- RESUMEN PROFESIONAL -->
    ${data.resumen ? `
    <div class="section">
      <h2 class="section-title">Resumen Profesional</h2>
      <p class="summary">${data.resumen}</p>
    </div>
    ` : ''}

    <!-- EXPERIENCIA -->
    ${data.experiencia && data.experiencia.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Experiencia Laboral</h2>
      ${data.experiencia.map(exp => `
        <div class="experience-item">
          <div class="item-header">
            <div>
              <div class="item-title">${exp.puesto}</div>
              <div class="item-company">${exp.empresa}</div>
            </div>
            <div class="item-date">${exp.periodo}</div>
          </div>
          <div class="item-description">
            ${Array.isArray(exp.descripcion) 
              ? `<ul>${exp.descripcion.map(d => `<li>${d}</li>`).join('')}</ul>`
              : `<p>${exp.descripcion}</p>`
            }
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- EDUCACIÓN -->
    ${data.educacion && data.educacion.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Educación</h2>
      ${data.educacion.map(edu => `
        <div class="education-item">
          <div class="item-header">
            <div>
              <div class="item-title">${edu.titulo}</div>
              <div class="item-company">${edu.institucion}</div>
            </div>
            <div class="item-date">${edu.periodo}</div>
          </div>
          ${edu.descripcion ? `<div class="item-description">${edu.descripcion}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- HABILIDADES -->
    ${data.habilidades ? `
    <div class="section">
      <h2 class="section-title">Habilidades</h2>
      ${Object.keys(data.habilidades).map(categoria => `
        <div class="skill-category">
          <h4>${categoria}</h4>
          <div class="skill-tags">
            ${data.habilidades[categoria].map(skill => 
              `<span class="skill-tag">${skill}</span>`
            ).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- IDIOMAS -->
    ${data.idiomas && data.idiomas.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Idiomas</h2>
      <div class="skill-tags">
        ${data.idiomas.map(idioma => 
          `<span class="skill-tag">${idioma.idioma}: ${idioma.nivel}</span>`
        ).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
    `;
  };

  // Exportar a PDF usando jsPDF
  const exportToPDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const html2canvas = (await import('html2canvas')).default;

    // Crear un iframe temporal con el HTML
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    // Esperar a que cargue
    await new Promise(resolve => setTimeout(resolve, 500));

    const cvContainer = iframeDoc.querySelector('.cv-container');
    
    const canvas = await html2canvas(cvContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`CV_${cvData?.nombre?.replace(/\s+/g, '_')}.pdf`);

    // Limpiar
    document.body.removeChild(iframe);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Generador de CV con IA</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Describe tu perfil profesional</Label>
            <Textarea
              id="prompt"
              placeholder="Ejemplo: Soy desarrollador Full Stack con 5 años de experiencia en React y Node.js. He trabajado en startups tecnológicas desarrollando aplicaciones web escalables. Tengo título en Ingeniería de Software..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="mt-2"
            />
          </div>

          <Button 
            onClick={generateCVWithAI} 
            disabled={loading || !prompt}
            className="w-full"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {loading ? 'Generando CV...' : 'Generar CV con IA'}
          </Button>
        </div>
      </div>

      {showPreview && htmlContent && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={exportToPDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Ocultar' : 'Ver'} Vista Previa
            </Button>
          </div>

          {showPreview && (
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <iframe
                srcDoc={htmlContent}
                className="w-full border rounded"
                style={{ height: '800px' }}
                title="CV Preview"
              />
            </div>
          )}
        </div>
      )}

      {!cvData && !loading && (
        <Alert>
          <AlertDescription>
            💡 Describe tu experiencia, educación, habilidades y la IA generará un CV profesional automáticamente.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}