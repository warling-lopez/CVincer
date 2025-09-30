// app/api/match-offert/route.js

import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client.
// It automatically uses the OPENAI_API_KEY from process.env
const openai = new OpenAI();

export async function POST(request) {
  try {
    // 1. Parse the request body
    const { info } = await request.json();

    if (!info || typeof info !== "string" || info.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'info' in request body. Debe ser el texto extraído del CV." },
        { status: 400 }
      );
    }

    // 2. Use the openai library to create the chat completion with structured output
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un experto en recursos humanos y optimización de CVs para ATS (Applicant Tracking Systems).

Tu tarea es analizar el CV proporcionado y generar recomendaciones estructuradas y accionables para mejorar su efectividad en sistemas ATS.
IMPORTANTE:la puntuacion es de 0-100, siendo 100 la mejor puntuación posible.
Debes analizar las siguientes secciones:
1. **Información de Contacto**: Email, teléfono, LinkedIn, ubicación
2. **Resumen Profesional**: Descripción inicial o objetivo profesional
3. **Experiencia Laboral**: Roles, empresas, fechas, logros cuantificables
4. **Educación**: Títulos, instituciones, fechas
5. **Habilidades Técnicas**: Keywords relevantes para ATS
6. **Certificaciones**: Cursos, certificaciones profesionales
7. **Formato y Estructura**: Uso de palabras clave, formato compatible con ATS

Para cada sección, proporciona:
- **Estado**: "✅ Excelente", "⚠️ Necesita mejoras", o "❌ Faltante/Crítico"
- **Recomendaciones**: Lista específica de mejoras con ejemplos concretos
- **Ejemplos**: Antes y después cuando sea aplicable

Si una sección está perfecta, indícalo claramente y explica por qué.

Responde SIEMPRE en formato JSON válido con esta estructura:
{
  "resumen_general": {
    "puntuacion_ats": 75,
    "fortalezas": ["punto 1", "punto 2"],
    "areas_criticas": ["área 1", "área 2"]
  },
  "secciones": [
    {
      "nombre": "Información de Contacto",
      "estado": "✅ Excelente",
      "recomendaciones": [
        {
          "tipo": "mejora",
          "descripcion": "Descripción de la mejora",
          "ejemplo_antes": "Texto actual",
          "ejemplo_despues": "Texto mejorado"
        }
      ]
    }
  ],
  "keywords_sugeridas": ["keyword1", "keyword2"],
  "proximos_pasos": ["paso 1", "paso 2"]
}`,
        },
        {
          role: "user",
          content: `Analiza el siguiente CV y proporciona recomendaciones estructuradas para optimizarlo para ATS:\n\n${info}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4500,
    });

    // 3. Extract and parse the JSON response
    const recommendationsText = completion.choices[0].message.content;
    
    let recommendations;
    try {
      recommendations = JSON.parse(recommendationsText);
    } catch (parseError) {
      console.error("Error parsing JSON from OpenAI:", parseError);
      console.log("Raw response:", recommendationsText);
      
      // Fallback: return raw text if JSON parsing fails
      return NextResponse.json({
        success: false,
        error: "No se pudo parsear la respuesta",
        raw_response: recommendationsText,
      }, { status: 500 });
    }

    // 4. Validate the structure
    if (!recommendations.resumen_general || !recommendations.secciones) {
      console.warn("Response structure is incomplete:", recommendations);
      return NextResponse.json({
        success: false,
        error: "Estructura de respuesta incompleta",
        data: recommendations,
      }, { status: 500 });
    }

    // 5. Return successful response
    console.log("✅ Recomendaciones generadas exitosamente");
    return NextResponse.json({
      success: true,
      data: recommendations,
      metadata: {
        model: completion.model,
        tokens_used: completion.usage?.total_tokens || 0,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error("❌ Error generating recommendations:", error);
    
    // Detailed error handling
    if (error.code === "insufficient_quota") {
      return NextResponse.json(
        { 
          success: false,
          error: "Quota de API excedida. Por favor, verifica tu cuenta de OpenAI." 
        },
        { status: 429 }
      );
    }
    
    if (error.code === "invalid_api_key") {
      return NextResponse.json(
        { 
          success: false,
          error: "API key inválida. Verifica tu configuración." 
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Error interno al generar recomendaciones.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}