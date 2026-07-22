export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Politica de Privacidad</h1>
          <p className="text-muted text-sm">Ultima actualizacion: 22 de julio de 2026</p>
        </div>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Informacion que recopilamos</h2>
            <p>
              Recopilamos unicamente la informacion que vos proporcionas
              voluntariamente al usar nuestra plataforma. Esto incluye:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Datos de registro (nombre, email)</li>
              <li>Transacciones que cargas manualmente (montos, fechas, categorias)</li>
              <li>Preferencias de configuracion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Como usamos tu informacion</h2>
            <p>
              Utilizamos tu informacion exclusivamente para:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Proveer y mejorar el servicio</li>
              <li>Mostrarte estadisticas y graficos personalizados</li>
              <li>Comunicarnos contigo sobre tu cuenta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Proteccion de datos</h2>
            <p>
              Tus datos se almacenan en servidores seguros con encriptacion.
              No tenemos acceso a tus cuentas bancarias porque no nos
              conectamos con entidades financieras. Toda la informacion
              financiera es ingresada manualmente por vos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Comparticion de datos</h2>
            <p>
              No vendemos, alquilamos ni compartimos tu informacion con
              terceros. Tu datos son exclusivamente tuyos y no se utilizan
              con fines publicitarios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              Utilizamos cookies estrictamente necesarias para el
              funcionamiento de la plataforma. No usamos cookies de
              rastreo ni publicitarias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Tus derechos</h2>
            <p>
              Podes solicitar acceso, correccion o eliminacion de tus datos
              personales en cualquier momento escribiendone a
              privacidad@finanzas.app. Responderemos en un plazo de 48
              horas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Cambios en esta politica</h2>
            <p>
              Nos reservamos el derecho de actualizar esta politica de
              privacidad. Cada cambio sera notificado por email a los
              usuarios registrados.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
