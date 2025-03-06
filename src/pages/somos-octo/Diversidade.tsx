import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Globe, Rainbow, Sparkles } from 'lucide-react';
import { Section, Card, Button } from '@/components/ui';

const Diversidade = () => {
  const intersectionalityPoints = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Identidade",
      description: "Pessoas com deficiências ocultas e neurodivergentes também podem fazer parte da comunidade LGBTI+ e viver sua sexualidade de maneira livre e humana."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Comunidade",
      description: "A diversidade dentro da comunidade LGBTI+ é imensa, abrangendo diferentes culturas, raças, idades e contextos sociais."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Transformação",
      description: "A OCTO busca criar uma sociedade mais inclusiva, justa e humanitária para todas as pessoas, reconhecendo e celebrando todas as interseccionalidades."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white mb-6">
                Diversidade
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Quando falamos de diversidade, falamos de todos nós, já que, em um panorama geral, somos diversos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LGBTI+ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1561612217-e5147162fd31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Representação da diversidade"
                className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
              />
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg">
                <h2 className="text-3xl font-bold text-[#972ae6] mb-6">
                  Comunidade LGBTI+
                </h2>
                <p className="text-lg text-[#972ae6]/70 mb-6">
                  A comunidade LGBTI+ inclui indivíduos que se identificam como Lésbicas, Gays, Bissexuais, Transexuais, Intersexuais e outras orientações sexuais e identidades de gênero, como Queer e Assexuais. A comunidade inclui uma variedade de experiências e perspectivas.
                </p>
                <div className="bg-[#972ae6]/5 rounded-xl p-6">
                  <p className="text-lg text-[#972ae6]/70">
                    Historicamente, a comunidade LGBTI+ tem enfrentado discriminação e marginalização, mas também lutado diariamente para alcançar progresso significativo em termos de direitos e visibilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interseccionalidade Section */}
      <section className="py-24 bg-[#e8b624] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Rainbow className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">
                Interseccionalidade
              </h2>
              <p className="text-xl text-white/90">
                A diversidade dentro da comunidade LGBTI+ é imensa, abrangendo diferentes culturas, raças, idades e contextos sociais. E, por isso mesmo, não seria diferente em relação à interseccionalidade entre LGBTI+, PCD (Pessoas com Deficiência) e Neurodivergentes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {intersectionalityPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 
                    hover:bg-white/20 transition-all duration-300 
                    transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <div className="text-white">
                      {point.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {point.title}
                  </h3>
                  <p className="text-white/90">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Propósito Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-[#972ae6] mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-[#972ae6] mb-8">
              Propósito da OCTO
            </h2>
            <p className="text-xl text-[#972ae6]/70 mb-12">
              E olhando esses recortes e essas interseccionalidades, a OCTO quer trazer ainda mais profundamente a transformação social, vibrando e criando uma sociedade mais inclusiva, justa e humanitária para todas as pessoas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contato"
                className="px-8 py-4 bg-[#972ae6] text-white text-lg font-bold rounded-full
                  hover:bg-[#e8b624] transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Entre em Contato
              </Link>
              <Link
                to="/cartilhas"
                className="px-8 py-4 bg-[#972ae6]/10 text-[#972ae6] text-lg font-bold rounded-full
                  hover:bg-[#972ae6]/20 transition-all duration-300
                  transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Acesse Nossas Cartilhas
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
              <Rainbow className="w-16 h-16 text-white mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-white mb-8">
                Pauta LGBTI+, você vê aqui mesmo, ó!
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Acompanhe nossas redes sociais e fique por dentro de todas as novidades e conteúdos sobre diversidade e inclusão.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://instagram.com/octo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-[#972ae6] text-lg font-bold rounded-full
                    hover:bg-[#e8b624] hover:text-white transition-all duration-300
                    transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Siga-nos no Instagram
                </a>
                <Link
                  to="/noticias"
                  className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-full
                    hover:bg-white/20 transition-all duration-300
                    transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Últimas Notícias
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diversidade;