import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Sparkles, BookOpen, Users, Lightbulb, Heart, Target } from 'lucide-react';

const Neurodivergencias = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const examples = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Autismo",
      description: "Condição que afeta a forma como a pessoa se comunica e interage com o mundo."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "TDAH",
      description: "Transtorno de Déficit de Atenção e Hiperatividade."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Síndrome de Tourette",
      description: "Condição neurológica caracterizada por tiques motores e vocais."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Altas Habilidades",
      description: "Superdotação e capacidades acima da média em determinadas áreas."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Deficiência Intelectual",
      description: "Limitações no funcionamento intelectual e comportamento adaptativo."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551847677-dc82d764e1eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white mb-6">
                Neurodivergências
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Neurodivergências são variações naturais no funcionamento neurológico que afetam como as pessoas pensam, sentem e interagem com o mundo.
              </p>
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
                src="https://images.unsplash.com/photo-1551847677-dc82d764e1eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Representação de neurodiversidade"
                className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg">
                <p className="text-lg text-[#972ae6]/70 mb-6">
                  Neurodivergente ou neuroatípico é a pessoa que foge à 'norma' neurológica típica, mas que são apenas uma maneira diferente de experimentar o mundo.
                </p>
                <div className="bg-[#972ae6]/5 rounded-xl p-6 space-y-4 mb-6">
                  <h3 className="text-xl font-bold text-[#972ae6]">
                    Diferença entre Neurodiversidade e Neurodivergências:
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-[#972ae6]/70">
                      <span className="font-bold">Neurodiversidade:</span> Representa toda a diversidade neurológica, incluindo tanto pessoas típicas quanto atípicas.
                    </li>
                    <li className="text-[#972ae6]/70">
                      <span className="font-bold">Neurodivergências:</span> Refere-se especificamente às pessoas atípicas.
                    </li>
                  </ul>
                </div>
                <p className="text-lg text-[#972ae6]/70">
                  Esses termos foram criados pela socióloga Judy Singer nos anos 90, trazendo uma nova perspectiva sobre as diferentes formas de funcionamento cerebral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemplos Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-[56px] font-bold text-[#972ae6] text-center mb-16">
            Exemplos de Neurodivergências
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {examples.map((example, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1
                  border border-gray-100 hover:border-[#972ae6]/20"
              >
                <div className="w-12 h-12 bg-[#972ae6]/10 rounded-full flex items-center justify-center mb-6
                  group-hover:bg-[#972ae6] transition-colors duration-300">
                  <div className="text-[#972ae6] group-hover:text-white transition-colors duration-300">
                    {example.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#972ae6] mb-4 group-hover:text-[#e8b624] transition-colors">
                  {example.title}
                </h3>
                <p className="text-[#972ae6]/70">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importância do Reconhecimento Section */}
      <section className="py-24 bg-[#e8b624] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-8">
                Importância do Reconhecimento
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                A maioria das neurodivergências apresenta prejuízos para a vida social da pessoa, mas, infelizmente, uma minoria delas é considerada 'deficiência'. Nós, da OCTO, acreditamos e lutamos para que haja uma legislação específica, ainda que seja um capítulo dentro da Lei Brasileira de Inclusão, para as neurodivergências – que são muitas – e têm necessidades de atendimentos específicos e terapias que as legislações existentes, infelizmente, não dão base para que tanto as pessoas neurodivergentes quanto seus familiares consigam, levando-os a ter que recorrer ao judiciário para direitos básicos.
              </p>
              <div className="bg-white/10 rounded-xl p-8 mb-8">
                <p className="text-white text-lg font-medium italic">
                  "Lembre-se: Neurodivergências não são doenças e cada pessoa é única, logo a forma como as neurodivergências se manifestam pode variar bastante. Compreensão e conhecimento são fundamentais para apoiar as pessoas atípicas (assim como as pessoas com deficiências ocultas)."
                </p>
              </div>
              <Link
                to="/contato"
                className="inline-block px-8 py-4 bg-white text-[#e8b624] text-lg font-bold rounded-full
                  hover:bg-[#972ae6] hover:text-white transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Junte-se à nossa causa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#972ae6]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-2 border-white rounded-3xl p-12">
            <div className="text-center">
              <Users className="w-16 h-16 text-white mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-white mb-8">
                Vamos Conversar Sobre Neurodivergências?
              </h2>
              <p className="text-xl text-white/90 mb-12">
                A OCTO está disponível para formação e acolhimento.
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

export default Neurodivergencias;