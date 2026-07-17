"use client";

const plans = [
  {
    name: "Gratis",
    price: "$0",
    period: "para siempre",
    description: "Perfecto para empezar a organizar tus finanzas.",
    features: [
      "Dashboard completo",
      "Hasta 50 transacciones/mes",
      "3 categorías personalizadas",
      "Gráficos básicos",
    ],
    cta: "Comenzar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/mes",
    description: "Para quienes quieren ir al siguiente nivel.",
    features: [
      "Transacciones ilimitadas",
      "Categorías ilimitadas",
      "Exportar datos a CSV",
      "Filtros avanzados",
      "Soporte prioritario",
      "Sin anuncios",
    ],
    cta: "Empezar prueba gratis",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-150 h-75 sm:h-150 bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">Precios</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Simple y <span className="gradient-text">transparente.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Sin costos ocultos. Elegí el plan que mejor se adapte a lo que
            necesitás.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "bg-card border-primary/50 glow"
                  : "bg-card border-card-border hover:border-card-border/80"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  Más popular
                </span>
              )}

              <h3 className="text-lg sm:text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                <span className="text-muted text-xs sm:text-sm">{plan.period}</span>
              </div>
              <p className="text-muted text-xs sm:text-sm mb-5 sm:mb-6">{plan.description}</p>

              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/register"
                className={`block w-full text-center py-2.5 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary-light text-white"
                    : "bg-background hover:bg-card border border-card-border"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
