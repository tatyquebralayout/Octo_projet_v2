/**
 * Hook useRequireAuth
 * Protege rotas que exigem autenticação, redirecionando usuários não autenticados
 */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Interface de opções para o hook useRequireAuth
 */
interface UseRequireAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  redirectIfAuthenticated_To?: string;
}

/**
 * Hook personalizado para proteger rotas que exigem autenticação
 * @param options - Opções de configuração
 * @returns O estado atual de autenticação
 */
export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const { 
    redirectTo = '/login',
    redirectIfAuthenticated = false,
    redirectIfAuthenticated_To = '/',
  } = options;
  
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Efeito para verificar autenticação e redirecionar se necessário
  useEffect(() => {
    // Aguarda a inicialização da autenticação
    if (!isInitialized || isLoading) {
      return;
    }

    // Caso 1: Redireciona para o login se o usuário não estiver autenticado
    if (!isAuthenticated && !redirectIfAuthenticated) {
      navigate(redirectTo, { 
        replace: true,
        state: { from: location.pathname }
      });
    }

    // Caso 2: Redireciona para home se o usuário estiver autenticado e a rota for apenas para não-autenticados
    if (isAuthenticated && redirectIfAuthenticated) {
      navigate(redirectIfAuthenticated_To, { replace: true });
    }
  }, [
    isAuthenticated, 
    isInitialized, 
    isLoading, 
    navigate, 
    redirectTo, 
    location.pathname, 
    redirectIfAuthenticated, 
    redirectIfAuthenticated_To
  ]);

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
  };
}; 