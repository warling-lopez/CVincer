"use client";
import React from "react";
import { ArrowLeft, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RefundPolicy() {
  const sections = [
    {
      id: 1,
      title: "1. Política General de Reembolsos",
      content:
        "En CVincer, queremos que estés satisfecho con tu compra. Esta política explica cuándo y cómo podemos procesar reembolsos de forma clara y transparente.",
    },
    {
      id: 2,
      title: "2. Plan Gratis",
      content:
        "No aplica. El Plan Gratis es completamente gratuito y no hay reembolsos aplicables.",
      badge: "Sin Cambios",
    },
    {
      id: 3,
      title: "3. Plan Pro - Suscripción Mensual",
      subsections: [
        {
          subtitle: "3.1 Período de Garantía de 14 Días",
          items: [
            "Si te suscribes y cambias de opinión dentro de 14 días calendario, puedes solicitar reembolso completo",
            "Requisitos: Email de la cuenta, especificar razón (opcional)",
            "Envía a: warlinglopez01@gmail.com",
            "Revisión: 2-3 días hábiles",
            "Reembolso: 3-5 días hábiles",
          ],
        },
        {
          subtitle: "3.2 Después de 14 Días",
          items: [
            "Los pagos mensuales son NO REEMBOLSABLES Después de 14 Días ",
            "Puedes cancelar en cualquier momento, pero sin reembolso del mes actual",
            "Excepción: Si hay fallo técnico importante, contáctanos para resolver",
          ],
        },
      ],
      badge: "Garantía",
    },
    {
      id: 4,
      title: "4. Créditos Prepagados",
      content: `Reembolso completo dentro de 30 días si se ha consumido menos del 50% de los créditos. Si el uso supera 50% o ha pasado el plazo, no hay reembolso No aplica. 
        El Plan Gratis es completamente gratuito y no hay reembolsos aplicables`,
    },
    {
      id: 5,
      title: "5. Casos Especiales",
      subsections: [
        {
          subtitle: "5.1 Cargos Duplicados",
          items: [
            "Si fuiste cargado dos veces por error",
            "Contacta a warlinglopez01@gmail.com con comprobante",
            "Investigaremos en 24 horas",
            "Si es error nuestro, reembolsamos de inmediato",
          ],
        },
        {
          subtitle: "5.2 Acceso No Autorizado",
          items: [
            "Contacta a warlinglopez01@gmail.com inmediatamente",
            "Cambio forzado de contraseña",
            "Podemos ofrecer reembolso si determinamos fraude",
          ],
        },
        {
          subtitle: "5.3 Incumplimiento de Servicio Importante",
          items: [
            "Si CVincer cae por más de 24 horas",
            "Ofrecemos crédito prorrateado o extensión del plan",
            "Reembolso disponible si se determina negligencia nuestra",
          ],
        },
      ],
    },
    {
      id: 6,
      title: "6. Cancelación de Suscripción",
      subsections: [
        {
          subtitle: "6.1 Cómo Cancelar",
          items: [
            "Opción 1: Configuración → Facturación → Cancelar Suscripción",
            "Opción 2: Email a warlingwarlinglopez01@gmail.com",
            "Procesamos en 24 horas",
          ],
        },
        {
          subtitle: "6.2 Cuándo Entra en Vigor",
          text: "Acceso hasta el final de tu ciclo de facturación actual. Ejemplo: Si pagas el 15 de cada mes y cancelas el 1, pierdes acceso el 15.",
        },
      ],
    },
    {
      id: 7,
      title: "7. Métodos de Reembolso",
      content:
        "Los reembolsos se procesan al mismo método de pago original. Tarjeta de crédito: 3-5 días hábiles. PayPal: 1-3 días hábiles. Transferencia: 5-14 días hábiles. Tu banco podría tomar días adicionales.",
    },
    {
      id: 8,
      title: "8. Limitaciones de Reembolso",
      subsections: [
        {
          subtitle: "No reembolsamos por:",
          items: [
            "Cambios de opinión después del período de garantía",
            "No utilizar completamente el servicio",
            "Insatisfacción con resultados (no garantizamos entrevistas)",
            "Errores en cálculos de créditos que ya usaste",
            "Violación de nuestros términos de servicio",
            "Cuenta suspendida por fraude",
          ],
        },
      ],
    },
    {
      id: 9,
      title: "9. Fraude y Violaciones",
      subsections: [
        {
          subtitle: "Si detectamos fraude:",
          items: [
            "Uso fraudulento de cuenta",
            "Violación de términos de servicio",
            "Intentos de explotar la política",
            "Cargos múltiples para obtener reembolsos",
          ],
        },
        {
          subtitle: "Acciones:",
          items: [
            "Denegaremos el reembolso",
            "Podemos suspender la cuenta",
            "Podemos tomar acciones legales",
          ],
        },
      ],
    },
    {
      id: 10,
      title: "10. Disputas y Contracargos",
      content:
        "Si abres un contracargo sin intentar resolver con nosotros primero, tu cuenta será suspendida. Por favor, contacta a warlinglopez01@gmail.com primero.",
    },
    {
      id: 11,
      title: "11. Proceso de Solicitud - Paso a Paso",
      subsections: [
        {
          subtitle: "Paso 1 - Contacta:",
          text: 'Email: warlinglopez01@gmail.com | Asunto: "Solicitud de Reembolso"',
        },
        {
          subtitle: "Paso 2 - Información Requerida:",
          items: [
            "Email de la cuenta",
            "Tipo de suscripción/compra",
            "Fecha del pago",
            "Razón del reembolso",
            "Número de transacción (si lo tienes)",
          ],
        },
        {
          subtitle: "Paso 3 - Revisión:",
          text: "Respondemos en 2-3 días hábiles. Podemos hacer preguntas adicionales.",
        },
        {
          subtitle: "Paso 4 - Decisión:",
          text: "Aprobado: Confirmación + ETA. Denegado: Explicación detallada.",
        },
        {
          subtitle: "Paso 5 - Procesamiento:",
          text: "El reembolso se envía en 3-5 días hábiles (puede variar por banco).",
        },
      ],
    },
  ];

  const refundTable = [
    { type: "Plan Gratis", period: "N/A", status: "No reembolsable" },
    { type: "Plan Pro", period: "14 días", status: "100% reembolso" },
    {
      type: "Plan Pro",
      period: "Después de 14 días",
      status: "No reembolsable",
    },
    { type: "Plan Pro+", period: "14 días", status: "100% reembolso" },
    {
      type: "Plan Pro+",
      period: "Después de 14 días",
      status: "No reembolsable",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 text-blue-600 hover:text-blue-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Política de Reembolso — CVincer
            </h1>
          </div>
          <p className="text-gray-600">
            Última actualización: 18 de octubre de 2025
          </p>
          <p className="text-gray-600 max-w-2xl">
            Transparencia total. Aquí encontrarás todas las condiciones de
            reembolso, garantías y cómo funciona el proceso.
          </p>
        </div>

        {/* Quick Summary Alert */}
        <Alert className="mb-8 border-emerald-200 bg-emerald-50">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">
            <strong>En resumen:</strong> Plan Pro tiene 14 días de garantía.
            Créditos adcionales no se reembolsan.
          </AlertDescription>
        </Alert>

        {/* Quick Reference Table */}
        <Card className="p-6 mb-12 border-2 border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">
            Referencia Rápida de Reembolsos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-3 font-semibold text-gray-900">
                    Tipo
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-900">
                    Período
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-900">
                    Reembolso
                  </th>
                </tr>
              </thead>
              <tbody>
                {refundTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-3 text-gray-700">{row.type}</td>
                    <td className="py-3 px-3 text-gray-700">{row.period}</td>
                    <td className="py-3 px-3">
                      <Badge
                        className={
                          row.status.includes("100%")
                            ? "bg-green-100 text-green-700"
                            : row.status.includes("Prorrateado")
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-24">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                {section.badge && (
                  <Badge variant="outline" className="text-xs">
                    {section.badge}
                  </Badge>
                )}
              </div>

              {section.content && (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {section.content}
                </p>
              )}

              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((sub, idx) => (
                    <div
                      key={idx}
                      className="pl-4 border-l-2 border-emerald-200"
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {sub.subtitle}
                      </h3>
                      {sub.text && (
                        <p className="text-gray-700 leading-relaxed mb-2">
                          {sub.text}
                        </p>
                      )}
                      {sub.items && (
                        <ul className="space-y-2">
                          {sub.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex gap-2 text-gray-700"
                            >
                              <span className="text-emerald-600 font-semibold">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <Alert className="mt-12 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Importante:</strong> Excepciones claras (no ambiguas) No se
            emiten reembolsos por simple desuso pasado el período aplicable
            descrito arriba. No se reembolsa por resultados no garantizados (p.
            ej. no conseguir empleo). Procesamiento por Paddle Dado que Paddle
            actúa como Merchant of Record, puede procesar y autorizar reembolsos
            conforme a su política. CVincer coordinará con Paddle en cada caso.
          </AlertDescription>
        </Alert>

        {/* Contact Section */}
        <div className="mt-12 p-8 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            ¿Necesitas un Reembolso?
          </h3>
          <p className="text-gray-600 mb-6">
            El proceso es simple y transparente. Contáctanos y te ayudaremos
            rápidamente.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                📧 Para Reembolsos:
              </p>
              <p className="text-emerald-700 font-mono text-sm">
                warlinglopez01@gmail.com
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                💳 Para Facturación:
              </p>
              <p className="text-emerald-700 font-mono text-sm">
                warlinglopez01@gmail.com
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Tiempo de respuesta: 2-3 días hábiles. Procesaremos tu solicitud
            rápidamente.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-900 border-t border-gray-800 mt-12">
        <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CVincer. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
