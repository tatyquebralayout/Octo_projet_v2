# OCTO Project

![OCTO Logo](https://iili.io/2pYE6Xe.png)

## 🐙 Sobre o Projeto

OCTO é uma plataforma dedicada a capacitar pessoas com deficiências ocultas e neurodivergentes, promovendo inclusão social, cultural e profissional. O projeto visa criar uma ponte entre PcDs, empresas e a sociedade, oferecendo recursos, treinamentos e suporte para uma inclusão mais efetiva.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) - Animações acessíveis
- [Lucide React](https://lucide.dev/)
- [Sentry](https://sentry.io/) - Monitoramento de erros
- [Web Vitals](https://web.dev/vitals/) - Métricas de performance

## 🔧 Instalação

```bash
# Clone este repositório
git clone https://github.com/tatyquebralayout/octo-project.git

# Acesse a pasta do projeto
cd octo-project

# Instale as dependências
npm install

# Execute a aplicação
npm run dev
```

## 📚 Storybook

Este projeto utiliza o Storybook para documentação e desenvolvimento de componentes isolados.

```bash
# Execute o Storybook
npm run storybook

# Build do Storybook
npm run build-storybook
```

### Configuração do Storybook

A configuração do Storybook está centralizada nos seguintes arquivos:

- `/.storybook/main.js` - Configura plugins, webpack e diretórios de histórias
- `/.storybook/preview.jsx` - Define decoradores, temas e configurações globais

> **Nota:** Em março de 2024, a configuração foi consolidada no arquivo `preview.jsx`, removendo o arquivo `preview.js` redundante para evitar conflitos.

O Storybook suporta temas claro e escuro, que podem ser alternados através da barra de ferramentas. Os componentes são renderizados com as configurações de acessibilidade apropriadas para garantir conformidade com WCAG.

## 🔄 Sistema de Animações Acessíveis

O projeto implementa um sistema de animações completamente acessível que respeita as preferências de usuários por movimento reduzido:

```jsx
import { AccessibleMotion } from 'src/design-system/components/AccessibleMotion';
import { fadeVariants } from 'src/design-system/utils/animations/accessible-variants';
import { useAnimation } from 'src/design-system/contexts/AnimationContext';

function MyComponent() {
  const { prefersReducedMotion } = useAnimation();
  
  // Seleciona automaticamente variantes baseadas na preferência do usuário
  const variants = prefersReducedMotion ? fadeVariants.reduced : fadeVariants.standard;
  
  return (
    <AccessibleMotion
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      essential={false}
    >
      Conteúdo Animado
    </AccessibleMotion>
  );
}
```

### Características principais:

- **Respeita `prefers-reduced-motion`**: Detecta automaticamente preferências do sistema
- **Contexto de Animações**: Gerencia preferências e permite configuração pelo usuário
- **Componentes Acessíveis**: Wrapper para Framer Motion com suporte a acessibilidade
- **Variantes Alternativas**: Versões reduzidas para cada tipo de animação
- **Conformidade com WCAG**: Implementa o critério 2.3.3 (Movimento, Piscar, Rolar)
- **Animações Essenciais**: Preserva animações críticas para a compreensão da interface
- **Persistência de Preferências**: Salva configurações via localStorage

### Configuração de preferências:

Os usuários podem personalizar suas preferências de animação através do componente `AnimationPreferences`, que permite:

1. Reduzir movimento (simplificar animações)
2. Desabilitar completamente animações não essenciais
3. Restaurar às configurações padrão do sistema

## 📊 Sistema de Monitoramento e Métricas

O projeto implementa um sistema abrangente para monitoramento de erros e coleta de métricas de performance:

```tsx
import { captureError, initializeMonitoring } from 'src/utils/monitoring';

// Inicialização do sistema de monitoramento
useEffect(() => {
  initializeMonitoring({
    enableSentry: true,
    enableWebVitals: true,
    enableGoogleAnalytics: true,
    enableConsoleLogging: process.env.NODE_ENV === 'development'
  });
}, []);

// Captura de erros em componentes
try {
  // código que pode gerar erros
} catch (error) {
  captureError(error, { 
    component: 'UserProfile', 
    action: 'loadUserData' 
  });
}
```

### Características principais:

- **Monitoramento Robusto**: Integração com Sentry para rastreamento de erros
- **Métricas Web Vitals**: Coleta automática de Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- **Envio para Google Analytics**: Métricas são enviadas como eventos para análise
- **Sistema em Camadas**: Continua funcionando mesmo quando um serviço falha
- **Componente de Visualização**: Exibe métricas de performance para administradores
- **Monitoramento Seguro**: Verifica variáveis de ambiente antes de inicializar serviços
- **Configuração Flexível**: Permite habilitar/desabilitar diferentes aspectos do monitoramento

### Métricas coletadas:

1. **Largest Contentful Paint (LCP)**: Mede o tempo de carregamento da maior imagem/texto
2. **First Input Delay (FID)**: Mede o tempo até que a página responda à primeira interação
3. **Cumulative Layout Shift (CLS)**: Mede a estabilidade visual durante o carregamento
4. **First Contentful Paint (FCP)**: Mede quando o primeiro conteúdo é renderizado
5. **Time to First Byte (TTFB)**: Mede a responsividade do servidor

O componente `WebVitalsMonitor` permite visualizar estas métricas em tempo real, classificando-as de acordo com as recomendações do Google (Bom, Precisa Melhorar, Ruim).

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens, ícones e outros recursos
├── components/      # Componentes React reutilizáveis
│   ├── common/     # Componentes comuns
│   ├── layout/     # Componentes de layout
│   └── sections/   # Seções da página
├── hooks/          # Custom React hooks
├── pages/          # Componentes de página
└── utils/          # Funções utilitárias
```

## 🌟 Funcionalidades

- **Capacitação PcD**: Programas de treinamento para pessoas com deficiência
- **Suporte Empresarial**: Consultoria para empresas sobre práticas inclusivas
- **Recursos Educacionais**: Cartilhas e materiais sobre deficiências ocultas
- **Comunidade**: Espaço para compartilhamento de experiências e networking
- **Blog e Notícias**: Conteúdo atualizado sobre inclusão e acessibilidade
- **Acessibilidade Integrada**: 
  - Sistema de animações que respeita preferências por movimento reduzido
  - Suporte completo a `prefers-reduced-motion`
  - Configurações personalizáveis pelo usuário
  - Compatibilidade com WCAG 2.1 AA
- **Monitoramento de Performance**:
  - Coleta e análise de Core Web Vitals
  - Integração com Sentry para rastreamento de erros
  - Componente para visualização de métricas em tempo real
  - Sistema de fallback para garantir funcionamento contínuo

## 🎨 Design System

O projeto utiliza um Design System para garantir consistência visual e comportamental em toda a aplicação.

### Componentes Base de UI

Os componentes base de UI padronizam estados comuns de interface, melhorando a experiência do usuário e a produtividade dos desenvolvedores:

#### Loading

O componente `Loading` oferece diferentes variantes para indicar estados de carregamento:

```tsx
// Básico
<Loading />

// Com variante e tamanho
<Loading variant="dots" size="lg" />

// Em tela cheia com overlay
<Loading fullPage overlay />

// Em botões
<button disabled={isLoading}>
  {isLoading ? (
    <span className="flex items-center">
      <Loading size="sm" variant="spinner" className="mr-2" />
      Processando...
    </span>
  ) : 'Enviar'}
</button>
```

#### Error

O componente `Error` exibe mensagens de erro com opções de recuperação:

```tsx
// Erro básico
<Error message="Não foi possível carregar os dados" />

// Com título e botão de retry
<Error
  title="Erro de conexão"
  message="Verifique sua conexão e tente novamente"
  onRetry={() => fetchData()}
/>

// Para formulários
<Error
  variant="inline"
  message="Email inválido"
/>
```

#### Empty

O componente `Empty` padroniza a exibição de estados vazios ou sem resultados:

```tsx
// Básico
<Empty message="Nenhum resultado encontrado" />

// Com ações
<Empty
  title="Sua lista de favoritos está vazia"
  message="Adicione itens aos seus favoritos para vê-los aqui"
  action={<button className="btn btn-primary">Explorar catálogo</button>}
/>
```

### Validação e Consistência

O projeto inclui ferramentas para garantir o uso consistente dos componentes base:

- **Testes automatizados**: Cada componente possui testes unitários abrangentes
- **Documentação no Storybook**: Exemplos interativos e documentação detalhada
- **Regras de linting personalizadas**: Detectam implementações inconsistentes
- **Guias de integração**: Documentação sobre migração e melhores práticas

Para mais detalhes, consulte a documentação completa no Storybook.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Taty Quebra Layout** - [GitHub](https://github.com/tatyquebralayout)

## 🙏 Agradecimentos

- Todas as pessoas que contribuíram para o projeto
- Comunidade de PcDs e neurodivergentes
- Empresas parceiras

## 📞 Contato

Para mais informações, entre em contato através do GitHub.

# Serviço de API OCTO

Este é o serviço de API para o projeto OCTO, uma aplicação React focada em inclusão para pessoas com deficiências ocultas e neurodivergência.

## Estrutura

O serviço de API está organizado da seguinte forma:

```
src/services/api/
├── apiService.ts         # Serviço principal que encapsula Axios
├── authService.ts        # Serviço de autenticação
├── config.ts             # Configurações e endpoints
├── contentService.ts     # Serviço para gerenciamento de conteúdo
├── index.ts              # Ponto de entrada principal do módulo
├── mockData.ts           # Dados mock para desenvolvimento
├── mockService.ts        # Serviço de mock para desenvolvimento
├── resourcesService.ts   # Serviço para gerenciamento de recursos
└── types.ts              # Definições de tipos TypeScript
```

## Características

O serviço de API inclui:

- **Interceptors de autenticação**: Anexa automaticamente tokens de autenticação às requisições
- **Tratamento de erros consistente**: Formata erros de forma padronizada para toda a aplicação
- **Suporte a mock em desenvolvimento**: Facilita o desenvolvimento sem um backend ativo
- **Tipagem TypeScript completa**: Fornece autocompletar e type-safety em toda a aplicação
- **Métodos CRUD padrão**: Implementa operações comuns (GET, POST, PUT, PATCH, DELETE)
- **Renovação automática de token**: Tenta renovar o token quando expirado

## Como usar

### Configuração

O serviço pode ser configurado através de variáveis de ambiente:

```
VITE_API_URL=https://api.octo.org.br/v1
VITE_ENABLE_MOCKS=true
```

### Exemplos básicos

#### Autenticação

```typescript
import { authService } from 'src/services/api';

// Login
async function handleLogin(email: string, password: string) {
  try {
    const response = await authService.login({ email, password });
    
    if (response.success) {
      // Usuário autenticado com sucesso
      const { user, token } = response.data;
      console.log(`Bem-vindo, ${user.name}!`);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}

// Verificar se está autenticado
const isLoggedIn = authService.isAuthenticated();

// Obter usuário atual
const currentUser = authService.getUser();

// Sair do sistema
await authService.logout();
```

#### Conteúdo

```typescript
import { contentService } from 'src/services/api';

// Listar artigos com paginação
async function fetchArticles(page = 1, limit = 10) {
  try {
    const response = await contentService.getArticles({ page, limit });
    
    if (response.success) {
      const { data: articles, pagination } = response.data;
      console.log(`Mostrando ${articles.length} de ${pagination.total} artigos`);
      return articles;
    }
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}

// Obter detalhes de um curso
async function getCourseDetails(courseId: string) {
  try {
    const response = await contentService.getCourseById(courseId);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    return null;
  }
}

// Pesquisar conteúdo
async function searchContent(query: string) {
  try {
    const response = await contentService.searchContent(query);
    return response.data;
  } catch (error) {
    console.error('Erro ao pesquisar:', error);
    return { articles: [], courses: [] };
  }
}
```

#### Recursos

```typescript
import { resourcesService } from 'src/services/api';

// Obter recursos por categoria
async function getResourcesByCategory(category: string) {
  try {
    const response = await resourcesService.getResourcesByCategory(category);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar recursos:', error);
    return { guides: [], tools: [], videos: [] };
  }
}

// Obter detalhes de um guia
async function getGuideDetails(guideId: string) {
  try {
    const response = await resourcesService.getGuideById(guideId);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar guia:', error);
    return null;
  }
}
```

### Habilitando/Desabilitando Mocks

```typescript
import { apiService } from 'src/services/api';

// Habilitar mocks
apiService.setMockEnabled(true);

// Desabilitar mocks
apiService.setMockEnabled(false);
```

## Contribuindo

Ao adicionar novos endpoints ou funcionalidades:

1. Atualize o arquivo `types.ts` com novas interfaces ou tipos
2. Adicione novos endpoints ao arquivo `config.ts` 
3. Adicione dados mock ao arquivo `mockData.ts` para testes
4. Implemente os métodos correspondentes no serviço apropriado

## Licença

Este projeto é licenciado sob os termos da licença MIT.

# OCTO - Sistema de Hooks

## Visão Geral

Este projeto implementa um sistema completo de hooks para gerenciar autenticação, perfil de usuário e formulários em uma aplicação React. Os hooks são projetados para serem reutilizáveis, tipados e fáceis de integrar com componentes React.

## Hooks Implementados

### Autenticação

- **useAuthService**: Integra o serviço de API de autenticação com o estado global
  - Login, logout e registro de usuários
  - Verificação automática de expiração de token
  - Atualização automática de token
  - Tratamento de erros

### Perfil de Usuário

- **useProfile**: Gerencia o perfil do usuário
  - Carregamento de dados do perfil
  - Atualização de dados do perfil
  - Tratamento de erros

### Formulários

- **useForm**: Hook genérico para gerenciar formulários
  - Validação em tempo real e no envio
  - Tratamento de erros
  - Estado de submissão
  - Tipagem completa

- **useContactForm**: Hook específico para o formulário de contato
  - Validação específica para campos de contato
  - Integração com API de contato

## Como Usar

### Autenticação

```tsx
import { useAuthService } from 'src/hooks';

const LoginComponent = () => {
  const { login, isLoading, error } = useAuthService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirecionar após login bem-sucedido
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
    </form>
  );
};
```

### Perfil de Usuário

```tsx
import { useProfile } from 'src/hooks';

const ProfileComponent = () => {
  const { profile, loading, error, loadProfile, updateProfile } = useProfile();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleUpdate = async (data) => {
    try {
      await updateProfile(data);
      // Feedback de sucesso
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          {/* Outros dados do perfil */}
        </div>
      )}
    </div>
  );
};
```

### Formulário de Contato

```tsx
import { useContactForm } from 'src/hooks';

const ContactForm = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <p>{errors.name}</p>}
      </div>

      {/* Outros campos do formulário */}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};
```

## Arquitetura

O sistema de hooks é construído sobre uma arquitetura de serviços de API e estado global:

1. **Serviços de API**: Implementam a comunicação com o backend
2. **Estado Global**: Gerencia o estado da aplicação usando Context API
3. **Hooks**: Conectam os serviços de API com o estado global e os componentes

Esta arquitetura permite uma separação clara de responsabilidades e facilita a manutenção e testabilidade do código.