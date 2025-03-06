import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, Scale, Building } from 'lucide-react';
import NewsAndEvents from '../components/sections/NewsAndEvents';
import Engagement from '../components/sections/Engagement';
import { cn } from '../utils/cn';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const images = [
    "https://iili.io/2pa5hRn.png",
    "https://iili.io/2paYBCx.png",
    "https://iili.io/2paYUue.png"
  ];

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        };
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded.every(Boolean)) return;

    const interval = setInterval(() => {
      setCurrentImage((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 bg-purple-200/50 animate-pulse rounded-lg"></div>
  );

  const programs = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Capacita PcD",
      description: "Capacitamos pessoas com deficiência e neurodivergentes para o mercado de trabalho.",
      link: "/octo-faz/capacita-pcd"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Cuida PcD",
      description: "Indicamos profissionais de saúde e psicoterapia acessíveis.",
      link: "/octo-faz/cuida-pcd"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Orienta PcD",
      description: "Oferecemos orientação jurídica para garantir seus direitos.",
      link: "/octo-faz/orienta-pcd"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Capacita Empresas",
      description: "Assessoramos empresas na implementação de práticas inclusivas.",
      link: "/octo-faz/capacita-empresas"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[563px] bg-[#972ae6] relative overflow-hidden">
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Content */}
            <div className="w-[520px] flex flex-col gap-6">
              <h1 className="text-[44px] font-bold text-white leading-[1.2]">
                Aqui, cada tentáculo nos conecta a um mundo mais acessível e humano
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-[460px]">
                Somos uma organização dedicada a capacitar pessoas com deficiências ocultas e neurodivergentes, promovendo inclusão social, cultural e profissional.
              </p>
              <div className="mt-2">
                <Link 
                  to="/octo-faz"
                  className="inline-flex items-center px-8 py-3 rounded-full bg-white text-[#972ae6] text-base font-semibold
                    hover:bg-[#e8b624] hover:text-white transition-all duration-300 
                    transform hover:-translate-y-1 active:translate-y-0
                    shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Conheça nossos projetos
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-[480px] h-[480px] flex items-center justify-center">
              {!imagesLoaded.every(Boolean) && <LoadingPlaceholder />}
              {images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`OCTO Hero ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={cn(
                    "absolute w-full h-full object-contain",
                    "transition-opacity duration-1000 ease-in-out",
                    currentImage === index && imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left Image */}
            <div className="relative">
              <img
                src="https://iili.io/2plh9ae.jpg"
                alt="OCTO Quem Somos"
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Right Content */}
            <div className="max-w-xl">
              <h2 className="text-[56px] font-bold text-[#972ae6] mb-8">
                Quem Somos?
              </h2>
              <p className="text-lg text-[#972ae6] leading-relaxed mb-12">
                A OCTO é uma organização dedicada a capacitar pessoas com deficiências ocultas e neurodivergentes, promovendo inclusão social, cultural e profissional. Acreditamos que a diversidade é uma força transformadora.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/somos-octo"
                  className="px-8 py-4 rounded-full border-2 border-[#e8b624] text-[#e8b624] text-lg font-bold hover:bg-[#e8b624] hover:text-white transition-all duration-300"
                >
                  Nossa Missão
                </Link>
                <Link 
                  to="/somos-octo"
                  className="px-8 py-4 rounded-full border-2 border-[#e8b624] text-[#e8b624] text-lg font-bold hover:bg-[#e8b624] hover:text-white transition-all duration-300"
                >
                  Nossa Equipe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Fazemos Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://iili.io/2plEn3b.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#f0465d] opacity-90" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-[56px] font-bold text-white mb-8">O Que Fazemos</h2>
            <p className="text-xl text-white/90">
              A OCTO atua em diversas frentes para promover inclusão e acessibilidade. Conheça nossos programas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Link
                key={index}
                to={program.link}
                className={`
                  group relative overflow-hidden rounded-xl
                  transition-all duration-300 ease-out
                  bg-white/10 backdrop-blur-sm
                  md3-elevation-1
                  hover:md3-elevation-2
                  active:md3-elevation-3
                  md3-state-layer-opacity-hover
                  md3-state-layer-opacity-pressed
                  animate-slide-in
                  ${hoveredCard === index ? 'z-10' : 'z-0'}
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Content */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-white transform transition-transform duration-300 group-hover:scale-110">
                      {program.icon}
                    </div>
                    <h3 className="text-base font-medium text-white transform transition-transform duration-300 group-hover:translate-x-1">
                      {program.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <p className="text-sm text-white/90 mb-6 flex-grow transition-opacity duration-300 group-hover:text-white">
                    {program.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <span className="inline-block px-4 py-2 rounded-full border border-white text-white text-sm font-medium
                      hover:bg-white/10 transition-all duration-300">
                      Saiba mais
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <NewsAndEvents />

      {/* Engagement Section */}
      <Engagement />
    </div>
  );
};

export default Home;