# Sistema de Autenticação - Projeto OCTO

Este diretório contém hooks, contextos e componentes relacionados à autenticação de usuários no projeto OCTO. O sistema foi projetado para gerenciar o estado de autenticação, manipular tokens JWT e controlar o acesso a rotas protegidas.

## Tecnologias e Conceitos Utilizados

- **React Context API** para gerenciamento de estado global
- **React Hooks** para lógica de autenticação
- **TypeScript** para tipagem segura
- **JWT** (JSON Web Tokens) para autenticação sem estado
- **Local Storage** para persistência de tokens
- **React Router** para navegação e controle de acesso

## Estrutura do Sistema

### Contexto de Autenticação

O `AuthContext` é o coração do sistema. Ele rastreia o estado de autenticação e expõe métodos para atualizar esse estado.

**Arquivo**: `src/contexts/AuthContext.tsx`

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Hooks de Autenticação

Os hooks abaixo fornecem funcionalidades de autenticação para os componentes:

1. **useAuth**: Hook principal que dá acesso ao estado de autenticação e dispatch
   - **Arquivo**: `src/hooks/useAuth.ts`
   - **Uso**: `const { isAuthenticated, user } = useAuth();`

2. **useLogin**: Gerencia o processo de login
   - **Arquivo**: `src/hooks/useLogin.ts`
   - **Uso**: `const { login, isLoading, error } = useLogin('/dashboard');`

3. **useRegister**: Gerencia o processo de registro
   - **Arquivo**: `src/hooks/useRegister.ts`
   - **Uso**: `const { register, isLoading, error } = useRegister();`

4. **useLogout**: Gerencia o processo de logout
   - **Arquivo**: `src/hooks/useLogout.ts`
   - **Uso**: `const { logout } = useLogout();`

5. **useRequireAuth**: Protege rotas que exigem autenticação
   - **Arquivo**: `src/hooks/useRequireAuth.ts`
   - **Uso**: `useRequireAuth({ redirectTo: '/login' });`

### Componentes de Roteamento

Os componentes abaixo facilitam o controle de acesso às rotas:

1. **PrivateRoute**: Protege rotas que exigem autenticação
   - **Arquivo**: `src/components/auth/PrivateRoute.tsx`
   - **Uso**: `<PrivateRoute path="/perfil" element={<Perfil />} />`

2. **PublicRoute**: Para rotas públicas, opcionalmente restringidas a usuários não autenticados
   - **Arquivo**: `src/components/auth/PublicRoute.tsx`
   - **Uso**: `<PublicRoute restricted={true} path="/login" element={<Login />} />`

3. **AuthRedirect**: Gerencia redirecionamento após o login
   - **Arquivo**: `src/components/auth/AuthRedirect.tsx`
   - **Uso**: `<AuthRedirect defaultPath="/dashboard" />`

## Fluxo de Autenticação

1. **Inicialização**:
   - O `AuthProvider` verifica se existe um token JWT no localStorage
   - Se existir, tenta validar o token obtendo o perfil do usuário
   - Atualiza o estado de autenticação conforme o resultado

2. **Login**:
   - O usuário envia suas credenciais
   - O hook `useLogin` chama o serviço de autenticação
   - Se bem-sucedido, o token é armazenado e o estado é atualizado
   - O usuário é redirecionado para a página solicitada

3. **Verificação de Rota**:
   - Componentes `PrivateRoute` e `PublicRoute` verificam o estado de autenticação
   - Redirecionam para a página apropriada conforme as regras

4. **Logout**:
   - O hook `useLogout` remove o token e limpa o estado
   - O usuário é redirecionado para a página de login

## Exemplo de Uso

### 1. Configuração do Provedor

```tsx
// src/App.tsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Seu aplicativo e rotas aqui */}
    </AuthProvider>
  );
}
```

### 2. Definição de Rotas

```tsx
// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../components/auth';

function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<HomePage />} />
      
      {/* Rotas restritas a usuários não autenticados */}
      <Route 
        path="/login" 
        element={<PublicRoute restricted={true}><LoginPage /></PublicRoute>} 
      />
      <Route 
        path="/registro" 
        element={<PublicRoute restricted={true}><RegisterPage /></PublicRoute>} 
      />
      
      {/* Rotas protegidas (requerem autenticação) */}
      <Route path="/area-protegida" element={<PrivateRoute />}>
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="configuracoes" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
```

### 3. Componente de Login

```tsx
// src/pages/LoginPage.tsx
import { useLogin } from '../hooks/auth';

function LoginPage() {
  const { login, isLoading, error, clearError } = useLogin();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    await login({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error.message}</div>}
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Senha" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

### 4. Componente de Header com Botão de Logout

```tsx
// src/components/Header.tsx
import { useAuth, useLogout } from '../hooks/auth';

function Header() {
  const { isAuthenticated, user } = useAuth();
  const { logout, isLoading } = useLogout();
  
  return (
    <header>
      <nav>
        {isAuthenticated ? (
          <>
            <span>Olá, {user?.name}</span>
            <button onClick={logout} disabled={isLoading}>
              {isLoading ? 'Saindo...' : 'Sair'}
            </button>
          </>
        ) : (
          <a href="/login">Entrar</a>
        )}
      </nav>
    </header>
  );
}
```

## Considerações de Segurança

1. **Tokens JWT**: São armazenados no localStorage e incluídos automaticamente em todas as requisições.

2. **Renovação de Tokens**: O sistema tenta renovar tokens expirados automaticamente.

3. **Proteção de Rotas**: Componentes `PrivateRoute` e `PublicRoute` garantem que usuários sem permissão não acessem rotas restritas.

4. **Tratamento de Erros**: Todos os erros de autenticação são capturados e exibidos apropriadamente.

## Extensão e Personalização

O sistema foi projetado para ser facilmente extensível. Para adicionar novos recursos:

1. **Novas Ações**: Adicione novos tipos de ação em `AuthActionType` e implemente o tratamento no reducer.

2. **Novos Hooks**: Crie hooks especializados para casos específicos, seguindo o padrão dos existentes.

3. **Personalização de UI**: Os componentes `PrivateRoute` e `PublicRoute` aceitam componentes personalizados de carregamento.

---

Para perguntas ou sugestões sobre o sistema de autenticação, consulte a documentação da API ou entre em contato com a equipe de desenvolvimento.