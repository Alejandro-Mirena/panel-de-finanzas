"use client";

const tags = [
  { label: "Comida", color: "bg-orange-500/20 text-orange-400" },
  { label: "Transporte", color: "bg-blue-500/20 text-blue-400" },
  { label: "Entretenimiento", color: "bg-pink-500/20 text-pink-400" },
  { label: "Ahorro", color: "bg-green-500/20 text-green-400" },
  { label: "Salario", color: "bg-emerald-500/20 text-emerald-400" },
  { label: "Suscripciones", color: "bg-purple-500/20 text-purple-400" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 py-6 sm:py-10">
          {tags.map((tag, i) => (
            <span
              key={tag.label}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium ${tag.color} ${
                i % 2 === 0 ? "float" : "float-delay"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 animate-fade-in-up">
          Tu dinero, <span className="gradient-text">bellamente</span>{" "}
          organizado.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up animate-delay-1 px-2">
          Registra tus ingresos y gastos, categoriza cada transacción y
          visualiza tu balance en un dashboard diseñado para que todo tenga
          sentido.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up animate-delay-2">
          <a
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-light text-white rounded-xl font-medium transition-all hover:scale-105 glow"
          >
            Comenzar gratis
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-3.5 bg-card hover:bg-card/80 border border-card-border text-foreground rounded-xl font-medium transition-all"
          >
            Ver funciones
          </a>
        </div>

        <div className="mt-12 sm:mt-20 animate-fade-in-up animate-delay-3">
          <div className="relative mx-auto max-w-3xl">
            <div className="gradient-border rounded-2xl overflow-hidden bg-card p-0.5 sm:p-1">
              <div className="bg-background rounded-xl p-4 sm:p-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-card rounded-xl p-3 sm:p-4 border border-card-border">
                    <p className="text-[10px] sm:text-xs text-muted mb-1">Balance</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-400">$12,450</p>
                  </div>
                  <div className="bg-card rounded-xl p-3 sm:p-4 border border-card-border">
                    <p className="text-[10px] sm:text-xs text-muted mb-1">Ingresos</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-400">$8,200</p>
                  </div>
                  <div className="bg-card rounded-xl p-3 sm:p-4 border border-card-border">
                    <p className="text-[10px] sm:text-xs text-muted mb-1">Gastos</p>
                    <p className="text-lg sm:text-2xl font-bold text-red-400">$5,750</p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: "Supermercado", amount: "-$85.000", cat: "Comida", color: "bg-orange-500", icon: "🍔" },
                    { name: "Uber", amount: "-$12.500", cat: "Transporte", color: "bg-blue-500", icon: "🚗" },
                    { name: "Netflix", amount: "-$8.990", cat: "Entretenimiento", color: "bg-pink-500", icon: "🎬" },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center justify-between p-2.5 sm:p-3 bg-background rounded-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 ${t.color} rounded-full flex items-center justify-center text-xs sm:text-sm`}>
                          {t.icon}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium">{t.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted">{t.cat}</p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-red-400">{t.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
