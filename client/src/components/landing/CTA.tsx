"use client";

export default function CTA() {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20" />
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
              Gana <span className="gradient-text">paz mental</span> con tu
              dinero.
            </h2>
            <p className="text-muted text-sm sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8">
              Empieza a organizar tus finanzas hoy. Es gratis, es simple, y en
              minutos vas a entender en dónde va tu dinero.
            </p>
            <a
              href="/register"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-primary hover:bg-primary-light text-white rounded-xl font-medium transition-all hover:scale-105 glow text-base sm:text-lg"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
