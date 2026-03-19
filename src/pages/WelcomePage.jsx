import { useNavigate } from "react-router-dom";
// Importación necesaria para el scroll suave
// importamos el navhash para la navegacion
import { NavHashLink } from "react-router-hash-link";
import { Sparkles, Zap, Search, BookOpen } from "lucide-react";
// importamos el lucidereact
{/* SECCION PRINCIPAL DEL WELCOMEPAGE */}
function WelcomePage() {
  return (
    // Se añade scroll-smooth
    <div className="min-h-screen bg-pika-yellowLight scroll-smooth">
      <Navbar />
      {/* SECCION PRINCIPALES DEL WELCOMEPAGE */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
// Se usa los colores de pikachu para la pagina de bienvenida
{/* SECCION navbar */}
function Navbar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Inicio", to: "#inicio" },
    { name: "Características", to: "#caracteristicas" },
    { name: "Acerca de", to: "#acerca" },
  ];
// inicializamos las secciones de inicio, caracteristicas y acerca de 
  return (
    <nav className="bg-pika-yellow/90 backdrop-blur shadow-sm px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 h-16">
      {/* Logo */}
      <NavHashLink smooth to="#inicio" className="flex items-center gap-2">
        <img src="/pokebola.png" alt="PokéApp Logo" className="w-8 h-8 object-contain" />
        <span className="font-bold text-pika-dark text-xl">PokéApp</span>
      </NavHashLink>
      {/* Enlaces de Escritorio */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavHashLink
            key={link.to}
            smooth
            to={link.to}
            className="text-pika-dark font-semibold hover:text-pika-brown transition-colors duration-200"
          >
            {link.name}
          </NavHashLink>
        ))}
      </div>

      {/* Botón CTA - de explorar */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 bg-pika-dark text-pika-yellow font-bold px-6 py-2 rounded-xl hover:bg-pika-dark/90 transition-all shadow-sm active:scale-95"
      >
        Explorar →
      </button>
    </nav>
  );
}

{/* SECCION INICIO DEL HERO */}
function HeroSection() {
  const navigate = useNavigate();
  {/* CABECERA */}
  return (
    <section
      id="inicio"
      // Se ajusta pt-24 para compensar el navbar sticky
    
      className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-24 py-16 pt-24 gap-10"
    >
      <div className="flex flex-col gap-6 max-w-lg text-center lg:text-left items-center lg:items-start">
        <h1 className="text-5xl md:text-7xl font-bold text-pika-dark leading-tight">
          Explora el mundo
          <span className="text-pika-brown"> Pokémon</span>
        </h1>

        <p className="text-pika-brown text-lg max-w-md">
          Busca, descubre y conoce a todos tus pokémon favoritos. Tu pokédex digital te espera.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center gap-2 bg-pika-yellow text-pika-dark font-bold text-lg px-8 py-3 rounded-2xl hover:bg-pika-yellowDark transition-all shadow-lg active:scale-95"
          >
            <Sparkles size={22} />
            ¡Comenzar!
          </button>

          <NavHashLink
            smooth
            to="#caracteristicas"
            className="flex items-center justify-center gap-2 border-2 border-pika-brown text-pika-brown font-bold text-lg px-8 py-3 rounded-2xl hover:bg-pika-brown hover:text-white transition-all"
          >
            Ver más
          </NavHashLink>
        </div>
      </div>

      <img
        src="/pikachu.png"
        alt="Pikachu saludando felizmente"
        className="w-64 md:w-80 lg:w-[400px] object-contain animate-fade-in" // añadido un tamaño extra grande opcional y animación sutil
      />
    </section>
  );
}

{/* SECCION CARACTERISTICAS */}
function FeaturesSection() {
  const features = [
    {
      icon: <Search size={32} />,
      title: "Búsqueda Fonética",
      text: "Encuentra cualquier pokémon escribiendo solo parte de su nombre, incluso si te equivocas.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Vista Detallada",
      text: "Consulta estadísticas base, habilidades, tipos, evoluciones, altura y peso.",
    },
    {
      icon: <Zap size={32} />,
      title: "Rápido y Moderno",
      text: "Navegación instantánea y datos siempre actualizados gracias a React Query.",
    },
  ];

  return (
    <section
      id="caracteristicas"
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 lg:px-24 py-24 gap-16"
    >
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-pika-dark mb-4">
          Características Principales
        </h2>
        <p className="text-pika-brown text-lg">
          Diseñado para entrenadores exigentes que buscan información rápida y precisa.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

{/* SECCION TARJETA CARACTERISTICAS */}
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-pika-yellowLight border-2 border-pika-yellow/50 rounded-2xl p-8 flex flex-col items-center gap-5 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="bg-pika-yellow p-4 rounded-full text-pika-dark shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-pika-dark">{title}</h3>
      <p className="text-pika-brown leading-relaxed">{text}</p>
    </div>
  );
}

{/* SECCION ACERCA DE */}
function AboutSection() {
  const navigate = useNavigate();
// uso de las tecnologias principales
  const technologies = [
    "React Query",
    "Tailwind CSS",
    "Zod",
    "Lucide React",
    "Vite",
  ];

  return (
    <section
      id="acerca"
      className="min-h-screen bg-pika-yellowLight flex flex-col items-center justify-center px-6 lg:px-24 py-24 gap-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-pika-dark">Acerca del Proyecto</h2>

      <div className="bg-white border-2 border-pika-yellow/50 rounded-3xl shadow-xl max-w-2xl w-full p-10 md:p-14 flex flex-col items-center gap-8 text-center transition-all hover:border-pika-yellow">
        
        {/* SE DETALLA MEJOR LA POLKEBOLA CONVIRITIENDOLA EN ICONO PARA EL NAVBAR*/}
        <img src="/pokebola.png" alt="Pokébola Icono" className="w-16 h-16 object-contain" />

        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-pika-dark">PokéApp - Devdatep</h3>
          <p className="text-pika-dark/60 font-medium">Versión 3.0</p>
        </div>

        <p className="text-pika-brown text-lg leading-relaxed max-w-md">
          Esta aplicación fue desarrollada como una prueba técnica para <strong>Devdatep</strong>.
        </p>

        <div className="flex flex-wrap gap-2.5 justify-center">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-pika-yellowLight border border-pika-yellow text-pika-dark text-sm px-4 py-1.5 rounded-full font-semibold shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2.5 bg-pika-yellow text-pika-dark font-bold px-10 py-3.5 rounded-2xl hover:bg-pika-yellowDark transition-all shadow-lg active:scale-95 mt-4"
        >
          <Sparkles size={20} />
          ¡Probar la App ahora!
        </button>
      </div>
    </section>
  );
}

{/* SECCION FOOTER */}
function Footer() {
    return (
        <footer className="bg-pika-dark text-pika-yellowLight px-6 py-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex items-center gap-2">
                    <img src="/pokebola.png" alt="PokéApp Logo" className="w-8 h-8 object-contain" />
                    <p className="font-semibold">&copy; {new Date().getFullYear()} PokéApp Devdatep.</p>
                </div>
                <p className="flex items-center gap-1.5 text-sm">
                    Prueba Tecnica de Devdatep
                </p>
            </div>
        </footer>
    );
}

// animacion del keyframes
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }
`;
document.head.appendChild(styleTag);


export default WelcomePage;