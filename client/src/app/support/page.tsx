const faqs = [
  {
    q: "Como empiezo a usar la app?",
    a: "Registra una cuenta gratuita, ingresa tus primeras transacciones y el dashboard se actualiza automaticamente. No necesitas configuracion avanzada.",
  },
  {
    q: "Mis datos estan seguros?",
    a: "Si. No conectamos con bancos ni APIs externas. Toda la informacion la ingresas vos y se almacena de forma segura. Tus datos son 100% tuyos.",
  },
  {
    q: "Puedo exportar mis datos?",
    a: "Si, los usuarios del plan Pro pueden exportar todas sus transacciones a CSV en cualquier momento.",
  },
  {
    q: "Funciona en celular?",
    a: "Si. La app esta disenada para funcionar perfectamente en celulares, tablets y computadoras. Solo necesitas un navegador.",
  },
  {
    q: "Cuanto cuesta?",
    a: "Hay un plan gratuito con funciones basicas y un plan Pro por $4.99/mes con funciones avanzadas. Sin costos ocultos.",
  },
  {
    q: "Puedo cancelar en cualquier momento?",
    a: "Si. No hay contratos ni penalizaciones. Cancelas cuando quieras y seguis teniendo acceso hasta que termine el periodo pagado.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">Soporte</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Estamos para <span className="gradient-text">ayudarte.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Encontrá respuestas a las preguntas mas frecuentes o
            contactanos directamente.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-card-border"
            >
              <h3 className="font-semibold text-sm sm:text-base mb-2">{faq.q}</h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center p-8 sm:p-12 rounded-2xl bg-card border border-card-border">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            No encontraste lo que buscabas?
          </h2>
          <p className="text-muted text-sm mb-6 max-w-md mx-auto">
            Escribinos y te respondemos lo antes posible. Estamos
            comprometidos a ayudarte.
          </p>
          <a
            href="mailto:soporte@finanzas.app"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-medium transition-all hover:scale-105"
          >
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  );
}
