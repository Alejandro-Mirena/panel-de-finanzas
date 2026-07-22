export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">
            Sobre nosotros
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Simplificamos tus{" "}
            <span className="gradient-text">finanzas personales.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Creemos que entender tu dinero no deberia ser complicado.
            Construimos herramientas que hacen que organizar tus finanzas sea
            rapido, claro y hasta satisfactorio.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Nuestra mision
            </h2>
            <p className="text-muted leading-relaxed">
              Nacimos de una frustration simple: las apps de finanzas son
              demasiado complicadas o demasiado basicas. Queriamos crear algo en
              el medio: un dashboard limpio, rapido y util, donde cada persona
              pueda ver exactamente donde va su dinero sin necesitar un titulo
              en contabilidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Lo que nos mueve
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <div className="text-3xl mb-3">透明</div>
                <h3 className="font-semibold mb-2">Transparencia</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Sin costos ocultos, sin publicidad, sin vender tus datos. Tu
                  informacion es tuya y se queda en tu dispositivo.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Simplicidad</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Cada funcion esta disenada para hacer tu vida mas facil, no
                  mas complicada. Si algo no suma, no esta.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold mb-2">Diseño</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Creemos que las cosas bien hechas se disfrutan mas. Por eso
                  invertimos en un diseño que hace que usar la app sea una
                  experiencia agradable.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold mb-2">Privacidad</h3>
                <p className="text-muted text-sm leading-relaxed">
                  No conectamos con bancos ni APIs externas. Vos decides que
                  ingresas. Tus finanzas son solo tuyas.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Detras del proyecto</h2>
            <p className="text-muted leading-relaxed mb-6">
              Finanzas es un proyecto personal creado por Jesus Alejandro.
              Nacio de la necesidad de tener una herramienta simple, bonita y
              funcional para manejar finanzas personales sin depender de apps
              complicadas o conectarse a bancos.
            </p>
            <div className="flex justify-center">
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-card-border text-center max-w-sm w-full">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-4xl mb-4">
                  👨‍💻
                </div>
                <p className="font-semibold text-base mb-1">Jesus Alejandro</p>
                <p className="text-primary text-sm mb-3">Creador y desarrollador</p>
                <p className="text-muted text-xs leading-relaxed">
                  Disenador, desarrollador y usuario de la propia app.
                  Cada funcion esta pensada desde la experiencia real de
                  usarla todos los dias.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
