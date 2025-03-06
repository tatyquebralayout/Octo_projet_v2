import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Brain, Heart, Activity as Diversity } from 'lucide-react';

const SomosOcto = () => {
  const sections = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Quem Somos?",
      description: "Conheça nossa história, missão e os valores que nos guiam na promoção da inclusão e acessibilidade.",
      link: "/somos-octo/quem-somos",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Deficiências Ocultas",
      description: "Entenda mais sobre as deficiências que nem sempre são visíveis, mas impactam significativamente a vida das pessoas.",
      link: "/somos-octo/deficiencias-ocultas",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Neurodivergências",
      description: "Descubra como diferentes formas de pensar e processar informações enriquecem nossa sociedade.",
      link: "/somos-octo/neurodivergencias",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Diversity className="w-8 h-8" />,
      title: "Diversidade",
      description: "Explore como a diversidade fortalece nossa comunidade e enriquece nossas experiências.",
      link: "/somos-octo/diversidade",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#972ae6] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-8">
              Somos OCTO
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              A OCTO é uma organização dedicada a capacitar pessoas com deficiências ocultas e neurodivergentes, promovendo inclusão social, cultural e profissional. Acreditamos que a diversidade é uma força transformadora.
            </p>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Link
                key={index}
                to={section.link}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={section.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
                </div>

                {/* Content */}
                <div className="relative p-8 min-h-[320px] flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                      <div className="text-white">
                        {section.icon}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-white/90 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <span className="inline-flex items-center text-white font-medium group-hover:underline">
                      Saiba mais
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f0465d]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Faça Parte da Nossa Missão
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Junte-se a nós na construção de um mundo mais inclusivo e acessível. Sua participação faz a diferença!
            </p>
            <Link
              to="/contato"
              className="inline-block px-8 py-4 bg-white text-[#f0465d] font-bold rounded-full hover:bg-[#972ae6] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SomosOcto;