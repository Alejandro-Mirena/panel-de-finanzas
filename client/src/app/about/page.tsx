export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">Sobre nosotros</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Simplificamos tus <span className="gradient-text">finanzas personales.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Creemos que entender tu dinero no deberia ser complicado.
            Construimos herramientas que hacen que organizar tus finanzas sea
            rapido, claro y hasta satisfactorio.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Nuestra mision</h2>
            <p className="text-muted leading-relaxed">
              Nacimos de una frustration simple: las apps de finanzas son
              demasiado complicadas o demasiado basicas. Queriamos crear algo
              en el medio: un dashboard limpio, rapido y util, donde cada
              persona pueda ver exactamente donde va su dinero sin necesitar
              un titulo en contabilidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Lo que nos mueve</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <div className="text-3xl mb-3">透明</div>
                <h3 className="font-semibold mb-2">Transparencia</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Sin costos ocultos, sin publicidad, sin vender tus datos.
                  Tu informacion es tuya y se queda en tu dispositivo.
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
                <h3 className="font-semibold mb-2">Diseno</h3>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">El equipo</h2>
            <p className="text-muted leading-relaxed mb-6">
              Somos un equipo pequeno de desarrolladores y disenadores
              apasionados por crear herramientas que importan. Cada linea de
              codigo, cada pixel, cada decision de diseno esta pensada para
              que tu experiencia sea la mejor posible.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { name: "Jesus Alejandro", role: "Desarrollador Full Stack", avatar: "👨‍💻" },
                { name: "Neicle Hidalgo", role: "Diseñadora UI/UX", avatar: "👩‍🎨" },
                { name: "Jesus Mirena", role: "Desarrollador Backend", avatar: "👨‍💻" },
              ].map((m) => (
                <div key={m.name} className="p-5 rounded-2xl bg-card border border-card-border text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-3xl mb-3">
                    {m.avatar}
                  </div>
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-muted text-xs">{m.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
