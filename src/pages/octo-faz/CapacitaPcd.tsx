import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Video, FileText, Mail, Building, Users, BookOpen, Target } from 'lucide-react';

const CapacitaPcd = () => {
  const features = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Vagas de Emprego",
      description: "Acesso a oportunidades de trabalho em empresas comprometidas com a inclusão."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Vídeos Educativos",
      description: "Dicas práticas sobre entrevistas e como comunicar suas necessidades de acessibilidade."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Auxílio com Currículo",
      description: "Suporte especializado para estruturar e aprimorar seu currículo profissional."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Mentoria",
      description: "Acompanhamento personalizado para desenvolvimento profissional."
    }
  ];

  const resources = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Como se Preparar para Entrevistas",
      description: "Aprenda técnicas e dicas para se destacar em processos seletivos.",
      link: "#",
      soon: true
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Construção de Currículo",
      description: "Guia passo a passo para criar um currículo profissional impactante.",
      link: "#",
      soon: true
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Comunicando Necessidades",
      description: "Como abordar suas necessidades de acessibilidade no ambiente de trabalho.",
      link: "#",
      soon: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white mb-6">
                Capacita PcD
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                O CAPACITA PcD é o programa da OCTO que ajuda a pessoa com deficiência (oculta ou aparente) e neurodivergente com o mercado de trabalho.
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

      {/* Vagas Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="w-16 h-16 text-[#972ae6] mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-[#972ae6] mb-8">
              Vagas de Emprego
            </h2>
            <p className="text-xl text-[#972ae6]/70 mb-12">
              Aqui nessa página você vai encontrar ofertas de vagas de empresas para pessoas com deficiência ou neurodivergências e poderá se candidatar diretamente para elas!
            </p>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <p className="text-lg text-[#972ae6]/70 mb-6">
                Em breve, disponibilizaremos um banco de vagas exclusivo para pessoas com deficiência e neurodivergentes. Fique ligado!
              </p>
              <Link
                to="/contato"
                className="inline-block px-8 py-4 bg-[#972ae6] text-white text-lg font-bold rounded-full
                  hover:bg-[#e8b624] transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Cadastre seu currículo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#972ae6] mb-6">
              Recursos e Materiais
            </h2>
            <p className="text-xl text-[#972ae6]/70 max-w-3xl mx-auto">
              Preparamos conteúdos especiais para ajudar você em sua jornada profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1
                  border border-gray-100 hover:border-[#972ae6]/20"
              >
                <div className="w-16 h-16 bg-[#972ae6]/10 rounded-full flex items-center justify-center mb-6">
                  <div className="text-[#972ae6]">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#972ae6] mb-4">
                  {resource.title}
                </h3>
                <p className="text-[#972ae6]/70 mb-6">
                  {resource.description}
                </p>
                {resource.soon ? (
                  <span className="inline-block px-4 py-2 bg-[#e8b624]/10 text-[#e8b624] text-sm font-bold rounded-full">
                    Em breve
                  </span>
                ) : (
                  <Link
                    to={resource.link}
                    className="inline-block text-[#972ae6] hover:text-[#e8b624] font-bold transition-colors"
                  >
                    Acessar material
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#972ae6]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="text-center">
              <Mail className="w-16 h-16 text-white mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-white mb-8">
                Quer uma ajudinha?
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Entre em contato conosco para receber suporte personalizado em sua jornada profissional.
              </p>
              <a
                href="mailto:capacitapcd@octodiversidade.com.br"
                className="inline-block px-8 py-4 bg-white text-[#972ae6] text-lg font-bold rounded-full
                  hover:bg-[#e8b624] hover:text-white transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                capacitapcd@octodiversidade.com.br
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapacitaPcd;