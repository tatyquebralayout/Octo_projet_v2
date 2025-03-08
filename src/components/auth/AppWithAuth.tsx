/**
 * Exemplo de como integrar o AuthProvider no App principal
 * Este componente não deve ser usado diretamente, mas serve como referência
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { PrivateRoute, PublicRoute } from './index';

// Este é um exemplo de componentes de página - substitua pelos seus componentes reais
const LoginPage = () => <div>Página de Login</div>;
const RegisterPage = () => <div>Página de Registro</div>;
const HomePage = () => <div>Página Principal</div>;
const ProfilePage = () => <div>Página de Perfil (Protegida)</div>;
const AdminPage = () => <div>Página de Admin (Protegida)</div>;

/**
 * Componente de exemplo mostrando como integrar o AuthProvider
 */
export const AppWithAuth: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas - disponíveis para todos os usuários */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rotas restritas - disponíveis apenas para usuários não autenticados */}
          <Route
            path="/login"
            element={
              <PublicRoute restricted={true}>
                <LoginPage />
              </PublicRoute>
            }
          />
          
          <Route
            path="/registro"
            element={
              <PublicRoute restricted={true}>
                <RegisterPage />
              </PublicRoute>
            }
          />
          
          {/* Rotas privadas - disponíveis apenas para usuários autenticados */}
          <Route path="/area-protegida" element={<PrivateRoute />}>
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
          
          {/* Rota padrão para página não encontrada */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

/**
 * Como usar os hooks de autenticação nos componentes:
 * 
 * 1. useAuth - Para acessar o estado de autenticação
 * 
 * ```tsx
 * const MyComponent = () => {
 *   const { isAuthenticated, user } = useAuth();
 *   
 *   return (
 *     <div>
 *       {isAuthenticated ? `Olá, ${user?.name}` : 'Faça login para continuar'}
 *     </div>
 *   );
 * };
 * ```
 * 
 * 2. useLogin - Para processar o login
 * 
 * ```tsx
 * const LoginForm = () => {
 *   const { login, isLoading, error } = useLogin('/dashboard');
 *   
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     const email = e.target.email.value;
 *     const password = e.target.password.value;
 *     
 *     await login({ email, password });
 *   };
 *   
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {error && <p>{error.message}</p>}
 *       <input name="email" type="email" required />
 *       <input name="password" type="password" required />
 *       <button type="submit" disabled={isLoading}>
 *         {isLoading ? 'Entrando...' : 'Entrar'}
 *       </button>
 *     </form>
 *   );
 * };
 * ```
 * 
 * 3. useLogout - Para processar o logout
 * 
 * ```tsx
 * const LogoutButton = () => {
 *   const { logout, isLoading } = useLogout();
 *   
 *   return (
 *     <button onClick={logout} disabled={isLoading}>
 *       {isLoading ? 'Saindo...' : 'Sair'}
 *     </button>
 *   );
 * };
 * ```
 */ 