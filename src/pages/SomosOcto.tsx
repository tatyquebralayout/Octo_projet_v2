import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de redirecionamento
 * Este componente existe apenas para redirecionar usuários que acessem a URL antiga
 * para a nova localização do conteúdo "Quem Somos"
 */
const SomosOcto = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona automaticamente para /somos-octo
    navigate('/somos-octo', { replace: true });
  }, [navigate]);

  // Renderiza um placeholder enquanto redireciona
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-600">Redirecionando...</p>
    </div>
  );
};

export default SomosOcto;