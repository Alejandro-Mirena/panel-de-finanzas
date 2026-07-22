export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Terminos de Servicio
          </h1>
          <p className="text-muted text-sm">
            Ultima actualizacion: 22 de julio de 2026
          </p>
        </div>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              1. Aceptacion de terminos
            </h2>
            <p>
              Al acceder y usar Finanzas, aceptas estos terminos de servicio. Si
              no estas de acuerdo con alguno de ellos, no uses la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              2. Descripcion del servicio
            </h2>
            <p>
              Finanzas es una plataforma de gestion de finanzas personales que
              permite a los usuarios registrar ingresos y gastos, categorizar
              transacciones y visualizar estadisticas a traves de un dashboard.
              El servicio se provee tal cual esta, sin garantias de
              disponibilidad ininterrumpida.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              3. Cuentas de usuario
            </h2>
            <p>
              Para usar el servicio necesitas crear una cuenta. Tu eres
              responsable de mantener la confidencialidad de tu contraseña y de
              toda actividad que ocurra en tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              4. Uso aceptable
            </h2>
            <p>Te comprometes a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>No usar la plataforma para fines ilegales</li>
              <li>No intentar acceder a cuentas de otros usuarios</li>
              <li>
                No sobrecargar ni sabotear la infraestructura del servicio
              </li>
              <li>
                No reproducir o distribuir el contenido de la plataforma sin
                autorizacion
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              5. Planes y pagos
            </h2>
            <p>
              El servicio ofrece un plan gratuito y un plan de pago (Pro). Los
              precios del plan Pro estan publicados en la seccion de precios.
              Los pagos se procesan de forma segura y podes cancelar en
              cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              6. Propiedad intelectual
            </h2>
            <p>
              Todo el contenido, codigo fuente, diseños y logos de Finanzas son
              propiedad exclusiva del equipo de desarrollo. No esta permitido
              copiar, modificar o distribuir ningun elemento sin autorizacion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              7. Limitacion de responsabilidad
            </h2>
            <p>
              Finanzas no se hace responsable por perdidas financieras,
              decisiones tomadas basadas en las estadisticas mostradas, o
              interrupciones del servicio. La herramienta es de apoyo y no
              reemplaza el asesoramiento financiero profesional.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              8. Cancelacion
            </h2>
            <p>
              Puedes cancelar tu cuenta en cualquier momento desde la
              configuracion. Al cancelar, tus datos seran eliminados
              permanentemente en un plazo de 30 dias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              9. Cambios en los terminos
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos terminos en cualquier
              momento. Los cambios importantes seran notificados por email con
              al menos 7 dias de anticipacion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
