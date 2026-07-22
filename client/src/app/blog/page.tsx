const posts = [
  {
    title: "5 consejos para ahorrar dinero cada mes",
    excerpt: "Pequenos habitos que marcan la diferencia al final del mes. Desde automatizar ahorros hasta revisar suscripciones olvidadas.",
    date: "15 Jul 2026",
    category: "Ahorro",
    readTime: "4 min",
  },
  {
    title: "Como categorizar tus gastos sin volverte loco",
    excerpt: "Una guia practica para crear categorias que tengan sentido para tu vida real, sin complicarte con clasificaciones excesivas.",
    date: "10 Jul 2026",
    category: "Guia",
    readTime: "6 min",
  },
  {
    title: "El metodo 50/30/20 explicado simple",
    excerpt: "Regla clasica de presupuesto adaptada a la realidad actual. Si funciona para principiantes y para quienes ya tienen experiencia.",
    date: "5 Jul 2026",
    category: "Educacion",
    readTime: "5 min",
  },
  {
    title: "Por que necesitas un dashboard de finanzas",
    excerpt: "Tener tus numeros en un solo lugar cambia la forma en que tomas decisiones. Te explicamos por que vale la pena.",
    date: "1 Jul 2026",
    category: "Producto",
    readTime: "3 min",
  },
  {
    title: "Suscripciones fantasma: el gasto invisible",
    excerpt: "Esas apps que pagas y no usas estan comiendo tu presupuesto. Como detectarlas y eliminarlas en 10 minutos.",
    date: "25 Jun 2026",
    category: "Ahorro",
    readTime: "4 min",
  },
  {
    title: "Graficos de finanzas: que mirar y que ignorar",
    excerpt: "No todos los numeros importan igual. Te ensenamos a leer tus graficos para tomar mejores decisiones.",
    date: "20 Jun 2026",
    category: "Guia",
    readTime: "5 min",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary text-sm font-medium mb-4">Blog</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Noticias y <span className="gradient-text">consejos.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Articulos sobre finanzas personales, ahorro y consejos para
            sacarle el maximo provecho a tu dinero.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group p-5 sm:p-6 rounded-2xl bg-card border border-card-border hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-primary/15 text-primary text-[10px] sm:text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-muted text-[10px] sm:text-xs">{post.date}</span>
                <span className="text-muted text-[10px] sm:text-xs">· {post.readTime}</span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted text-xs sm:text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 text-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Leer mas →
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
