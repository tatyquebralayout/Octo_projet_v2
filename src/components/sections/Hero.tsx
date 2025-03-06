import React from 'react';

const Hero = () => {
  return (
    <section className="pt-24 pb-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Viva seu Lifestyle no <span className="text-blue-400">Paraíso</span>
            </h1>
            <p className="text-xl text-blue-100">
              Descubra uma experiência única de moradia com nosso empreendimento exclusivo
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-colors">
              Saiba Mais
            </button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury Living"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;