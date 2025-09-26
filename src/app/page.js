"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

// --- UTILS ---
// Helper for combining Tailwind classes conditionally
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- CONSTANTS & TRANSLATIONS ---
const translations = {
  es: {
    header: {
      appName: "CV Optimizer AI",
      cta: "Empezar ahora",
    },
    hero: {
      tag: "Transforma tu CV, acelera tu carrera",
      title:
        "Deja de ser ignorado. Adapta tu CV con IA y consigue la entrevista.",
      subtitle:
        "Nuestra IA analiza la oferta laboral y optimiza tu currículum para pasar los filtros ATS y captar la atención de los reclutadores. Menos esfuerzo, más resultados.",
      cta: "Optimiza tu CV gratis",
    },
    problem: {
      title: "El problema no eres tú, es cómo te presentas",
      subtitle:
        "Candidatos excelentes son descartados a diario por errores comunes que se pueden evitar.",
      cards: [
        {
          title: "Proceso Manual Ineficiente",
          description:
            "Adaptar tu CV para cada oferta consume horas y genera dudas. ¿Estaré usando las palabras correctas? ¿Es el formato adecuado?",
        },
        {
          title: "Brecha de Conocimiento",
          description:
            "La mayoría de profesionales no saben cómo reescribir sus logros para demostrar impacto real o cómo optimizar para los sistemas de seguimiento (ATS).",
        },
        {
          title: "Falta de Disciplina Sistemática",
          description:
            "Mantener un CV maestro actualizado y saber qué cortar o resaltar para cada aplicación específica requiere un criterio que solo la práctica constante puede dar.",
        },
      ],
    },
    solution: {
      title: "La solución: Tu asistente de carrera personal, impulsado por IA",
      subtitle:
        "Analizamos, reescribimos y optimizamos tu CV en segundos, no en horas.",
      cta: "Ver cómo funciona",
    },
    features: {
      title: "Funcionalidades diseñadas para darte una ventaja",
      subtitle:
        "Todo lo que necesitas para que tu aplicación destaque del resto.",
      viability: {
        high: "Alta Viabilidad",
        medium: "Viabilidad Media",
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
            "Aumentamos tu puntuación de compatibilidad (match score) para asegurar que pases los filtros automáticos.",
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
    ctaSection: {
      title: "¿Listo para recibir más llamadas a entrevistas?",
      subtitle:
        "Deja que la inteligencia artificial trabaje por ti. Optimiza tu CV hoy y acércate al trabajo de tus sueños.",
      cta: "Empezar gratis",
    },
    footer: {
      copy: "© 2024 CV Optimizer AI. Todos los derechos reservados.",
    },
  },
  en: {
    header: {
      appName: "CV Optimizer AI",
      cta: "Get Started Now",
    },
    hero: {
      tag: "Transform Your CV, Accelerate Your Career",
      title:
        "Stop being ignored. Tailor your CV with AI and land the interview.",
      subtitle:
        "Our AI analyzes the job offer and optimizes your resume to pass ATS filters and capture recruiters' attention. Less effort, more results.",
      cta: "Optimize Your CV for Free",
    },
    problem: {
      title: "The problem isn't you, it's how you present yourself",
      subtitle:
        "Excellent candidates are rejected daily due to common, avoidable mistakes.",
      cards: [
        {
          title: "Inefficient Manual Process",
          description:
            "Tailoring your CV for each offer consumes hours and creates doubt. Am I using the right words? Is the format correct?",
        },
        {
          title: "Knowledge Gap",
          description:
            "Most professionals don't know how to rewrite their achievements to show real impact or how to optimize for Applicant Tracking Systems (ATS).",
        },
        {
          title: "Lack of Systematic Discipline",
          description:
            "Maintaining an updated master CV and knowing what to cut or highlight for each specific application requires judgment that only constant practice can provide.",
        },
      ],
    },
    solution: {
      title: "The Solution: Your personal career assistant, powered by AI",
      subtitle:
        "We analyze, rewrite, and optimize your CV in seconds, not hours.",
      cta: "See how it works",
    },
    features: {
      title: "Features designed to give you an edge",
      subtitle:
        "Everything you need to make your application stand out from the rest.",
      viability: {
        high: "High Viability",
        medium: "Medium Viability",
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
    ctaSection: {
      title: "Ready to get more interview calls?",
      subtitle:
        "Let artificial intelligence do the work for you. Optimize your CV today and get closer to your dream job.",
      cta: "Get Started for Free",
    },
    footer: {
      copy: "© 2024 CV Optimizer AI. All rights reserved.",
    },
  },
};

// --- HOOKS & CONTEXT ---
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const storedLang = localStorage.getItem("cv-optimizer-lang");
    if (storedLang && (storedLang === "es" || storedLang === "en")) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("cv-optimizer-lang", lang);
  };

  const t = useMemo(() => {
    return (key) => {
      const keys = key.split(".");
      let result = translations[language];
      for (const k of keys) {
        result = result[k];
        if (!result) {
          return key;
        }
      }
      return result;
    };
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

// --- ICONS (inlined react-icons) ---
const IconSpinner = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

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

const CheckCircleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ZapIcon = ({ className }) => (
  <svg
    key="hi"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TargetIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// --- COMPONENTS/UI ---
/**
 * Button Component (mimics shadcn/ui)
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - The variant of the button.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - The size of the button.
 * @param {'blue'|'gold'} [props.color='blue'] - The color scheme of the button.
 * @param {React.ReactNode} [props.icon] - Icon element to display.
 * @param {'left'|'right'} [props.iconPosition='left'] - Position of the icon.
 * @param {boolean} [props.loading=false] - If true, shows a loading spinner.
 * @param {boolean} [props.disabled=false] - If true, disables the button.
 * @param {boolean} [props.fullWidth=false] - If true, the button takes up the full width of its container.
 * @param {function} [props.onClick] - Click event handler.
 * @param {React.ReactNode} props.children - The content of the button.
 */

const Button = ({
  variant = "primary",
  size = "md",
  color = "blue",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: {
      blue: "bg-blue-800 text-white hover:bg-blue-700 focus:ring-blue-500",
      gold: "bg-amber-500 text-slate-900 hover:bg-amber-400 focus:ring-amber-500",
    },
    secondary: {
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500",
      gold: "bg-amber-100 text-amber-800 hover:bg-amber-200 focus:ring-amber-500",
    },
    outline: {
      blue: "border border-blue-800 text-blue-800 hover:bg-blue-50 focus:ring-blue-500",
      gold: "border border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
    },
    ghost: {
      blue: "text-blue-800 hover:bg-blue-100 focus:ring-blue-500",
      gold: "text-amber-600 hover:bg-amber-100 focus:ring-amber-500",
    },
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const isDisabled = loading || disabled;

  const classes = cn(
    baseClasses,
    variantClasses[variant][color],
    sizeClasses[size],
    fullWidth && "w-full",
    isDisabled && "opacity-60 cursor-not-allowed"
  );

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      {...props}
    >
      {loading && <IconSpinner className="mr-2 h-5 w-5" />}
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};
 

// --- COMPONENTS/COMMON ---
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 rounded-full border border-slate-200 p-1">
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

const Header = () => {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-50 border-b border-slate-200">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TargetIcon className="h-8 w-8 text-blue-800" />
          <span className="font-bold text-xl text-slate-900">
            {t("header.appName")}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <Button size="sm">
            {t("header.cta")}
          </Button>
        </div>
      </div>
    </header>
  );
};

// --- COMPONENTS/SECTIONS ---
const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-6 py-20 lg:py-32 text-center">
        <span className="inline-block bg-amber-300 text-amber-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {t("hero.tag")}
        </span>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-6 max-w-4xl mx-auto">
          {t("hero.title")}
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
          {t("hero.subtitle")}
        </p>
        <Button size="xl" color="blue">
          {t("hero.cta")}
        </Button>
      </div>
    </section>
  );
};

const ProblemStatement = () => {
  const { t } = useLanguage();
  const problems = t("problem.cards");

  const icons = [
    <ZapIcon key="zap" className="h-8 w-8 text-blue-800" />,
    <SearchIcon key="search" className="h-8 w-8 text-blue-800" />,
    <TargetIcon key="target" className="h-8 w-8 text-blue-800" />,
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {t("problem.title")}
          </h2>
          <p className="text-lg text-slate-600">{t("problem.subtitle")}</p>
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
    <section className="py-20 lg:py-28 bg-slate-50">
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
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

const CtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-blue-800">
      <div className="container mx-auto px-6 py-20 lg:py-24 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto">
          {t("ctaSection.title")}
        </h2>
        <p className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto">
          {t("ctaSection.subtitle")}
        </p>
        <Button size="xl" color="gold">
          {t("ctaSection.cta")}
        </Button>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-6 py-6 text-center">
        <p>{t("footer.copy")}</p>
      </div>
    </footer>
  );
};

// --- App.jsx ---
export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-white font-sans">
        <Header />
        <main>
          <Hero />
          <ProblemStatement />
          <Features />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
