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
- [Lucide React](https://lucide.dev/)

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