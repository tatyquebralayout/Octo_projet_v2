import React from 'react';
import { Link } from 'react-router-dom';

const OctoFaz = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-h1">OCTO Faz</h1>
      <p className="text-body-large mt-4">
        Conheça os programas e serviços que a OCTO oferece para pessoas com deficiência, neurodivergentes e empresas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Link to="/octo-faz/capacita-pcd" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-h3">Capacita PcD</h2>
          <p className="text-body mt-2">Programa que ajuda pessoas com deficiência e neurodivergentes no mercado de trabalho.</p>
          <span className="text-link mt-4 inline-block">Saiba mais →</span>
        </Link>
        
        <Link to="/octo-faz/orienta-pcd" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-h3">Orienta PcD</h2>
          <p className="text-body mt-2">Orientações para pessoas com deficiência e neurodivergentes sobre seus direitos e recursos.</p>
          <span className="text-link mt-4 inline-block">Saiba mais →</span>
        </Link>
        
        <Link to="/octo-faz/cuida-pcd" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-h3">Cuida PcD</h2>
          <p className="text-body mt-2">Apoio para bem-estar e saúde mental de pessoas com deficiência e neurodivergentes.</p>
          <span className="text-link mt-4 inline-block">Saiba mais →</span>
        </Link>
        
        <Link to="/octo-faz/capacita-empresas" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-h3">Capacita Empresas</h2>
          <p className="text-body mt-2">Treinamentos e consultoria para empresas sobre inclusão e acessibilidade.</p>
          <span className="text-link mt-4 inline-block">Saiba mais →</span>
        </Link>
      </div>
      
      <div className="mt-12 p-6 bg-primary-50 rounded-lg">
        <h3 className="text-h4">Quer saber mais?</h3>
        <p className="text-body mt-2">Entre em contato conosco para mais informações sobre nossos programas.</p>
        <Link to="/contato" className="btn btn-primary mt-4">Entre em contato</Link>
      </div>
    </div>
  );
};

export default OctoFaz;