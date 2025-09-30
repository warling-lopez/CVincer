// pages/api/generate-cv.js
// o app/api/generate-cv/route.js para Next.js 13+
import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    // Opción 1: OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Eres un experto en recursos humanos. Tu tarea es extraer información de un texto y estructurarla en formato JSON para crear un CV profesional.

El JSON debe tener esta estructura EXACTA:
{
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

IMPORTANTE: 
- Responde SOLO con el JSON, sin texto adicional
- Si falta información, usa datos de ejemplo realistas
- Haz el CV lo más profesional y completo posible`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Parsear la respuesta de la IA
    const cvData = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(cvData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      error: error.message,
      // Datos de ejemplo si falla
      fallback: {
        nombre: "Juan Pérez García",
        titulo: "Desarrollador Full Stack Senior",
        email: "juan.perez@email.com",
        telefono: "+34 600 123 456",
        ubicacion: "Madrid, España",
        linkedin: "linkedin.com/in/juanperez",
        github: "github.com/juanperez",
        resumen:
          "Desarrollador Full Stack con más de 5 años de experiencia creando aplicaciones web escalables y de alto rendimiento. Especializado en React, Node.js y arquitecturas cloud.",
        experiencia: [
          {
            puesto: "Senior Full Stack Developer",
            empresa: "Tech Company S.L.",
            periodo: "Ene 2021 - Actualidad",
            descripcion: [
              "Desarrollo de aplicaciones web con React y Node.js",
              "Implementación de arquitecturas microservicios en AWS",
              "Liderazgo técnico de equipo de 4 desarrolladores",
            ],
          },
        ],
        educacion: [
          {
            titulo: "Ingeniería Informática",
            institucion: "Universidad Politécnica de Madrid",
            periodo: "2015 - 2019",
            descripcion: "Especialización en Desarrollo de Software",
          },
        ],
        habilidades: {
          Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
          DevOps: ["Docker", "AWS", "CI/CD", "Git"],
          Metodologías: ["Agile", "Scrum", "TDD"],
        },
        idiomas: [
          { idioma: "Español", nivel: "Nativo" },
          { idioma: "Inglés", nivel: "Avanzado (C1)" },
        ],
      },
    });
  }
  
}


// Versión para Next.js 13+ App Router
// app/api/generate-cv/route.js
/*
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { prompt } = await request.json();
  
  // ... mismo código de arriba ...
  
  return NextResponse.json(cvData);
}
*/
