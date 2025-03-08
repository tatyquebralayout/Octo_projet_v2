/**
 * Componente PrivateRoute
 * Protege rotas que requerem autenticação
 */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

/**
 * Componente para proteger rotas privadas
 * @param props - Propriedades do componente
 * @returns O componente filho ou redireciona para o login
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  redirectTo = '/login',
  children 
}) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const location = useLocation();
  
  // Mostra um indicador de carregamento enquanto verifica a autenticação
  if (!isInitialized || isLoading) {
    return <div>Carregando...</div>;
  }
  
  // Redireciona para o login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }
  
  // Renderiza o componente filho ou o Outlet (para rotas aninhadas)
  return children ? <>{children}</> : <Outlet />;
}; 