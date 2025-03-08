import { useState } from 'react';
import { ArrowRight, Download, Calendar, Palette, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsAndEvents = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const news = [
    {
      tag: 'Campanha',
      title: '#PCDSaiDoArmário',
      description: 'Saia do armário e assuma sua potência única. Você é um girassol!',
      link: '/noticias',
      linkText: 'Saiba mais',
      icon: <ArrowRight className="w-5 h-5" />,
      color: 'bg-[#972ae6]/10',
      tagColor: 'text-[#972ae6]',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      tag: 'Evento',
      title: 'VIRADA PcD',
      description: 'Participe do primeiro evento nacional de arte inclusiva!',
      link: '/octo-faz/octo-cultura',
      linkText: 'Participe',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-[#e8b624]/10',
      tagColor: 'text-[#e8b624]',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      tag: 'Cartilha',
      title: 'Nova Cartilha: Entenda e Respeite as Deficiências Ocultas!',
      description: 'A OCTO lança sua primeira cartilha educativa sobre deficiências ocultas, com informações essenciais para combater o capacitismo e promover inclusão no dia a dia.',
      link: '/cartilhas',
      linkText: 'Baixe agora a cartilha',
      icon: <Download className="w-5 h-5" />,
      color: 'bg-[#f0465d]/10',
      tagColor: 'text-[#f0465d]',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      tag: 'Workshop',
      title: 'Workshop Online: Neurodivergências no Mercado de Trabalho',
      description: 'Quer aprender como criar ambientes de trabalho mais inclusivos para pessoas neurodivergentes? Inscreva-se já no nosso workshop online.',
      link: '/octo-faz/capacita-empresas',
      linkText: 'Inscreva-se aqui',
      icon: <ArrowRight className="w-5 h-5" />,
      color: 'bg-[#972ae6]/10',
      tagColor: 'text-[#972ae6]',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      tag: 'Chamada',
      title: 'Artistas PcD e Neurodivergentes: Queremos Conhecer Seu Trabalho!',
      description: 'A OCTO está em busca de artistas com deficiências ocultas, aparentes ou neurodivergentes para participar de projetos culturais e eventos como a VIRADA PcD.',
      link: '/octo-faz/octo-cultura',
      linkText: 'Envie seu portfólio',
      icon: <Palette className="w-5 h-5" />,
      color: 'bg-[#e8b624]/10',
      tagColor: 'text-[#e8b624]',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      tag: 'Depoimentos',
      title: 'Conheça Nossos Girassóis: Histórias Reais de Superação!',
      description: 'A OCTO traz histórias inspiradoras de pessoas com deficiências ocultas e neurodivergentes que estão transformando suas realidades e conquistando espaços. Leia depoimentos emocionantes e descubra como a inclusão muda vidas.',
      link: '/noticias',
      linkText: 'Leia os depoimentos',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-[#f0465d]/10',
      tagColor: 'text-[#f0465d]',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-display text-primary-400 mb-4 leading-tight">
            Últimas Notícias
          </h2>
          <p className="text-body-large text-primary-400/70 max-w-2xl mx-auto mb-8">
            Fique por dentro das novidades, eventos e iniciativas da OCTO
          </p>
          <Link 
            to="/noticias"
            className="btn btn-primary"
          >
            Ver todas as notícias
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`
                card card-secondary
                transition-standard
                md3-elevation-1
                hover:md3-elevation-2
                active:md3-elevation-3
                hover-lift
                ${hoveredCard === index ? 'z-10' : 'z-0'}
              `}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-standard group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tag */}
                <span className={`inline-block px-4 py-1.5 rounded-full text-body-small font-bold mb-4 ${item.color} ${item.tagColor}`}>
                  {item.tag}
                </span>

                {/* Title */}
                <h3 className="text-h3 text-primary-400 mb-3 group-hover:text-accent-400 transition-standard">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-body text-primary-400/70 mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* Action */}
                <div className="btn btn-primary">
                  <span>{item.linkText}</span>
                  <span className="ml-2 transform transition-standard group-hover:translate-x-1">
                    {item.icon}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndEvents;