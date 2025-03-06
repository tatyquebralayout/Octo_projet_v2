import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Video, Users, Mail, Shield, Wallet, Globe, Star } from 'lucide-react';

const CuidaPcd = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Profissionais Parceiros",
      description: "Rede de profissionais de saúde e psicoterapia comprometidos com atendimento inclusivo."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Consultas Virtuais",
      description: "Atendimentos online com recursos de acessibilidade personalizados."
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Valores Acessíveis",
      description: "Opções de valores sociais para quem precisa e valores regulares para quem pode contribuir."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Confiabilidade",
      description: "Profissionais verificados e recomendados pela OCTO."
    }
  ];

  const benefits = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Atendimento Virtual",
      description: "Consultas online com recursos de acessibilidade necessários, facilitando o acesso de qualquer lugar."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Atendimento Especializado",
      description: "Profissionais capacitados para atender PcD, LGBTI+ e pessoas neurodivergentes."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Valores Flexíveis",
      description: "Opções de valores sociais e regulares, garantindo acesso a todos que precisam."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white mb-6">
                Cuida PcD
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Dizem que quem ama CUIDA. Pois muito bem, aqui a gente também CUIDA PCD – que é o programa destinado à indicação de profissionais da área de saúde e psicoterapia que sabemos que fazem um bom atendimento para a comunidade PcD, LGBTI+ e Neurodivergente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1
                  border border-gray-100 hover:border-[#972ae6]/20"
              >
                <div className="w-12 h-12 bg-[#972ae6]/10 rounded-full flex items-center justify-center mb-6
                  group-hover:bg-[#972ae6] transition-colors duration-300">
                  <div className="text-[#972ae6] group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#972ae6] mb-4 group-hover:text-[#e8b624] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#972ae6]/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-24 bg-[#e8b624] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="text-center">
              <Wallet className="w-16 h-16 text-white mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-white mb-8">
                Valores Acessíveis
              </h2>
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                  <p className="text-xl text-white/90 mb-4">
                    Tá meio apertado de grana e tá precisando de ajuda? A gente tem profissionais que são superacessíveis e cobram valores sociais com a parceria da ONG.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                  <p className="text-xl text-white/90">
                    Não tá apertado e pode pagar o valor real das consultas? Vem também, porque você valoriza o trabalho desses profissionais e ajuda, cada vez mais, com que eles consigam atender quem precisa com valores sociais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#972ae6] mb-6">
              Como Funciona
            </h2>
            <p className="text-xl text-[#972ae6]/70 max-w-3xl mx-auto">
              Oferecemos indicações de profissionais parceiros que prestam serviços acessíveis e inclusivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1
                  border border-gray-100 hover:border-[#972ae6]/20"
              >
                <div className="w-16 h-16 bg-[#972ae6]/10 rounded-full flex items-center justify-center mb-6">
                  <div className="text-[#972ae6]">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#972ae6] mb-4">
                  {benefit.title}
                </h3>
                <p className="text-[#972ae6]/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#972ae6]/70 text-lg italic">
              Não são profissionais da ONG, mas são profissionais parceiros e que a gente confia, então seu feedback também é importante pra gente.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#972ae6]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="text-center">
              <Heart className="w-16 h-16 text-white mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-white mb-8">
                Bora se cuidar?
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Entre em contato conosco para conhecer nossos profissionais parceiros e começar seu atendimento.
              </p>
              <a
                href="mailto:cuidapcd@octodiversidade.com.br"
                className="inline-block px-8 py-4 bg-white text-[#972ae6] text-lg font-bold rounded-full
                  hover:bg-[#e8b624] hover:text-white transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                cuidapcd@octodiversidade.com.br
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CuidaPcd;