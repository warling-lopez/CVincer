"use client"
import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsOfService() {
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
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Términos de Servicio</h1>
          </div>
          <p className="text-gray-600">Última actualización: 15 de octubre de 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-24">
        <article className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">1. Aceptación de Términos</h2>
            <p className="leading-relaxed">
              Al acceder y utilizar CVincer ("el Servicio"), aceptas completamente estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes usar el Servicio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">2. Descripción del Servicio</h2>
            <p className="leading-relaxed">
              CVincer es una plataforma de software como servicio (SaaS) que utiliza inteligencia artificial para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Analizar ofertas laborales</li>
              <li>Optimizar currículums para sistemas ATS (Applicant Tracking Systems)</li>
              <li>Generar cartas de presentación personalizadas</li>
              <li>Proporcionar consejos de entrevista</li>
              <li>Crear reportes de compatibilidad</li>
            </ul>
            <p className="leading-relaxed pt-2">
              El Servicio es solo para uso personal y no comercial.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">3. Eligibilidad</h2>
            <p className="leading-relaxed">
              Debes tener al menos 18 años para usar CVincer. Al crear una cuenta, garantizas que la información proporcionada es precisa, actual y completa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">4. Cuentas de Usuario</h2>
            
            <div className="pl-6 border-l-4 border-blue-300 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">4.1 Responsabilidades</h3>
                <p className="leading-relaxed">
                  Eres responsable de mantener la confidencialidad de tu contraseña. Eres responsable de todas las actividades que ocurran en tu cuenta. Debes notificarnos inmediatamente de cualquier acceso no autorizado.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">4.2 Información Correcta</h3>
                <p className="leading-relaxed">
                  Debes proporcionar información verdadera, precisa y completa durante el registro. No debs usar información falsa o de terceros sin consentimiento.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">5. Planes y Precios</h2>
            
            <div className="pl-6 border-l-4 border-blue-300 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5.1 Plan Gratis</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>3 optimizaciones al mes</li>
                  <li>Análisis básico ATS</li>
                  <li>Acceso limitado a funciones</li>
                  <li>Puede ser discontinuado en cualquier momento</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5.2 Plan Pro</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Optimizaciones ilimitadas</li>
                  <li>Análisis avanzado ATS</li>
                  <li>Acceso a todas las funciones</li>
                  <li>Soporte estándar</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5.3 Cambios de Precio</h3>
                <p className="leading-relaxed">
                  Nos reservamos el derecho de cambiar los precios con 30 días de aviso previo. Los cambios se aplican en tu próximo ciclo de facturación.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">6. Pagos y Facturación</h2>
            <p className="leading-relaxed">
              Aceptamos tarjetas de crédito y otros métodos de pago digitales. Tu información de pago debe ser precisa y estar actualizada. Al suscribirse, autorizas a CVincer a cobrar automáticamente la tarifa en cada ciclo de facturación. Recibirás recibos digitales por cada transacción.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">7. Cancelación y Reembolsos</h2>
            
            <div className="pl-6 border-l-4 border-blue-300 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">7.1 Cancelación</h3>
                <p className="leading-relaxed">
                  Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. La cancelación entrará en vigor al final de tu ciclo de facturación actual.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">7.2 Reembolsos</h3>
                <p className="leading-relaxed">
                  Ver nuestra Política de Reembolsos para detalles completos. Las suscripciones mensuales no son reembolsables. Los créditos prepagados pueden ser reembolsables dentro de 30 días.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">7.3 Acceso Post-Cancelación</h3>
                <p className="leading-relaxed">
                  Perderás acceso al Servicio después de tu fecha de cancelación efectiva.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">8. Contenido del Usuario</h2>
            
            <div className="pl-6 border-l-4 border-blue-300 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">8.1 Propiedad</h3>
                <p className="leading-relaxed">
                  Conservas toda la propiedad de los CVs y otros documentos que cargues.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">8.2 Licencia</h3>
                <p className="leading-relaxed">
                  Nos otorgas una licencia no exclusiva para usar tu contenido para mejorar nuestro Servicio y entrenar modelos de IA mientras mantenemos tu privacidad.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">8.3 Eliminación</h3>
                <p className="leading-relaxed">
                  Puedes solicitar la eliminación de tu contenido en cualquier momento contactando a support@cvincer.com.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">9. Restricciones de Uso</h2>
            <p className="leading-relaxed mb-3">No debes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Usar el Servicio para fines ilegales o contrarios a estos términos</li>
              <li>Intentar acceso no autorizado a nuestros sistemas</li>
              <li>Cargar malware, virus o código malicioso</li>
              <li>Acosar, amenazar o abusar de otros usuarios</li>
              <li>Reproducir, distribuir o revender el Servicio</li>
              <li>Usar scraping o métodos automatizados para extraer datos</li>
              <li>Usar el Servicio para crear herramientas competidoras</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">10. Limitación de Responsabilidad</h2>
            
            <div className="pl-6 border-l-4 border-blue-300 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">10.1 Sin Garantías</h3>
                <p className="leading-relaxed">
                  El Servicio se proporciona "tal cual" sin garantías de ningún tipo. No garantizamos que conseguirás una entrevista o empleo, que el Servicio será ininterrumpido o libre de errores, o que cumplirá con tus expectativas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">10.2 Límites de Responsabilidad</h3>
                <p className="leading-relaxed mb-2">
                  En la máxima medida permitida por la ley, CVincer no será responsable por:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Daños indirectos, especiales, incidentales o consecuentes</li>
                  <li>Pérdida de datos, ingresos u oportunidades</li>
                  <li>Errores en el análisis de la IA</li>
                </ul>
                <p className="leading-relaxed pt-2">
                  La responsabilidad máxima total es el monto que pagaste en los últimos 12 meses.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">11. Propiedad Intelectual</h2>
            <p className="leading-relaxed">
              Todos los contenidos del Servicio, incluyendo texto, gráficos, logotipos, imágenes y software, son propiedad de CVincer o de nuestros proveedores de contenido.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">12. Privacidad</h2>
            <p className="leading-relaxed">
              Tu privacidad es importante para nosotros. Por favor, consulta nuestra Política de Privacidad para conocer cómo recopilamos, usamos y protegemos tus datos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">13. Cambios a los Términos</h2>
            <p className="leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos se notificarán por email. Tu uso continuado del Servicio después de los cambios constituye tu aceptación de los nuevos términos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">14. Ley Aplicable</h2>
            <p className="leading-relaxed">
              Estos términos se rigen por las leyes aplicables. Cualquier disputa se resolverá en los tribunales competentes. Antes de litigar, ambas partes aceptan intentar resolver la disputa a través de negociación directa.
            </p>
          </section>

          <section className="bg-blue-50 p-8 rounded-lg border border-blue-200 space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Contacto</h2>
            <p className="leading-relaxed">
              Para preguntas sobre estos términos, contacta:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>CVincer Support</strong></p>
              <p>Email: <span className="font-mono">legal@cvincer.com</span></p>
              <p>Sitio Web: <span className="font-mono">www.cvincer.com</span></p>
            </div>
          </section>
        </article>
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