/**
 * Componente PublicRoute
 * Para rotas que devem ser acessadas apenas por usuários não autenticados
 */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PublicRouteProps {
  redirectTo?: string;
  restricted?: boolean;
  children?: React.ReactNode;
}

/**
 * Componente para rotas públicas
 * @param props - Propriedades do componente
 * @returns O componente filho ou redireciona para o home (se autenticado e restrito)
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({ 
  redirectTo = '/',
  restricted = false,
  children 
}) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const location = useLocation();
  
  // Obtém a rota de origem, se existir
  const from = location.state?.from || '/';
  
  // Mostra um indicador de carregamento enquanto verifica a autenticação
  if (!isInitialized || isLoading) {
    return <div>Carregando...</div>;
  }
  
  // Redireciona para a página inicial ou origem se o usuário estiver autenticado
  // e a rota for restrita (como páginas de login/registro)
  if (isAuthenticated && restricted) {
    return <Navigate to={from !== location.pathname ? from : redirectTo} replace />;
  }
  
  // Renderiza o componente filho ou o Outlet (para rotas aninhadas)
  return children ? <>{children}</> : <Outlet />;
}; 