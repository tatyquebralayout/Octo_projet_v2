import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NewsAndEvents from '../components/sections/NewsAndEvents';
import Engagement from '../components/sections/Engagement';
import { cn } from '../utils/cn';
import { useIntersectionObserver } from '../design-system/utils/hooks';
import { Icon } from '../components/ui/Icon';
import { Loading } from '../design-system/components/ui';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroVisible = useIntersectionObserver(heroRef, { threshold: 0.1 });
  
  const images = [
    {
      src: "https://iili.io/2pa5hRn.png",
      width: 1920,
      height: 1080,
      alt: "OCTO Hero 1"
    },
    {
      src: "https://iili.io/2paYBCx.png",
      width: 1920,
      height: 1080,
      alt: "OCTO Hero 2"
    },
    {
      src: "https://iili.io/2paYUue.png",
      width: 1920,
      height: 1080,
      alt: "OCTO Hero 3"
    }
  ];

  useEffect(() => {
    if (!isHeroVisible) return;

    const preloadImages = () => {
      images.forEach((imageData, index) => {
        const img = new Image();
        img.src = imageData.src;
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
  }, [isHeroVisible]);

  useEffect(() => {
    if (!imagesLoaded.every(Boolean)) return;

    const interval = setInterval(() => {
      setCurrentImage((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const programs = [
    {
      icon: <Icon name="Briefcase" className="w-6 h-6" />,
      title: "Capacita PcD",
      description: "Capacitamos pessoas com deficiência e neurodivergentes para o mercado de trabalho.",
      link: "/octo-faz/capacita-pcd"
    },
    {
      icon: <Icon name="Heart" className="w-6 h-6" />,
      title: "Cuida PcD",
      description: "Indicamos profissionais de saúde e psicoterapia acessíveis.",
      link: "/octo-faz/cuida-pcd"
    },
    {
      icon: <Icon name="Scale" className="w-6 h-6" />,
      title: "Orienta PcD",
      description: "Oferecemos orientação jurídica para garantir seus direitos.",
      link: "/octo-faz/orienta-pcd"
    },
    {
      icon: <Icon name="Building" className="w-6 h-6" />,
      title: "Capacita Empresas",
      description: "Assessoramos empresas na implementação de práticas inclusivas.",
      link: "/octo-faz/capacita-empresas"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="h-[563px] bg-[#972ae6] relative overflow-hidden">
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
              {/* Hero Carousel */}
              <div className="relative h-0 pb-[56.25%] overflow-hidden bg-gray-100">
                {images.map((imageData, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-1000",
                      currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                  >
                    {/* Placeholder durante o carregamento */}
                    {!imagesLoaded[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                        <span className="sr-only">Carregando imagem {index + 1}</span>
                      </div>
                    )}
                    <img
                      src={imageData.src}
                      alt={imageData.alt}
                      width={imageData.width}
                      height={imageData.height}
                      loading={index === 0 ? "eager" : "lazy"}
                      // @ts-ignore - fetchpriority é um atributo válido mas não está no tipo
                      fetchpriority={index === 0 ? "high" : "low"}
                      decoding="async"
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-1000 ease-out",
                        hoveredCard === index && "scale-105"
                      )}
                    />
                  </div>
                ))}
              </div>
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
                  transition-standard
                  bg-white/10 backdrop-blur-sm
                  md3-elevation-1
                  hover:md3-elevation-2
                  active:md3-elevation-3
                  md3-state-layer-opacity-hover
                  md3-state-layer-opacity-pressed
                  animate-slideIn
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