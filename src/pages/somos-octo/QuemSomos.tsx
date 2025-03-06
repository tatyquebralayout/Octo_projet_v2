import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import JoinUs from '@/components/sections/JoinUs';

const QuemSomos = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Dra. Maria Silva",
      role: "Fundadora e Diretora Executiva",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Doutora em Psicologia pela USP, especialista em neurodiversidade e inclusão social. Pesquisadora na área de deficiências ocultas há mais de 15 anos.",
      lattes: "http://lattes.cnpq.br/123456789"
    },
    {
      name: "Dr. João Santos",
      role: "Diretor de Pesquisa",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Doutor em Neurociências, com foco em estudos sobre neurodiversidade e desenvolvimento cognitivo. Coordena projetos de pesquisa sobre inclusão.",
      lattes: "http://lattes.cnpq.br/987654321"
    },
    {
      name: "Ana Oliveira",
      role: "Coordenadora de Projetos",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Mestre em Gestão de Projetos Sociais, especialista em acessibilidade e inclusão. Desenvolve programas de capacitação e integração.",
      lattes: "http://lattes.cnpq.br/456789123"
    },
    {
      name: "Carlos Lima",
      role: "Diretor de Relações Institucionais",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Especialista em Políticas Públicas, responsável pelas parcerias e relações institucionais da OCTO.",
      lattes: "http://lattes.cnpq.br/321654987"
    },
    {
      name: "Patricia Mendes",
      role: "Coordenadora Cultural",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Mestre em Artes e Inclusão, desenvolve projetos culturais acessíveis e inclusivos.",
      lattes: "http://lattes.cnpq.br/789123456"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white">
                Deficiências ocultas, potencialidades visíveis!
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Equipe OCTO"
                className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg">
                <p className="text-lg text-[#972ae6]/70 mb-6">
                  A OCTO é uma organização dedicada a auxiliar na capacitação profissional e na inserção social e cultural de pessoas com deficiências e neurodivergências, bem como a fomentar um debate ativo sobre as deficiências ocultas e temas relacionados a essa interseccionalidade com a comunidade LGBTI+.
                </p>
                <p className="text-lg text-[#972ae6]/70">
                  Na OCTO, acreditamos que a diversidade é uma força poderosa e que muda o mundo atipicamente, dia a dia, e infinitamente. Diversidade é um estado de ser e isso, por si só, é o que nos move!
                </p>
                <p className="text-lg text-[#972ae6]/70 font-medium">
                  Bem-vindo, e um abraço de 8 tentáculos em você.
                </p>
              </div>
              <Link 
                to="/octo-faz"
                className="inline-block px-8 py-4 bg-[#972ae6] text-white rounded-full font-bold
                  hover:bg-[#e8b624] transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Conheça nossos projetos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-[56px] font-bold text-[#972ae6] text-center mb-16">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Profile Image */}
                <div className="relative mx-auto mb-4">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#972ae6]/20 
                    group-hover:border-[#e8b624] transition-all duration-300">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#972ae6] text-center mb-3 group-hover:text-[#e8b624] transition-colors">
                  {member.name}
                </h3>

                {/* Lattes Icon */}
                <div className="flex justify-center">
                  <a
                    href={member.lattes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#972ae6]/10 group-hover:bg-[#e8b624] transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-[#972ae6] group-hover:text-white transition-colors" />
                  </a>
                </div>

                {/* Popup Bio */}
                {hoveredCard === index && (
                  <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64
                    bg-white rounded-xl shadow-xl p-4 animate-fade-in">
                    <p className="text-sm text-[#972ae6]/70 mb-2 font-medium">
                      {member.role}
                    </p>
                    <p className="text-sm text-[#972ae6]/70">
                      {member.bio}
                    </p>
                    {/* Arrow */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45
                      w-3 h-3 bg-white border-r border-b border-gray-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <JoinUs />
    </div>
  );
};

export default QuemSomos;