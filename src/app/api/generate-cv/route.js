// app/api/generate-cv/route.js

import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Initialize the OpenAI client.
// It automatically uses the OPENAI_API_KEY from process.env
const openai = new OpenAI();

export async function POST(request) {
  try {
    // 1. Correctly parse the request body for Next.js App Router
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing 'prompt' in request body" },
        { status: 400 }
      );
    }

    // 2. Use the openai library to create the chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // gpt-4o is generally faster and better than gpt-4 for this type of task
      // 3. Define clear roles and include the user's prompt
      messages: [
        {
          role: "system",
          content: `Eres un experto en recursos humanos. Tu tarea es extraer información de un texto y estructurarla en formato JSON para crear un CV profesional.

El JSON debe tener esta estructura EXACTA solo el json, sin texto adicional y si falta info inventate datos realistas:
{
    cv:{
        "nombre": "Nombre completo",
        "titulo": "Título profesional",
        "email": "email@ejemplo.com",
        "telefono": "+34 123 456 789",
        "ubicacion": "Ciudad, País",
        "linkedin": "linkedin.com/in/usuario (opcional)",
        "github": "github.com/usuario (opcional)",
        "resumen": "Breve resumen profesional de 2-3 líneas",
        "experiencia": [
            {
            "puesto": "Título del puesto",
            "empresa": "Nombre de la empresa",
            "periodo": "Mes Año - Mes Año",
            "descripcion": [
                "Logro o responsabilidad 1",
                "Logro o responsabilidad 2",
                "Logro o responsabilidad 3"
            ]
            }
        ],
        "educacion": [
            {
            "titulo": "Título académico",
            "institucion": "Universidad/Instituto",
            "periodo": "Año - Año",
            "descripcion": "Descripción opcional"
            }
        ],
        "habilidades": {
            "Técnicas": ["Habilidad 1", "Habilidad 2"],
            "Herramientas": ["Herramienta 1", "Herramienta 2"],
            "Blandas": ["Habilidad 1", "Habilidad 2"]
        },
        "idiomas": [
            {"idioma": "Español", "nivel": "Nativo"},
            {"idioma": "Inglés", "nivel": "Avanzado"}
        ]
    }
}

IMPORTANTE: 
- Responde SOLO con el JSON, sin texto adicional
- Si falta información, usa datos de ejemplo realistas
- Haz el CV lo más profesional y completo posible con la información dada`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // 4. Extract the JSON string content from the response
    const cvJsonString = completion.choices[0].message.content;

    // Optional: Parse the JSON string to ensure it's valid before sending it back
    // This allows you to return a clean JavaScript object to the client.
    const cvData = JSON.parse(cvJsonString);

    // 5. Return the response using NextResponse.json
    console.log(cvData);
    return NextResponse.json({ cv: cvData });
  } catch (error) {
    console.error("Error generating CV:", error);
    // Handle potential errors like network issues or malformed JSON from the API
    return NextResponse.json(
      {
        error:
          "Failed to generate CV. Internal server error or bad API response.",
      },
      { status: 500 }
    );
  }
}
