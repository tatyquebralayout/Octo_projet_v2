import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Brain, Ear, Activity, Users, Flower2 } from 'lucide-react';

const DeficienciasOcultas = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const deficiencyTypes = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Visuais",
      examples: ["Baixa visão", "Visão monocular"],
      description: "Condições que afetam a visão mas podem não ser imediatamente perceptíveis."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Físicas",
      examples: ["Monoparesia"],
      description: "Deficiências que afetam a mobilidade ou funções físicas de forma não aparente."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Neurodivergências",
      examples: ["Autismo"],
      description: "Diferentes formas de processamento neurológico e cognição."
    },
    {
      icon: <Ear className="w-6 h-6" />,
      title: "Auditivas",
      examples: ["Surdez"],
      description: "Deficiências que impactam a audição em diferentes graus."
    }
  ];

  const impactos = [
    {
      title: "Invalidação Social",
      description: "Diferente das deficiências aparentes, a pessoa com deficiência oculta sofre capacitismo de outra maneira: na invalidação da sua existência como pessoa com deficiência."
    },
    {
      title: "Acesso a Direitos",
      description: "Muitas vezes, essas pessoas são agressivamente questionadas em filas prioritárias, assentos preferenciais e outros espaços destinados a pessoas com deficiência."
    },
    {
      title: "Representatividade",
      description: "Sofrem também com a falta de representatividade nos meios de comunicação e nos meios artísticos."
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

      {/* Definição Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Pessoa em ambiente profissional"
                className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg">
                <p className="text-lg text-[#972ae6]/70 mb-6">
                  Deficiências ocultas são todas aquelas que não são imediatamente perceptíveis ou que acabam por se 'camuflar' no corpo da pessoa com deficiência, mas que, assim como as deficiências aparentes, impactam em seu cotidiano e vivência.
                </p>
                <p className="text-lg text-[#972ae6]/70">
                  Essas deficiências podem afetar diversas áreas e podem ser físicas, intelectuais, visuais, auditivas, múltiplas ou neurodivergências.
                </p>
              </div>
              <Link 
                to="/cartilhas"
                className="inline-block px-8 py-4 bg-[#972ae6] text-white rounded-full font-bold
                  hover:bg-[#e8b624] transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Acesse nossas cartilhas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-[56px] font-bold text-[#972ae6] text-center mb-16">
            Tipos de Deficiências Ocultas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deficiencyTypes.map((type, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1
                  border border-gray-100 hover:border-[#972ae6]/20"
              >
                <div className="w-12 h-12 bg-[#972ae6]/10 rounded-full flex items-center justify-center mb-6
                  group-hover:bg-[#972ae6] transition-colors duration-300">
                  <div className="text-[#972ae6] group-hover:text-white transition-colors duration-300">
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#972ae6] mb-4 group-hover:text-[#e8b624] transition-colors">
                  {type.title}
                </h3>
                <p className="text-[#972ae6]/70 mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.examples.map((example, i) => (
                    <li key={i} className="text-[#972ae6]/70 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#972ae6] rounded-full mr-2" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impactos Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-[56px] font-bold text-[#972ae6] text-center mb-16">
            Impactos Sociais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {impactos.map((impacto, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-[#972ae6] mb-4">
                  {impacto.title}
                </h3>
                <p className="text-[#972ae6]/70">
                  {impacto.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lei do Cordão de Girassol Section */}
      <section className="py-24 bg-[#e8b624] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                  <Flower2 className="w-24 h-24 text-white" />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Lei do Cordão de Girassol
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Para facilitar a identificação das pessoas com deficiências ocultas, houve a promulgação da LEI Nº 14.624, DE 17 DE JULHO DE 2023, que instituiu o cordão de girassol como símbolo nacional das deficiências ocultas. No entanto, a aplicação dessa lei enfrenta barreiras sociais, como a falta de distribuição oficial pelo Estado, levando à venda por camelôs ou distribuição em massa em eventos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#972ae6]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-8">
                Vamos bater um papo mais profundo sobre deficiências ocultas, que são o maior número de deficiências que temos hoje?
              </h2>
              <p className="text-xl text-white/90 mb-12">
                A OCTO está disponível pra essa formação e esse acolhimento. Em breve, aqui mesmo, vamos ter alguns vídeos maneiros sobre o tema! Vem com a gente!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/contato"
                  className="px-8 py-4 bg-white text-[#972ae6] text-lg font-bold rounded-full
                    hover:bg-[#e8b624] hover:text-white transition-all duration-300
                    transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Entre em Contato
                </Link>
                <Link
                  to="/cartilhas"
                  className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-full
                    hover:bg-white/20 transition-all duration-300
                    transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Acesse Nossas Cartilhas
                </Link>
              </div>
              <p className="text-sm text-white/70 mt-8">
                Quer saber mais? Já já os links aparecem aqui mesmo (estão em andamento, prometemos!)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeficienciasOcultas;