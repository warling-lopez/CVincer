"use client"
import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      title: '1. Introducción',
      content: 'CVincer respeta tu privacidad y se compromete a proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información.'
    },
    {
      id: 2,
      title: '2. Información que Recopilamos',
      subsections: [
        {
          subtitle: '2.1 Información que Proporcionas Directamente',
          items: [
            'Nombre completo, email, contraseña (hasheada)',
            'Foto de perfil (opcional)',
            'País/Ubicación',
            'Tarjeta de crédito (solo últimos 4 dígitos almacenados)',
            'CVs, ofertas y cartas de presentación'
          ]
        },
        {
          subtitle: '2.2 Información Recopilada Automáticamente',
          items: [
            'Dirección IP, tipo de navegador',
            'Páginas visitadas, tiempo en el sitio',
            'Cookies y tecnologías de rastreo',
            'Datos de rendimiento y errores'
          ]
        }
      ]
    },
    {
      id: 3,
      title: '3. Cómo Usamos tu Información',
      subsections: [
        {
          subtitle: '3.1 Operación del Servicio',
          text: 'Crear y mantener tu cuenta, procesar pagos, proporcionar soporte técnico y enviar notificaciones.'
        },
        {
          subtitle: '3.2 Mejora del Servicio',
          text: 'Analizar uso, identificar errores, desarrollar nuevas características y entrenar modelos de IA con datos anonimizados.'
        },
        {
          subtitle: '3.3 Comunicaciones',
          text: 'Responder consultas, enviar actualizaciones de cuenta, información de cambios y campañas de marketing (solo si lo autorizaste).'
        }
      ]
    },
    {
      id: 4,
      title: '4. Intercambio de Información',
      subsections: [
        {
          subtitle: '4.1 No Vendemos Datos',
          text: 'Nunca vendemos tu información personal a terceros para sus propios fines de marketing.'
        },
        {
          subtitle: '4.2 Terceros con los que Compartimos',
          items: [
            'Stripe/PayPal - Procesamiento de pagos',
            'AWS - Hosting y almacenamiento',
            'SendGrid - Emails',
            'OpenAI - Procesamiento de IA',
            'Hotjar/Mixpanel - Análisis'
          ]
        }
      ]
    },
    {
      id: 5,
      title: '5. Retención de Datos',
      content: 'Datos mientras tu cuenta sea activa más 30 días después. CVs hasta que solicites eliminación. Datos de pago: 7 años (requisito fiscal). Logs de acceso: 90 días.'
    },
    {
      id: 6,
      title: '6. Tus Derechos',
      subsections: [
        {
          subtitle: '6.1 Derechos GDPR (Residentes de la UE)',
          items: [
            'Acceso: Solicitar copia de tus datos',
            'Rectificación: Corregir datos inexactos',
            'Eliminación: "Derecho al olvido"',
            'Restricción: Limitar procesamiento',
            'Portabilidad: Recibir datos en formato estructurado',
            'Oposición: Oponerme al procesamiento para marketing'
          ]
        },
        {
          subtitle: '6.2 Cómo Ejercer tus Derechos',
          text: 'Contacta a privacy@cvincer.com. Responderemos en 30 días.'
        }
      ]
    },
    {
      id: 7,
      title: '7. Seguridad de Datos',
      subsections: [
        {
          subtitle: '7.1 Medidas de Seguridad',
          items: [
            'Encriptación SSL/TLS en tránsito',
            'Encriptación AES-256 en reposo',
            'Contraseñas hasheadas con bcrypt',
            'Autenticación de dos factores disponible',
            'Firewalls y sistemas de detección de intrusos'
          ]
        },
        {
          subtitle: '7.2 Limitaciones',
          text: 'Aunque implementamos medidas robustas, ningún sistema es 100% seguro. No podemos garantizar seguridad absoluta.'
        }
      ]
    },
    {
      id: 8,
      title: '8. Cookies y Rastreo',
      subsections: [
        {
          subtitle: '8.1 Tipos de Cookies',
          items: [
            'Esenciales: Autenticación, sesión y preferencias',
            'Analíticas: Google Analytics, comportamiento del usuario',
            'Marketing: Pixel de seguimiento, retargeting'
          ]
        },
        {
          subtitle: '8.2 Gestionar Cookies',
          text: 'Puedes rechazar o eliminar cookies en la configuración de tu navegador. Esto puede afectar la funcionalidad del sitio.'
        }
      ]
    },
    {
      id: 9,
      title: '9. Contacto y Derechos',
      subsections: [
        {
          subtitle: '9.1 Responsable de Privacidad',
          text: 'Email: privacy@cvincer.com'
        },
        {
          subtitle: '9.2 Quejas',
          items: [
            'Contacta a privacy@cvincer.com',
            'Si no estás satisfecho, contacta a la autoridad local',
            'UE: Autoridad de Protección de Datos local',
            'California: California Attorney General',
            'Canadá: Office of the Privacy Commissioner'
          ]
        }
      ]
    }
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
            <Lock className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Política de Privacidad</h1>
          </div>
          <p className="text-gray-600">Última actualización: 15 de octubre de 2025</p>
          <p className="text-gray-600 max-w-2xl">
            Protegemos tu privacidad y tus datos. Lee cómo recopilamos, usamos y protegemos tu información personal.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="p-4 border-2 border-green-200 bg-green-50">
            <h3 className="font-semibold text-green-900 mb-2">Encriptación</h3>
            <p className="text-sm text-green-800">Tus datos se protegen con encriptación AES-256</p>
          </Card>
          <Card className="p-4 border-2 border-blue-200 bg-blue-50">
            <h3 className="font-semibold text-blue-900 mb-2">No Vendemos Datos</h3>
            <p className="text-sm text-blue-800">Nunca compartimos ni vendemos tu información</p>
          </Card>
          <Card className="p-4 border-2 border-purple-200 bg-purple-50">
            <h3 className="font-semibold text-purple-900 mb-2">Tus Derechos</h3>
            <p className="text-sm text-purple-800">GDPR, CCPA y protecciones locales</p>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-24">
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>

              {section.content && (
                <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
              )}

              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((sub, idx) => (
                    <div key={idx} className="pl-4 border-l-2 border-green-200">
                      <h3 className="font-semibold text-gray-900 mb-3">{sub.subtitle}</h3>
                      {sub.text && (
                        <p className="text-gray-700 leading-relaxed mb-2">{sub.text}</p>
                      )}
                      {sub.items && (
                        <ul className="space-y-2">
                          {sub.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex gap-2 text-gray-700">
                              <span className="text-green-600 font-semibold">•</span>
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

        {/* Footer Info */}
        <div className="mt-12 p-8 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-2">Tu Privacidad es Nuestra Prioridad</h3>
          <p className="text-gray-600 mb-4">
            Si tienes dudas sobre cómo procesamos tus datos, contáctanos sin dudarlo.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Email:</strong> privacy@cvincer.com</p>
            <p><strong>Sitio Web:</strong> www.cvincer.com</p>
            <p className="pt-2 text-xs text-gray-500">Tiempo de respuesta: Dentro de 30 días (o según lo requerido por ley)</p>
          </div>
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