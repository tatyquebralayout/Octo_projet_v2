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

## useDataFetching

O hook `useDataFetching` fornece uma interface unificada para buscar dados de API com gerenciamento de estados, cache e tratamento de erros.

### Características

- Gerenciamento de estados de loading, erro e dados
- Integração com sistema de cache
- Tratamento padronizado de erros
- Suporte a retry automático
- Integração com sistema de notificações
- Cancelamento de requisições quando o componente é desmontado
- Suporte a paginação

### Uso básico

```tsx
import { useDataFetching } from 'src/hooks';

function UserProfile({ userId }) {
  const { 
    data: user, 
    isLoading, 
    error, 
    refetch 
  } = useDataFetching({
    endpoint: `/users/${userId}`,
    // Exibir notificação apenas em erro, não em sucesso
    showSuccessNotification: false,
    showErrorNotification: true
  });

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} onRetry={refetch} />;
  if (!user) return <Empty message="Usuário não encontrado" />;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Com opções avançadas

```tsx
function ProductList() {
  const [filter, setFilter] = useState('');
  
  const { 
    data: products,
    isLoading,
    error,
    pagination,
    refetch
  } = useDataFetching({
    endpoint: '/products',
    method: 'GET',
    params: { category: filter },
    
    // Opções de cache
    useCache: true,
    cacheTime: 5 * 60 * 1000, // 5 minutos
    
    // Opções de paginação
    pagination: {
      enabled: true,
      page: 1,
      limit: 10
    },
    
    // Transformação de dados
    transform: (data) => data.map(item => ({
      ...item,
      price: `R$ ${item.price.toFixed(2)}`
    })),
    
    // Callbacks personalizados
    onSuccess: (data) => console.log('Dados carregados:', data.length),
    onError: (error) => console.error('Erro ao carregar produtos:', error)
  });

  // Renderizar com paginação
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error message={error.message} onRetry={refetch} />
      ) : !products?.length ? (
        <Empty message="Nenhum produto encontrado" />
      ) : (
        <>
          <ul>
            {products.map(product => (
              <li key={product.id}>{product.name} - {product.price}</li>
            ))}
          </ul>
          
          {pagination && (
            <div className="pagination">
              <button 
                onClick={pagination.prevPage} 
                disabled={!pagination.hasPrevPage}
              >
                Anterior
              </button>
              
              <span>
                Página {pagination.page} de {pagination.totalPages}
              </span>
              
              <button 
                onClick={pagination.nextPage} 
                disabled={!pagination.hasNextPage}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

### Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `endpoint` | `string` | (obrigatório) | URL do endpoint da API |
| `method` | `'GET'` \| `'POST'` \| `'PUT'` \| `'DELETE'` \| `'PATCH'` | `'GET'` | Método HTTP |
| `params` | `object` | `null` | Parâmetros de query (para GET/DELETE) |
| `body` | `any` | `null` | Corpo da requisição (para POST/PUT/PATCH) |
| `headers` | `object` | `{}` | Cabeçalhos HTTP adicionais |
| `autoFetch` | `boolean` | `true` | Se deve buscar dados automaticamente |
| `useCache` | `boolean` | `false` | Se deve usar o sistema de cache |
| `cacheTime` | `number` | - | Tempo de expiração do cache em ms |
| `retry` | `boolean` | `true` | Se deve tentar novamente em caso de erro |
| `maxRetries` | `number` | `3` | Número máximo de tentativas |
| `retryDelay` | `number` | `1000` | Delay inicial entre tentativas (ms) |
| `onSuccess` | `(data) => void` | - | Callback chamado após sucesso |
| `onError` | `(error) => void` | - | Callback chamado após erro |
| `showSuccessNotification` | `boolean` | `false` | Exibir notificação de sucesso |
| `successTitle` | `string` | `'Sucesso'` | Título da notificação de sucesso |
| `successMessage` | `string` | `'Operação realizada com sucesso'` | Mensagem de sucesso |
| `showErrorNotification` | `boolean` | `true` | Exibir notificação de erro |
| `errorTitle` | `string` | `'Erro'` | Título da notificação de erro |
| `errorMessage` | `string` | `'Ocorreu um erro ao buscar os dados'` | Mensagem de erro |
| `transform` | `(data) => T` | - | Função para transformar os dados |
| `initialData` | `T` | `null` | Dados iniciais |
| `mockData` | `T` | `null` | Dados de simulação para testes |
| `mockDelay` | `number` | `0` | Delay simulado (ms) |
| `pagination` | `object` | `{ enabled: false, page: 1, limit: 10 }` | Configuração de paginação |

### Valor de retorno

O hook retorna um objeto com as seguintes propriedades:

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `data` | `T \| null` | Dados obtidos ou `null` |
| `isLoading` | `boolean` | Se está carregando dados |
| `isRefreshing` | `boolean` | Se está atualizando dados existentes |
| `error` | `Error \| null` | Objeto de erro ou `null` |
| `fetchData` | `() => Promise<T \| null>` | Função para buscar dados |
| `refetch` | `() => Promise<T \| null>` | Função para atualizar dados |
| `reset` | `() => void` | Função para resetar o estado |
| `hasError` | `boolean` | Se há um erro |
| `isSuccess` | `boolean` | Se a operação foi bem-sucedida |
| `pagination` | `object \| undefined` | Controles de paginação (quando habilitado) |

---

Para perguntas ou sugestões sobre o sistema de autenticação, consulte a documentação da API ou entre em contato com a equipe de desenvolvimento.