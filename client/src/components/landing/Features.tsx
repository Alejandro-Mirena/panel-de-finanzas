"use client";

const features = [
  {
    icon: "📊",
    title: "Dashboard intuitivo",
    description:
      "Visualiza tu balance, ingresos y gastos de un vistazo. Todo diseñado para que entiendas tu situación financiera en segundos.",
  },
  {
    icon: "🏷️",
    title: "Categorización inteligente",
    description:
      "Asigna categorías como comida, transporte o entretenimiento. Colores e íconos para que nunca pierdas el hilo.",
  },
  {
    icon: "📈",
    title: "Gráficos que hablan",
    description:
      "Gráfico de dona por categoría y tendencia mensual con Recharts. Datos visuales que te ayudan a tomar mejores decisiones.",
  },
  {
    icon: "🔍",
    title: "Filtros por fecha",
    description:
      "Busca transacciones por rango de fechas, categoría o monto. Encuentra lo que necesitas al instante.",
  },
  {
    icon: "🔒",
    title: "Privacidad primero",
    description:
      "Sin conexiones bancarias ni APIs externas. Tu controlas que ingresas. Tus datos son 100% tuyos.",
  },
  {
    icon: "⚡",
    title: "Rápido y simple",
    description:
      "Registra una transacción en segundos. Sin formularios interminables ni pasos innecesarios.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">Funciones</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Todo lo que necesitas,{" "}
            <span className="gradient-text">nada que no.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Herramientas pensadas para que manejes tus finanzas personales sin
            complicaciones. Simple por fuera, potente por dentro.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group p-5 sm:p-6 rounded-2xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animate-delay-${
                i + 1
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{f.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
