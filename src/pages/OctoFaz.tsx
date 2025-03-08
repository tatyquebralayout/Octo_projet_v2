import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, HelpCircle } from 'lucide-react';

const OctoFaz = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white mb-6">
                OCTO Faz
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Conheça os programas e serviços que a OCTO oferece para pessoas com deficiência, neurodivergentes e empresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programas Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Info className="w-16 h-16 text-[#972ae6] mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-[#972ae6] mb-6">
              Nossos Programas
            </h2>
            <p className="text-xl text-[#972ae6]/70 max-w-3xl mx-auto">
              Desenvolvemos iniciativas especializadas para atender diferentes necessidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link 
              to="/octo-faz/capacita-pcd" 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1
                border border-gray-100 hover:border-[#972ae6]/20"
            >
              <h2 className="text-2xl font-bold text-[#972ae6] mb-4">Capacita PcD</h2>
              <p className="text-lg text-[#972ae6]/70 mb-6">
                Programa que ajuda pessoas com deficiência e neurodivergentes no mercado de trabalho.
              </p>
              <div className="flex items-center text-[#972ae6] font-medium hover:text-[#e8b624] transition-colors">
                <span>Saiba mais</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            <Link 
              to="/octo-faz/orienta-pcd" 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1
                border border-gray-100 hover:border-[#972ae6]/20"
            >
              <h2 className="text-2xl font-bold text-[#972ae6] mb-4">Orienta PcD</h2>
              <p className="text-lg text-[#972ae6]/70 mb-6">
                Orientações para pessoas com deficiência e neurodivergentes sobre seus direitos e recursos.
              </p>
              <div className="flex items-center text-[#972ae6] font-medium hover:text-[#e8b624] transition-colors">
                <span>Saiba mais</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            <Link 
              to="/octo-faz/cuida-pcd" 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1
                border border-gray-100 hover:border-[#972ae6]/20"
            >
              <h2 className="text-2xl font-bold text-[#972ae6] mb-4">Cuida PcD</h2>
              <p className="text-lg text-[#972ae6]/70 mb-6">
                Apoio para bem-estar e saúde mental de pessoas com deficiência e neurodivergentes.
              </p>
              <div className="flex items-center text-[#972ae6] font-medium hover:text-[#e8b624] transition-colors">
                <span>Saiba mais</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            <Link 
              to="/octo-faz/capacita-empresas" 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl
                transition-all duration-300 transform hover:-translate-y-1
                border border-gray-100 hover:border-[#972ae6]/20"
            >
              <h2 className="text-2xl font-bold text-[#972ae6] mb-4">Capacita Empresas</h2>
              <p className="text-lg text-[#972ae6]/70 mb-6">
                Treinamentos e consultoria para empresas sobre inclusão e acessibilidade.
              </p>
              <div className="flex items-center text-[#972ae6] font-medium hover:text-[#e8b624] transition-colors">
                <span>Saiba mais</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 border border-gray-100 shadow-xl">
            <div className="text-center">
              <HelpCircle className="w-16 h-16 text-[#972ae6] mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-[#972ae6] mb-8">
                Quer saber mais?
              </h2>
              <p className="text-xl text-[#972ae6]/70 mb-12">
                Entre em contato conosco para mais informações sobre nossos programas.
              </p>
              <Link
                to="/contato"
                className="inline-block px-8 py-4 bg-[#972ae6] text-white rounded-full font-bold hover:bg-[#e8b624] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Entre em contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OctoFaz;