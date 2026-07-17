"use client";

const testimonials = [
  {
    name: "Jesus Alejando",
    role: "Diseñador Freelance",
    text: "Llevaba años buscando una app que no me complicara la vida. Esta es exactamente lo que necesitaba: simple, rápida y con gráficos hermosos.",
    avatar: "👨‍🎨",
  },
  {
    name: "Neicle Hidalgo",
    role: "Estudiante universitaria",
    text: "Por fin puedo ver en dónde se me va el dinero cada mes. Las categorías con colores hacen que todo sea mucho más claro.",
    avatar: "👩‍🎓",
  },
  {
    name: "Jesus Mirena",
    role: "Emprendedor",
    text: "Lo uso tanto para mis finanzas personales como para llevar un control rápido de mi negocio. La mejor inversión de mi tiempo.",
    avatar: "👨‍💼",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">Opiniones</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            La gente <span className="gradient-text">lo ama.</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Miles de personas ya están tomando el control de sus finanzas con
            nuestra plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-card-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl sm:text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-medium text-xs sm:text-sm">{t.name}</p>
                  <p className="text-muted text-[10px] sm:text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
