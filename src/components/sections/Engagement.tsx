import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Award } from 'lucide-react';

const Engagement = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Lighter Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://58b04f5940c1474e557e363a.redesign.static-01.com/l/images/954b062ee13c33a2e36375a7b2b2a7795fcc5c58.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Multiple overlay layers for enhanced effect */}
        <div className="absolute inset-0 bg-[#81b57c] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Title with Text Shadow */}
        <div className="text-center mb-16">
          <h2 className="text-[56px] font-bold text-white leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
            <span className="block">A OCTO Está</span>
            <span className="block mt-2">Com Você!</span>
          </h2>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Envie seu conteúdo Card */}
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 
            transition-all duration-300 
            shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] 
            hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)]
            transform hover:-translate-y-1">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Envie seu conteúdo
                </h3>
                <p className="text-lg text-white/90">
                  Compartilhe sua história, experiências ou conhecimentos na nossa coluna.
                </p>
                <Link 
                  to="/octo-com-voce/coluna"
                  className="inline-block px-8 py-3 rounded-full bg-white/20 text-white font-bold
                    hover:bg-white/30 transition-all duration-300 
                    transform hover:-translate-y-1 active:translate-y-0
                    shadow-md hover:shadow-lg active:shadow-sm"
                >
                  Participar agora
                </Link>
              </div>
            </div>
          </div>

          {/* Selo OCTO Card */}
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 
            transition-all duration-300 
            shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] 
            hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)]
            transform hover:-translate-y-1">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Selo OCTO
                </h3>
                <p className="text-lg text-white/90">
                  Descubra estabelecimentos comprometidos com a inclusão e acessibilidade.
                </p>
                <Link 
                  to="/octo-com-voce/selo"
                  className="inline-block px-8 py-3 rounded-full bg-white/20 text-white font-bold
                    hover:bg-white/30 transition-all duration-300 
                    transform hover:-translate-y-1 active:translate-y-0
                    shadow-md hover:shadow-lg active:shadow-sm"
                >
                  Conhecer estabelecimentos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Engagement;