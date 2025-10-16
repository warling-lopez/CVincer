"use client"
import React, { useState } from 'react';
import { Check, X, Zap, Star, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Gratis',
      price: '$0',
      period: '/mes',
      description: 'Da tu primer paso',
      features: [
        { text: '3 optimizaciones al mes', included: true },
        { text: 'Análisis básico ATS', included: true },
        { text: 'Exportación PDF', included: true },
        { text: 'Análisis de ofertas', included: false },
        { text: 'Múltiples versiones', included: false },
        { text: 'Scoring pre-envío', included: false },
        { text: 'Plantillas premium', included: false },
        { text: 'Soporte prioritario', included: false },
      ],
      cta: 'Comenzar Gratis',
      ctaVariant: 'outline',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$14.29',
      period: '/mes',
      description: 'Multiplica tus oportunidades',
      badge: 'Recomendado',
      features: [
        { text: 'Optimizaciones ilimitadas', included: true },
        { text: 'Análisis avanzado ATS', included: true },
        { text: 'Exportación PDF', included: true },
        { text: 'Análisis de ofertas', included: true },
        { text: 'Múltiples versiones', included: true },
        { text: 'Scoring pre-envío', included: false },
        { text: 'Plantillas premium', included: false },
        { text: 'Soporte prioritario', included: true },
      ],
      cta: 'Empezar Prueba Gratis',
      ctaVariant: 'default',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Pro+',
      price: '29.99',
      period: '/mes',
      description: 'Máximo Empuje',
      features: [
        { text: 'Todo lo del plan Pro', included: true },
        { text: 'Sincronización LinkedIn', included: true },
        { text: 'Exportación PDF', included: true },
        { text: 'Análisis de ofertas', included: true },
        { text: 'Múltiples versiones', included: true },
        { text: 'Scoring pre-envío', included: true },
        { text: 'Plantillas premium', included: true },
        { text: 'Soporte prioritario', included: true },
      ],
      cta: 'Contactar Ventas',
      ctaVariant: 'outline',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: '¿Por qué mi CV es rechazado si tengo la experiencia?',
      a: 'Los sistemas ATS (sistemas de seguimiento automático) filtran CVs antes de que un reclutador los vea. Si tu CV no tiene las palabras clave correctas o no está optimizado, nunca llegará a manos del reclutador. CVincer analiza la oferta y adapta tu CV para pasar estos filtros automáticos.',
    },
    {
      q: '¿Cuánto tiempo toma optimizar un CV?',
      a: 'El análisis completo toma menos de 2 minutos. Recibirás un CV optimizado listo para descargar y enviar inmediatamente. Sin esperas, sin complicaciones.',
    },
    {
      q: '¿Necesito tarjeta de crédito para la prueba gratis?',
      a: 'No, nunca. Puedes usar el plan gratis indefinidamente sin ingresar información de pago. Si decides actualizar a Pro, entonces sí necesitarás tarjeta, pero puedes cancelar en cualquier momento.',
    },
    {
      q: '¿Funciona para cualquier tipo de trabajo?',
      a: 'Sí, CVincer funciona con cualquier oferta: tech, marketing, ventas, diseño, finanzas, recursos humanos, etc. Nuestra IA se adapta a cualquier industria y nivel de experiencia.',
    },
    {
      q: '¿Puedo ver el cambio antes de descargar?',
      a: 'Completamente. Recibirás una vista previa con comparaciones lado a lado mostrando qué cambió en tu CV. Así ves exactamente cómo mejoramos tu presentación.',
    },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white via-white to-gray-50 min-h-screen">
      {/* Header */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24 space-y-12">
        <div className="text-center space-y-4">
          <Badge className="mx-auto bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1">
            Planes Asequibles
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            El acceso a tu primer empleo no debería ser caro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el plan que necesitas para que tu CV destaque. Sin sorpresas, sin compromisos a largo plazo.
          </p>
        </div>

        {/* Free Trial CTA */}
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 hover:underline">
            Probar gratis sin tarjeta de crédito →
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              className={`relative flex flex-col transition-all duration-300 ${
                plan.popular ? 'md:scale-105 md:shadow-2xl' : 'md:hover:shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full flex flex-col border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Header */}
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>

                  {/* Price */}
                  <div className="pt-4 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    {plan.id === 'free' && (
                      <p className="text-xs text-gray-500">Siempre gratis</p>
                    )}
                    {plan.id === 'pro' && (
                      <p className="text-xs text-gray-500">7 días gratis, luego billed</p>
                    )}
                  </div>
                </CardHeader>

                {/* CTA Button */}
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <Button
                    variant={plan.ctaVariant}
                    className={`w-full font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : ''
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Features */}
                  <div className="space-y-4 flex-1">
                    <p className="text-sm font-semibold text-gray-900">Incluye:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIdx) => (
                        <li
                          key={featureIdx}
                          className="flex items-start gap-3 text-sm transition-opacity duration-300"
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              feature.included ? 'text-gray-700' : 'text-gray-400'
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Credit System Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Compra Créditos Según Necesites
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Si necesitas más optimizaciones, compra créditos sin límite. Úsalos cuando quieras, sin fecha de vencimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { credits: 5, price: '$4.99', perCredit: '$0.99' },
              { credits: 15, price: '$10.95', perCredit: '$0.73', popular: true },
              { credits: 35, price: '$21.99', perCredit: '$0.60' },
            ].map((bundle, idx) => (
              <Card
                key={idx}
                className={`border-2 transition-all duration-300 ${
                  bundle.popular
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CardContent className="p-6 text-center space-y-6">
                  {bundle.popular && (
                    <Badge className="mx-auto bg-purple-600 text-white">
                      Mejor Valor
                    </Badge>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      <span className="text-4xl font-bold text-gray-900">
                        {bundle.credits}
                      </span>
                      <span className="text-gray-600">Usos</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{bundle.price}</p>
                    <p className="text-sm text-gray-600">
                      {bundle.perCredit} por crédito
                    </p>
                  </div>

                  <Button
                    className={`w-full font-semibold ${
                      bundle.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : ''
                    }`}
                  >
                    Comprar Créditos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">¿Cómo funcionan los créditos?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="space-y-2">
                <div className="font-semibold text-gray-900">1 crédito = 1 optimización</div>
                <p>Optimiza tu CV contra una oferta laboral. Todo lo que necesitas en una operación.</p>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-gray-900">Sin expiración</div>
                <p>Tus créditos nunca vencen. Úsalos cuando encuentres esa oferta perfecta.</p>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-gray-900">Sin sorpresas</div>
                <p>Solo pagas por lo que usas. Sin suscripciones ocultas ni cargos inesperados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Dudas Comunes</h2>
          <p className="text-lg text-gray-600">Todo lo que necesitas saber para empezar</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="font-semibold text-gray-900 text-left pr-4">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                    expandedFaq === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {expandedFaq === idx && (
                <div className="p-6 bg-white border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Tu próxima entrevista te espera
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            No dejes que un CV mal presentado sea el motivo por el que no consigues esa oportunidad. Optimiza hoy, entrevista mañana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8" size="lg">
              Crear mi cuenta gratis
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8" size="lg">
              Ver cómo funciona
            </Button>
          </div>
          <p className="text-sm text-gray-400 pt-2">
            Sin tarjeta de crédito requerida. Acceso instantáneo.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 border-t border-gray-800">
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">CVincer</h3>
              <p className="text-gray-400 text-sm">© 2025 CVincer. Todos los derechos reservados.</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;