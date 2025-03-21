import React from 'react';
import { Shield, Heart, Sun } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Segurança Total",
      description: "Sistema de segurança 24/7 com tecnologia de ponta"
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: "Qualidade de Vida",
      description: "Áreas de lazer completas para toda a família"
    },
    {
      icon: <Sun className="w-12 h-12 text-blue-600" />,
      title: "Sustentabilidade",
      description: "Projeto eco-friendly com energia solar e reuso de água"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-h2 mb-4">
            Por que escolher nosso empreendimento?
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Descubra todos os benefícios de viver em um lugar pensado em cada detalhe
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card card-secondary p-8"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-h3 mb-2">{feature.title}</h3>
              <p className="text-body-small">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;