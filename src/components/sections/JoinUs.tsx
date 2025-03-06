import React from 'react';
import { Mail, Heart, Users, Globe } from 'lucide-react';

const JoinUs = () => {
  const reasons = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Impacto Social",
      description: "Ajude a construir uma sociedade mais inclusiva e acessível para todos."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Comunidade",
      description: "Faça parte de uma rede de pessoas comprometidas com a transformação social."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Alcance",
      description: "Contribua para projetos que impactam vidas em todo o Brasil."
    }
  ];

  return (
    <section className="py-16 bg-[#e8b624]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-[56px] font-bold text-white mb-4">
              Faça Parte da Nossa História
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Quer contribuir para um mundo mais inclusivo e acessível? 
              Junte-se a nós nessa missão transformadora!
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 
                  hover:bg-white/20 transition-all duration-300 
                  transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <div className="text-white">
                    {reason.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-white/90">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Entre em Contato
            </h3>
            <p className="text-white/90 mb-4">
              Estamos ansiosos para ouvir suas ideias e construir juntos um futuro mais inclusivo.
            </p>
            <a
              href="mailto:contato@octodiversidade.com.br"
              className="text-xl text-white hover:text-[#972ae6] transition-colors"
            >
              contato@octodiversidade.com.br
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;