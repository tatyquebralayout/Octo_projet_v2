/**
 * Componente AuthRedirect
 * Gerencia o redirecionamento após o login
 */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthRedirectProps {
  defaultPath?: string;
}

/**
 * Componente que redireciona usuários após o login
 * @param props - Propriedades do componente
 */
export const AuthRedirect: React.FC<AuthRedirectProps> = ({ defaultPath = '/' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  
  useEffect(() => {
    // Aguarda a inicialização da autenticação
    if (!isInitialized || isLoading) {
      return;
    }
    
    if (isAuthenticated) {
      // Obtém o caminho de origem armazenado no estado da localização ou usa o padrão
      const from = location.state?.from || defaultPath;
      
      // Redireciona para a página de origem ou para a página padrão
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isInitialized, isLoading, location.state, navigate, defaultPath]);
  
  // Este componente não renderiza nada, apenas redirecionamento
  return null;
}; 