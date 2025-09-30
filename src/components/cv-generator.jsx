import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Wand2, Eye, AlertCircle } from "lucide-react";

export function CVGenerator() {
  const [prompt, setPrompt] = useState("");
  const [cvData, setCvData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  // Generar CV con IA
  const generateCVWithAI = async () => {
    if (!prompt.trim()) {
      setError("Por favor, escribe una descripción de tu perfil profesional");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Respuesta completa de la API:', responseData);
      
      // Acceder a los datos del CV anidados bajo la clave 'cv'
      const cvDataFromApi = responseData.cv;

      if (!cvDataFromApi || typeof cvDataFromApi !== 'object') {
         throw new Error("Respuesta inválida. No se encontraron datos de CV en el campo 'cv'.");
      }

      console.log('Datos del CV extraídos:', cvDataFromApi);
      
      setCvData(cvDataFromApi);
      
      // Generar HTML del CV
      const html = generateCVHTML(cvDataFromApi);
      setHtmlContent(html);
      setShowPreview(true);

    } catch (error) {
      console.error('Error al generar CV:', error);
      setError(error.message || 'Error al generar el CV. Por favor, inténtalo de nuevo.');
      setCvData(null);
      setHtmlContent("");
    } finally {
      setLoading(false);
    }
  };

  // Generar HTML del CV
  const generateCVHTML = (data) => {
    if (!data) return '';

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.cv.nombre || 'Currículum Vitae'} - CV</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', 'Arial', 'Helvetica', sans-serif;
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
      font-weight: 700;
    }
    
    .header .title {
      font-size: 18px;
      color: #64748b;
      margin-bottom: 12px;
      font-weight: 500;
    }
    
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 14px;
      color: #475569;
    }
    
    .contact-info span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 20px;
      color: #1e40af;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }
    
    .experience-item, .education-item {
      margin-bottom: 20px;
      padding-left: 15px;
      border-left: 3px solid #e2e8f0;
      page-break-inside: avoid;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .item-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
    }
    
    .item-company {
      font-size: 15px;
      color: #2563eb;
      margin-bottom: 3px;
      font-weight: 500;
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
    
    .skill-category {
      margin-bottom: 15px;
    }
    
    .skill-category h4 {
      font-size: 14px;
      color: #1e40af;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .skill-tag {
      background: #eff6ff;
      color: #1e40af;
      padding: 6px 14px;
      border-radius: 16px;
      font-size: 13px;
      border: 1px solid #dbeafe;
      font-weight: 500;
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
    <div class="header">
      <h1>${data.cv.nombre || ''}</h1>
      ${data.cv.titulo ? `<div class="title">${data.cv.titulo}</div>` : ''}
      <div class="contact-info">
        ${data.cv.email ? `<span>📧 ${data.cv.email}</span>` : ''}
        ${data.cv.telefono ? `<span>📱 ${data.cv.telefono}</span>` : ''}
        ${data.cv.ubicacion ? `<span>📍 ${data.cv.ubicacion}</span>` : ''}
        ${data.cv.linkedin ? `<span>💼 ${data.cv.linkedin}</span>` : ''}
        ${data.cv.github ? `<span>💻 ${data.cv.github}</span>` : ''}
      </div>
    </div>

    ${data.cv.resumen ? `
    <div class="section">
      <h2 class="section-title">Resumen Profesional</h2>
      <p class="summary">${data.cv.resumen}</p>
    </div>
    ` : ''}

    ${data.cv.experiencia && Array.isArray(data.cv.experiencia) && data.cv.experiencia.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Experiencia Laboral</h2>
      ${data.cv.experiencia.map(exp => `
        <div class="experience-item">
          <div class="item-header">
            <div>
              ${exp.puesto ? `<div class="item-title">${exp.puesto}</div>` : ''}
              ${exp.empresa ? `<div class="item-company">${exp.empresa}</div>` : ''}
            </div>
            ${exp.periodo ? `<div class="item-date">${exp.periodo}</div>` : ''}
          </div>
          ${exp.descripcion ? `
          <div class="item-description">
            ${Array.isArray(exp.descripcion) 
              ? `<ul>${exp.descripcion.map(d => `<li>${d}</li>`).join('')}</ul>`
              : `<p>${exp.descripcion}</p>`
            }
          </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.cv.educacion && Array.isArray(data.cv.educacion) && data.cv.educacion.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Educación</h2>
      ${data.cv.educacion.map(edu => `
        <div class="education-item">
          <div class="item-header">
            <div>
              ${edu.titulo ? `<div class="item-title">${edu.titulo}</div>` : ''}
              ${edu.institucion ? `<div class="item-company">${edu.institucion}</div>` : ''}
            </div>
            ${edu.periodo ? `<div class="item-date">${edu.periodo}</div>` : ''}
          </div>
          ${edu.descripcion ? `<div class="item-description">${edu.descripcion}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.cv.habilidades && typeof data.cv.habilidades === 'object' && Object.keys(data.cv.habilidades).length > 0 ? `
    <div class="section">
      <h2 class="section-title">Habilidades</h2>
      ${Object.entries(data.cv.habilidades).map(([categoria, skills]) => `
        <div class="skill-category">
          <h4>${categoria}</h4>
          <div class="skill-tags">
            ${Array.isArray(skills) ? 
              skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('') 
              : ''
            }
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${data.cv.idiomas && Array.isArray(data.cv.idiomas) && data.cv.idiomas.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Idiomas</h2>
      <div class="skill-tags">
        ${data.cv.idiomas.map(idioma => 
          `<span class="skill-tag">${idioma.idioma || ''}: ${idioma.nivel || ''}</span>`
        ).join('')}
      </div>
    </div>
    ` : ''}
  </div>
</body>
</html>
    `.trim();
  };

  // Descargar como HTML (funciona sin librerías externas)
  const handleDownloadHTML = () => {
    if (!htmlContent) return;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData?.nombre || 'CV'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Abrir en nueva ventana para imprimir como PDF
  const handlePrintPDF = () => {
    if (!htmlContent) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permite las ventanas emergentes para esta función');
      return;
    }
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Esperar a que se cargue y luego abrir diálogo de impresión
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg border">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Generador de CV con IA</h2>
        <p className="text-sm text-gray-600 mb-4">Describe tu perfil profesional y la IA creará un CV profesional automáticamente</p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt" className="text-base font-semibold">Tu perfil profesional</Label>
            <Textarea
              id="prompt"
              placeholder="Ejemplo: Soy desarrollador Full Stack con 5 años de experiencia en React y Node.js. He trabajado en startups tecnológicas desarrollando aplicaciones web escalables. Tengo título en Ingeniería de Software y dominio de JavaScript, TypeScript, PostgreSQL..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="mt-2"
            />
          </div>

          <Button 
            onClick={generateCVWithAI} 
            disabled={loading || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {loading ? 'Generando CV con IA...' : 'Generar CV con IA'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {cvData && htmlContent && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button 
              className="flex-1 min-w-[200px]"
              onClick={handlePrintPDF}
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF (Imprimir)
            </Button>
            <Button 
              variant="outline"
              className="flex-1 min-w-[200px]"
              onClick={handleDownloadHTML}
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar HTML
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
            <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <p className="text-sm text-gray-600 font-medium">Vista previa del CV</p>
              </div>
              <iframe
                srcDoc={htmlContent}
                className="w-full border-0"
                style={{ height: '800px' }}
                title="CV Preview"
              />
            </div>
          )}
        </div>
      )}
      
      {!cvData && !loading && !error && (
        <Alert>
          <AlertDescription>
            💡 <strong>Tip:</strong> Describe tu experiencia, educación, habilidades e idiomas. Cuanto más detalles proporciones, mejor será el CV generado.
          </AlertDescription>
        </Alert>
      )}

      {cvData && !showPreview && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            ✅ CV generado correctamente. Haz clic en "Ver Vista Previa" para revisarlo o descárgalo directamente.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}