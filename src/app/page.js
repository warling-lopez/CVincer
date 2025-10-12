"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useRef,
  forwardRef,
} from "react";
import {
  Upload,
  BrainCircuit,
  Wand2,
  Download,
  Check,
  Loader2,
  X,
  Target,
  Zap,
  Search,
  Twitter,
  Linkedin,
  Github,
  ChevronRight,
  User,
  LogOut,
  TextAlignJustify,
} from "lucide-react";

import { useRouter } from "next/navigation";
import supabase from "@/supabase/supabase";
import { cn } from "@/lib/utils";

// ============================================================================
// 📁 lib/translations.js
// ============================================================================

const translations = {
  es: {
    auth: {
      login: {
        title: "Iniciar Sesión",
        email: "Correo Electrónico",
        password: "Contraseña",
        submit: "Iniciar Sesión",
        loading: "Iniciando...",
        forgot: "¿Olvidaste tu contraseña?",
        noAccount: "¿No tienes cuenta?",
        signup: "Regístrate",
      },
      signup: {
        title: "Crear una cuenta",
        name: "Nombre completo",
        email: "Correo Electrónico",
        password: "Contraseña",
        confirm: "Confirmar Contraseña",
        terms: "Acepto los Términos y Condiciones",
        submit: "Crear Cuenta Gratis",
        loading: "Creando cuenta...",
        hasAccount: "¿Ya tienes cuenta?",
        login: "Inicia Sesión",
      },
    },
    header: {
      appName: "CVincer",
      login: "Iniciar Sesión",
      signup: "Registrarse",
      dashboard: "Dashboard",
      logout: "Cerrar Sesión",
    },
    hero: {
      tag: "Transforma Tu CV y Consigue Esa Entrevista",
      title: "Deja de ser invisible. Adapta tu CV y consigue la entrevista.",
      subtitle:
        "Una IA que analiza la oferta laboral y optimiza tu currículum para captar la atención de los reclutadores. Menos esfuerzo, más resultados.",
      cta: "Optimiza tu CV gratis",
      secondaryCta: "Empieza gratis, sin tarjeta de crédito.",
      socialProof:
        "Únete a más de 1,000 profesionales que ya optimizaron su CV.",
    },
    problem: {
      title: "El Problema No Eres Tú, Es Cómo Te Presentas",
      subtitle:
        "Candidatos excelentes son descartados a diario por errores comunes que se pueden evitar.",
      cards: [
        {
          title: "Proceso Manual Ineficiente",
          description:
            "Adaptar tu CV para cada oferta consume horas y genera dudas. ¿Estaré usando las palabras correctas?",
        },
        {
          title: "Brecha de Conocimiento ATS",
          description:
            "La mayoría no sabe cómo reescribir logros para demostrar impacto o para optimizar para los sistemas de seguimiento (ATS).",
        },
        {
          title: "Falta de Disciplina Sistemática",
          description:
            "Mantener un CV maestro actualizado y saber qué resaltar para cada aplicación requiere un criterio que solo la práctica da.",
        },
      ],
    },
    howItWorks: {
      title: "Cómo funciona CVincer",
      subtitle: "En 4 simples pasos, tendrás un CV listo para destacar.",
      steps: [
        {
          title: "Sube tus Documentos",
          description:
            "Carga tu CV actual y pega la descripción de la oferta de trabajo a la que quieres aplicar.",
        },
        {
          title: "Análisis con IA",
          description:
            "Nuestra IA identifica las palabras clave, habilidades y requisitos más importantes de la oferta.",
        },
        {
          title: "Optimización Mágica",
          description:
            "Reescribimos y adaptamos las secciones clave de tu CV para un match perfecto con el puesto.",
        },
        {
          title: "Descarga y Conquista",
          description:
            "Obtén tu nuevo CV optimizado en formato PDF, listo para ser enviado con confianza.",
        },
      ],
    },
    features: {
      title: "Funcionalidades diseñadas para darte una ventaja",
      subtitle:
        "Todo lo que necesitas para que tu aplicación destaque del resto.",
      viability: {
        high: "Disponible",
        medium: "En Beta",
        low: "Próximamente",
      },
      items: [
        {
          title: "Análisis Inteligente de Ofertas",
          description:
            "La IA extrae las competencias, palabras clave y requisitos clave de cualquier oferta laboral.",
          viability: "high",
        },
        {
          title: "Optimización ATS Instantánea",
          description:
            "Aumentamos tu puntuación de compatibilidad para asegurar que pases los filtros automáticos.",
          viability: "high",
        },
        {
          title: "Reescritura Orientada a Resultados",
          description:
            "Transformamos tus responsabilidades en logros cuantificables usando la metodología STAR.",
          viability: "high",
        },
        {
          title: "Generación Rápida de Versiones",
          description:
            "Crea múltiples versiones de tu CV adaptadas a diferentes roles con un solo clic.",
          viability: "medium",
        },
        {
          title: "Scoring y Verificación Pre-envío",
          description:
            "Obtén una calificación de tu CV contra la oferta y recibe sugerencias de mejora antes de enviarlo.",
          viability: "medium",
        },
        {
          title: "Sincronización de Perfil Online",
          description:
            "Alineamos tu CV con tu perfil de LinkedIn para mantener una marca profesional consistente.",
          viability: "low",
        },
      ],
    },
    pricing: {
      title: "Planes para cada etapa de tu carrera",
      subtitle: "Elige el plan que mejor se adapte a tus necesidades.",
      badge: "Más Popular",
      plans: [
        {
          name: "Gratis",
          price: "$0",
          period: "/mes",
          features: [
            "3 optimizaciones al mes",
            "Análisis básico ATS",
            "Exportación PDF",
          ],
          cta: "Comenzar Gratis",
        },
        {
          name: "Pro",
          price: "$9.99",
          period: "/mes",
          features: [
            "Optimizaciones ilimitadas",
            "Análisis avanzado ATS",
            "Múltiples versiones de CV",
            "Scoring pre-envío",
            "Plantillas premium",
          ],
          cta: "Empezar Prueba Gratis",
        },
        {
          name: "Enterprise",
          price: "Personalizado",
          period: "",
          features: [
            "Todo lo del plan Pro",
            "Sincronización LinkedIn",
            "Soporte prioritario",
            "Acceso a la API",
          ],
          cta: "Contactar Ventas",
        },
      ],
    },
    ctaSection: {
      title: "Comienza a optimizar tu CV ahora",
      subtitle:
        "Deja que la inteligencia artificial trabaje por ti. Optimiza tu CV hoy y acércate al trabajo de tus sueños.",
      cta: "Crear mi cuenta gratis",
    },
    footer: {
      copy: "© 2025 CVincer. Todos los derechos reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      contact: "Contacto",
    },
  },
  en: {
    auth: {
      login: {
        title: "Sign In",
        email: "Email Address",
        password: "Password",
        submit: "Sign In",
        loading: "Signing in...",
        forgot: "Forgot your password?",
        noAccount: "Don't have an account?",
        signup: "Sign Up",
      },
      signup: {
        title: "Create an account",
        name: "Full Name",
        email: "Email Address",
        password: "Password",
        confirm: "Confirm Password",
        terms: "I accept the Terms and Conditions",
        submit: "Create Free Account",
        loading: "Creating account...",
        hasAccount: "Already have an account?",
        login: "Sign In",
      },
    },
    header: {
      appName: "CVincer",
      login: "Sign In",
      signup: "Sign Up",
      dashboard: "Dashboard",
      logout: "Log Out",
    },
    hero: {
      tag: "Transform Your CV, Accelerate Your Career",
      title:
        "Stop being invisible. Tailor your CV with AI and land the interview.",
      subtitle:
        "Our AI analyzes the job offer and optimizes your resume to capture recruiters' attention. Less effort, more results.",
      cta: "Optimize Your CV for Free",
      secondaryCta: "Start free, no credit card required.",
      socialProof: "Join 1,000+ professionals who already optimized their CV.",
    },
    problem: {
      title: "The problem isn't you, it's how you present yourself",
      subtitle:
        "Excellent candidates are rejected daily due to common, avoidable mistakes.",
      cards: [
        {
          title: "Inefficient Manual Process",
          description:
            "Tailoring your CV for each offer consumes hours and creates doubt. Am I using the right words?",
        },
        {
          title: "ATS Knowledge Gap",
          description:
            "Most don't know how to rewrite achievements to show real impact or optimize for Applicant Tracking Systems (ATS).",
        },
        {
          title: "Lack of Systematic Discipline",
          description:
            "Maintaining an updated master CV and knowing what to highlight for each application requires judgment that only practice provides.",
        },
      ],
    },
    howItWorks: {
      title: "How CVincer works",
      subtitle: "In 4 simple steps, you'll have a CV ready to stand out.",
      steps: [
        {
          title: "Upload Your Documents",
          description:
            "Upload your current CV and paste the job description you want to apply for.",
        },
        {
          title: "AI Analysis",
          description:
            "Our AI identifies the most important keywords, skills, and requirements from the job offer.",
        },
        {
          title: "Magic Optimization",
          description:
            "We rewrite and adapt key sections of your CV for a perfect match with the position.",
        },
        {
          title: "Download and Conquer",
          description:
            "Get your new optimized CV in PDF format, ready to be sent with confidence.",
        },
      ],
    },
    features: {
      title: "Features designed to give you an edge",
      subtitle:
        "Everything you need to make your application stand out from the rest.",
      viability: {
        high: "Available",
        medium: "In Beta",
        low: "Coming Soon",
      },
      items: [
        {
          title: "Intelligent Job Offer Analysis",
          description:
            "The AI extracts key skills, keywords, and requirements from any job description.",
          viability: "high",
        },
        {
          title: "Instant ATS Optimization",
          description:
            "We increase your match score to ensure you pass automated filters.",
          viability: "high",
        },
        {
          title: "Results-Oriented Rewriting",
          description:
            "We transform your responsibilities into quantifiable achievements using the STAR methodology.",
          viability: "high",
        },
        {
          title: "Rapid Version Generation",
          description:
            "Create multiple versions of your CV tailored to different roles with a single click.",
          viability: "medium",
        },
        {
          title: "Pre-submission Scoring & Verification",
          description:
            "Get a score for your CV against the job offer and receive improvement suggestions before sending it.",
          viability: "medium",
        },
        {
          title: "Online Profile Synchronization",
          description:
            "We align your CV with your LinkedIn profile to maintain a consistent professional brand.",
          viability: "low",
        },
      ],
    },
    pricing: {
      title: "Plans for every stage of your career",
      subtitle: "Choose the plan that best fits your needs.",
      badge: "Most Popular",
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: [
            "3 optimizations per month",
            "Basic ATS analysis",
            "PDF export",
          ],
          cta: "Start Free",
        },
        {
          name: "Pro",
          price: "$9.99",
          period: "/month",
          features: [
            "Unlimited optimizations",
            "Advanced ATS analysis",
            "Multiple CV versions",
            "Pre-submission scoring",
            "Premium templates",
          ],
          cta: "Start Free Trial",
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "",
          features: [
            "Everything in Pro",
            "LinkedIn synchronization",
            "Priority support",
            "API access",
          ],
          cta: "Contact Sales",
        },
      ],
    },
    ctaSection: {
      title: "Start optimizing your CV now",
      subtitle:
        "Let artificial intelligence do the work for you. Optimize your CV today and get closer to your dream job.",
      cta: "Create my free account",
    },
    footer: {
      copy: "© 2025 CVincer. All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      contact: "Contact",
    },
  },
};

// ============================================================================
// 📁 contexts/LanguageContext.js
// ============================================================================
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  // NOTE: Per requirement, localStorage logic has been removed.
  // Language state is now held in memory and will reset on refresh.

  const t = useMemo(() => {
    return (key) => {
      const keys = key.split(".");
      let result = translations[language] || translations["es"];
      for (const k of keys) {
        result = result?.[k];
        if (!result) return key;
      }
      return result;
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

// ============================================================================
// 📁 components/ui/Button.jsx (Inspired by shadcn/ui)
// ============================================================================
const buttonVariants = {
  base: "inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-blue-800 text-white hover:bg-blue-800/90 shadow-lg",
      secondary: "bg-amber-400 text-blue-900 hover:bg-amber-400/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      md: "h-10 px-4 py-2 md:h-10 md:px-4 md:py-2",
      lg: "h-12 px-8 rounded-lg text-base",
      cta: "h-14 px-10 rounded-lg text-lg",
      icon: "h-10 w-10",
    },
  },
};

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants.base,
          buttonVariants.variants.variant[variant],
          buttonVariants.variants.size[size],
          className
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// ============================================================================
// 📁 components/ui/Input.jsx & Label.jsx
// ============================================================================
const Input = forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

// ============================================================================
// 📁 components/ui/Card.jsx (Inspired by shadcn/ui)
// ============================================================================
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-xl border bg-white text-card-foreground shadow-lg transition-all",
      className
    )}
    {...props}
  />
);
const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);
const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

// ============================================================================
// 📁 components/common/LanguageToggle.jsx
// ============================================================================
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const FlagES = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3 2"
      width="24"
      height="16"
    >
      <path fill="#C60B1E" d="M0 0h3v2H0z" />
      <path fill="#FFC400" d="M0 .5h3v1H0z" />
    </svg>
  );
  const FlagGB = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      width="24"
      height="12"
    >
      <clipPath id="a">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id="b">
        <path d="M30 15h30v15zv15H0zH0V0h30z" />
      </clipPath>
      <g clipPath="url(#a)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0 0l60 30m0-30L0 30"
          clipPath="url(#b)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );

  return (
    <div className="flex items-center space-x-2 rounded-full border  border-slate-200 p-1">
      <button
        onClick={() => setLanguage("es")}
        className={cn(
          "p-1.5 rounded-full transition-colors",
          language === "es" ? "bg-blue-100 shadow-sm" : "hover:bg-slate-100"
        )}
        aria-label="Switch to Spanish"
      >
        <FlagES />
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "p-1.5 rounded-full transition-colors",
          language === "en" ? "bg-blue-100 shadow-sm" : "hover:bg-slate-100"
        )}
        aria-label="Switch to English"
      >
        <FlagGB />
      </button>
    </div>
  );
};

// ============================================================================
// 📁 components/common/Header.jsx
// ============================================================================
const Header = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openSignup = () => {
    // Logic to open login modal
    router.push("/log");
  };
  return (
    <header className="fixed w-full h-20 flex items-center top-0 bg-white/80 backdrop-blur-lg backdrop-saturate-150 z-40">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-800" />
          <span className="font-bold text-md md:text-xl text-slate-900">
            {t("header.appName")}
          </span>
        </a>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <TextAlignJustify />
        </Button>
      </div>

      {/* Overlay + Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Fondo oscuro */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Menu */}
          <div
            className="relative ml-auto w-[80vw] h-[100vh] bg-white/90 backdrop-blur-lg p-6 flex flex-col space-y-4 transition duration-300"
            onClick={(e) => e.stopPropagation()} // evita cerrar al tocar dentro
          >
            <div className="flex items-center justify-between ml-auto">
              <LanguageToggle />
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <TextAlignJustify />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="md"
              onClick={openSignup}
              className="w-full"
            >
              {t("header.login")}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={openSignup}
              className="w-full"
            >
              {t("header.signup")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

// ============================================================================
// 📁 components/sections/Hero.jsx
// ============================================================================
const Hero = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const openSignup = () => {
    // Logic to open signup modal
    router.push("/log");
  };
  return (
    <section className="bg-slate-50 top-10 md:top-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div className="container mx-auto px-6 py-20 lg:py-32 text-center relative z-10">
        <span className="inline-block bg-amber-400 text-slate-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {t("hero.tag")}
        </span>
        <h1 className="text-4xl lg:text-7xl font-extrabold text-blue-900 leading-tight mb-6 max-w-4xl mx-auto">
          {t("hero.title")}
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Button
            size="cta"
            onClick={openSignup}
            className="shadow-2xl shadow-blue-800/40"
          >
            {t("hero.cta")}
          </Button>
          <p className="text-sm text-slate-500">{t("hero.secondaryCta")}</p>
          <p className="text-sm font-semibold text-slate-600 pt-4">
            {t("hero.socialProof")}
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 📁 components/sections/ProblemStatement.jsx
// ============================================================================
const ProblemStatement = () => {
  const { t } = useLanguage();
  const problems = t("problem.cards");
  const icons = [
    <Zap key="zap" className="h-8 w-8 text-blue-800" />,
    <Search key="search" className="h-8 w-8 text-blue-800" />,
    <Target key="target" className="h-8 w-8 text-blue-800" />,
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("problem.title")}
          </h2>
          <p className="text-md lg:text-lg text-slate-600">
            {t("problem.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-lg border border-slate-200"
            >
              <div className="mb-4 inline-block bg-blue-100 p-3 rounded-full">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-slate-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 📁 components/sections/HowItWorks.jsx (NUEVA SECCIÓN)
// ============================================================================
const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = t("howItWorks.steps");
  const icons = [
    <Upload key="1" className="h-10 w-10 text-blue-800" />,
    <BrainCircuit key="2" className="h-10 w-10 text-blue-800" />,
    <Wand2 key="3" className="h-10 w-10 text-blue-800" />,
    <Download key="4" className="h-10 w-10 text-blue-800" />,
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-slate-600">{t("howItWorks.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 border-8 border-white shadow-md mb-6">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 📁 components/sections/Features.jsx
// ============================================================================
const Features = () => {
  const { t } = useLanguage();
  const features = t("features.items");
  const viabilityClasses = {
    high: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const viabilityTextMap = {
    high: t("features.viability.high"),
    medium: t("features.viability.medium"),
    low: t("features.viability.low"),
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("features.title")}
          </h2>
          <p className="text-lg text-slate-600">{t("features.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 mb-4">{feature.description}</p>
              </div>
              <div>
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full border",
                    viabilityClasses[feature.viability]
                  )}
                >
                  {viabilityTextMap[feature.viability]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 📁 components/sections/Pricing.jsx (NUEVA SECCIÓN)
// ============================================================================
const Pricing = () => {
  const { t } = useLanguage();
  const plans = t("pricing.plans");

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-lg text-slate-600">{t("pricing.subtitle")}</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.name === "Pro"
                  ? "border-2 border-blue-800 relative shadow-blue-800/10"
                  : ""
              )}
            >
              {plan.name === "Pro" && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t("pricing.badge")}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-blue-900">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 text-slate-600 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.name === "Pro" ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 📁 components/sections/CtaSection.jsx
// ============================================================================
const CtaSection = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const openSignup = () => {
    // Logic to open signup modal
    router.push("/log");
  };
  return (
    <section className="bg-blue-800">
      <div className="container mx-auto px-6 py-20 lg:py-24 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto">
          {t("ctaSection.title")}
        </h2>
        <p className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto">
          {t("ctaSection.subtitle")}
        </p>
        <Button size="cta" variant="secondary" onClick={openSignup}>
          {t("ctaSection.cta")}
        </Button>
      </div>
    </section>
  );
};

// ============================================================================
// 📁 components/common/Footer.jsx
// ============================================================================
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-white" />
            <span className="font-semibold text-white">
              {t("header.appName")}
            </span>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.contact")}
            </a>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="text-center text-sm mt-8 border-t border-slate-800 pt-6">
          <p>{t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// 📁 App.jsx (Punto de entrada principal)
// ============================================================================
export default function App() {
  const router = useRouter();
  useEffect(() => {
    try {
      const authToken = localStorage.getItem(
        "sb-bockeheqvteruvwulvhn-auth-token"
      );

      if (authToken) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error checking localStorage auth:", error);
    }
  }, []);
  return (
    <LanguageProvider>
      {/* SEO & Meta Tags (Implementation comment)
            To implement SEO, you would use a library like 'react-helmet' or Next.js's <Head> component here.
            Example:
            <Helmet>
              <title>CVincer | Optimiza tu CV con IA para conseguir más entrevistas</title>
              <meta name="description" content="Una IA que analiza la oferta laboral y optimiza tu currículum para captar la atención de los reclutadores." />
              <meta property="og:title" content="CVincer | Optimiza tu CV con IA" />
            </Helmet>
          */}
      <div className="bg-white font-sans text-slate-800">
        <Header />
        <main>
          <Hero />
          <ProblemStatement />
          <HowItWorks />
          <Features />
          <Pricing />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
