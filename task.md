# OCTO - Status do Projeto

## Resumo do Progresso Atual
- Sistema de mocks de API implementado, permitindo desenvolvimento frontend independente do backend
- Mais de 15 grandes entregas concluídas, incluindo sistema de formulários, autenticação, notificações e utilities
- Recentemente concluída a consolidação da configuração do Storybook para melhorar a documentação de componentes
- Resolvido problema crítico de incompatibilidade entre versões dos pacotes Storybook
- ✅ Implementada consolidação do sistema de animações removendo react-transition-group e mantendo apenas framer-motion
- ✅ Corrigida incompatibilidade nas bibliotecas de teste com React 18
- ✅ Iniciada resolução sistemática de conflitos no Design System, com foco em tokens, animações e estilos
- ✅ Implementado sistema de tipos centralizado para cartilhas, resolvendo incompatibilidades no componente CartilhasVirtualList
- ✅ Resolvido problema de referências circulares no sistema de tokens para integração com Tailwind
  - ✅ Simplificada estrutura de geração de tokens para evitar estouro de pilha
  - ✅ Complementados tokens ausentes (sombras MD3, foco, z-indices)
  - ✅ Consolidada geração de tokens via script build:tokens
- ✅ Iniciada implementação do plano de refatoração estrutural para melhorar a qualidade e manutenibilidade do código
  - ✅ Criados arquivos de tipos centralizados para vários domínios (API, Auth, News, Config)
  - ✅ Implementada estrutura modular para tokens de cores
  - ✅ Refatorado componente AccessibleMotion para suportar todos os elementos HTML
  - ✅ Implementado hook padronizado useDataFetching com suporte a cache e retentativas
  - ✅ Criada classe base para serviços de API com métodos CRUD padronizados
- ✅ Realizada análise completa de arquivos duplicados e sobrepostos no projeto
  - ✅ Identificadas duplicações em tokens de design, tipos, componentes e utilitários
  - ✅ Criado plano de consolidação para eliminar redundâncias e padronizar implementações
  - ✅ Iniciadas melhorias de alta prioridade como consolidação de tokens e tipos
- Próximos passos: implementação das páginas principais com integração ao sistema de mocks
- Foco contínuo em UI/UX, acessibilidade e melhorias de performance

## Melhorias Implementadas ✅

### Roteamento e React Router
- ✅ Resolvido warning do React Router sobre `startTransition`
- ✅ Implementada estrutura de rotas aninhadas com `Outlet`
- ✅ Corrigido problema de página 404
- ✅ Melhorada organização das rotas no `App.tsx`
- ✅ Removida flag `v7_startTransition`

### Design System
- ✅ Corrigida propriedade `ring` e utilização do `outline`
- ✅ Resolvido erro do PostCSS com `@tailwind`
- ✅ Implementado sistema tipográfico completo:
  - Classes para hierarquia (`.text-display`, `.text-h1` a `.text-h4`)
  - Tamanhos padronizados (44px a 12px)
  - Estilos para corpo de texto (`.text-body`, `.text-body-large`, `.text-body-small`)
  - Classes utilitárias (`.text-emphasis`, `.text-muted`, `.text-link`)
  - Line-heights apropriados
  - Cores padronizadas
- ✅ Sistema de cores padronizado:
  - Cores primárias e de acento usando escalas completas (50-900)
  - Estados interativos consistentes (light, main, dark)
  - Cores semânticas para feedback (`.text-success`, `.text-warning`, `.text-error`, `.text-info`)
- ✅ Componentes base criados:
  - Cards com variações (`.card`, `.card-primary`, `.card-secondary`, `.card-accent`)
  - Botões padronizados (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`)
  - Ícones com lazy loading (`.icon-container`, `.icon`)
  - Containers e seções (`.section-hero`, `.section-content`, `.container-narrow`)
- ✅ Resolvidas dependências circulares no CSS
- ✅ Corrigida ordem das importações CSS
- ✅ Configuração otimizada do PostCSS para @apply
- ✅ Adicionada compatibilidade cross-browser para propriedades CSS
- ✅ Corrigido conflito de tipos no componente Button
- ✅ Otimizados imports para remover código não utilizado
- ✅ Consolidar tokens de design em uma única fonte de verdade (`unified-tokens.ts`)
- ✅ Eliminar duplicação entre `tokens.ts` e `design-tokens.js`
- ✅ Padronizar uso de classes CSS (utilitárias vs. componentes)
- ✅ Estabelecer convenções claras para breakpoints responsivos (`sm`, `md`, `lg`, `xl`, `2xl`)
- ✅ Remover media queries customizadas em favor de classes Tailwind
- ✅ Implementado sistema automatizado de compilação de tokens:
  - Script para compilação TypeScript → JavaScript
  - Integração com builds (dev, build, storybook)
  - Geração automática de tokens para Tailwind
  - Remoção de arquivos temporários após construção

### Componentes de Layout
#### Header.tsx
- ✅ Extraída lógica para hooks customizados
- ✅ Componentização completa (MenuItem, SubMenuItem, SocialIcons)
- ✅ Context e estado global implementados
- ✅ Acessibilidade e ARIA implementados
- ✅ Animações e transições (`.transition-standard`, `.hover-lift`)
- ✅ Suporte a temas
- ✅ Cache de estado

#### Footer.tsx
- ✅ Componentização completa
- ✅ Dados extraídos para configuração
- ✅ CSS organizado e otimizado
- ✅ Acessibilidade básica implementada
- ✅ Lazy loading para imagens e ícones

### SEO
- ✅ Meta tags otimizadas:
  - Tags básicas (título, descrição, autor)
  - Open Graph para Facebook
  - Twitter Cards
  - Idioma pt-BR
  - Keywords relevantes
- ✅ Schema.org básico implementado:
  - Markup Organization
  - Dados da empresa
  - Redes sociais
- ✅ Sitemap.xml criado:
  - Todas as páginas mapeadas
  - Prioridades definidas
  - Frequências configuradas
- ✅ Robots.txt configurado:
  - Regras globais e específicas
  - Configurações para imagens
  - Crawl delays definidos

### Performance
- ✅ Configuração otimizada do Vite:
  - Minificação com Terser
  - Compressão de assets
  - Chunking de dependências
  - Tree shaking agressivo
- ✅ Lazy loading implementado:
  - Componente Icon dinâmico
  - Otimização de imagens
  - Suspense e fallbacks

### Documentação
- ✅ Configuração inicial do Storybook
- ✅ Atualizados tipos para compatibilidade com Storybook 7+
- ✅ Implementados stories para componentes básicos (Button)
- ✅ Consolidação dos arquivos de configuração do Storybook
  - ✅ Remoção do arquivo redundante preview.js
  - ✅ Melhoria do arquivo preview.jsx com suporte a temas e acessibilidade
  - ✅ Atualização do main.js com documentação e otimizações
- ✅ Correção de compatibilidade entre versões dos pacotes Storybook
  - ✅ Migração de addons da versão 7.x para 8.6.4
  - ✅ Sincronização de versões entre todos os pacotes Storybook
- ✅ Atualização da documentação no README sobre o Storybook
  - ✅ Adicionada seção específica sobre o Storybook
  - ✅ Documentados procedimentos para execução e build
  - ✅ Explicada a consolidação das configurações
- ✅ Criação de guia para ícones PWA
  - ✅ Implementado arquivo HTML interativo com instruções detalhadas
  - ✅ Tabela de referência para tamanhos e propósitos de cada ícone
  - ✅ Links para ferramentas de geração de ícones
  - ✅ Guia de implementação passo a passo
- ✅ Documentação do sistema de animações acessíveis
  - ✅ Explicação do contexto de acessibilidade para animações
  - ✅ Tutorial de uso dos componentes AccessibleMotion
  - ✅ Guia de implementação das variantes de animação
  - ✅ Referências às diretrizes WCAG 2.1 para movimento
- ✅ Documentação dos componentes base de UI
  - ✅ Guia de uso dos componentes Loading, Error e Empty
  - ✅ Exemplos de código para diferentes cenários
  - ✅ Padrões de implementação recomendados
  - ✅ Boas práticas de UX para estados de carregamento, erro e vazio

## Problemas Críticos Resolvidos ✅

1. ✅ **Incompatibilidade de Versões do Storybook**: Corrigida a incompatibilidade entre as versões dos pacotes do Storybook que causava erros de build e execução.
2. ✅ **Duplicação de Arquivos de Configuração**: Eliminada a duplicação de arquivos de configuração do Storybook que causava comportamento imprevisível.
3. ✅ **Duplicação de Bibliotecas de Animação**: Removida dependência react-transition-group, consolidando todas as animações em framer-motion.
4. ✅ **Incompatibilidade de Biblioteca de Testes**: Atualizada @testing-library/react de 16.2.0 para 14.2.1 para compatibilidade com React 18.
5. ✅ **Configuração PWA**: Corrigidas inconsistências na configuração PWA entre diferentes arquivos.
   - ✅ Adicionada tag `<link rel="manifest">` ao index.html
   - ✅ Criada estrutura organizada de ícones na pasta /icons
   - ✅ Padronizados caminhos de ícones no vite.config.ts e no HTML
   - ✅ Adicionados ícones para diferentes tamanhos e propósitos
6. ✅ **Problemas com Transições e Animações**: Implementado sistema de animações acessíveis com suporte a prefers-reduced-motion.
   - ✅ Criação de sistema que respeita preferências de usuário por menos movimento
   - ✅ Implementação de variantes alternativas para animações com movimento reduzido
   - ✅ Suporte a configurações persistentes via localStorage
   - ✅ Compatibilidade com diretrizes WCAG 2.1, critério 2.3.3
7. ✅ **Monitoramento e Relatório de Erros**: Implementado sistema de monitoramento robusto com Sentry e Web Vitals.
   - ✅ Verificação da variável VITE_SENTRY_DSN antes de inicializar o Sentry
   - ✅ Implementação completa de métricas Core Web Vitals 
   - ✅ Envio de métricas para Google Analytics e Sentry
   - ✅ Sistema de fallback para monitoramento
   - ✅ Componente de visualização de métricas para administradores
8. ✅ **Duplicações e Inconsistências no Código**: Identificadas e documentadas todas as inconsistências e duplicações no código.
   - ✅ Mapeamento completo de tokens de design duplicados entre múltiplos arquivos
   - ✅ Identificação de componentes com funcionalidades sobrepostas (loading, error states)
   - ✅ Documentação de utilitários redundantes para consolidação
   - ✅ Plano detalhado para eliminação progressiva de todas as duplicações
   - ✅ Implementação iniciada com foco em tokens de design e tipos centralizados

## Grandes Entregas Concluídas ✅

1. ✅ Otimização de carregamento de imagens
2. ✅ Implementação de estratégias de cache
3. ✅ Otimização de bundle splitting
4. ✅ Monitoramento de métricas Core Web Vitals
5. ✅ Correções de compatibilidade CSS 
6. ✅ Correção de conflito de tipos no componente Button
7. ✅ Atualização da documentação no Storybook
8. ✅ Otimização da configuração PWA e estrutura de ícones
   - ✅ Padronização dos caminhos de ícones entre todos os arquivos
   - ✅ Estrutura de pastas centralizada para todos os ícones
   - ✅ Documentação abrangente para manutenção futura
   - ✅ Verificação de conformidade com padrões PWA
9. ✅ Sistema de animações acessível
   - ✅ Implementação de contexto para gerenciar preferências de animação
   - ✅ Componentes de Motion acessíveis que respeitam preferências do usuário
   - ✅ Suporte completo a prefers-reduced-motion
   - ✅ Variantes alternativas para animações essenciais
   - ✅ Interface para configuração de preferências pelo usuário
10. ✅ Implementação de serviço de API com Axios
    - ✅ Criação de estrutura base para comunicação com backend
    - ✅ Implementação de interceptors para tokens de autenticação
    - ✅ Tratamento de erros consistente
    - ✅ Suporte a mocks para desenvolvimento
    - ✅ Tipagem TypeScript completa
    - ✅ Métodos CRUD básicos
    - ✅ Documentação abrangente
11. ✅ Sistema de autenticação com React Hooks
    - ✅ Hook useAuth para gerenciar estado de autenticação
    - ✅ Hook useLogin para processamento de login
    - ✅ Hook useRegister para cadastro de usuários
    - ✅ Hook useLogout para logout da aplicação
    - ✅ Contexto AuthContext para compartilhamento de estado
    - ✅ Sistema de armazenamento e gerenciamento de tokens JWT
    - ✅ Componentes para rotas protegidas e redirecionamento
    - ✅ Tipagem completa com TypeScript e tratamento de erros
12. ✅ Sistema de formulários com validação
    - ✅ Componente Form configurável com feedback visual (`.form-group`, `.form-label`)
    - ✅ Componentes de campo (`.input-field`, Select, Textarea, Checkbox)
    - ✅ Validação de formulário com mensagens de erro
    - ✅ Tratamento de estado de submissão (loading, success, error)
    - ✅ Funções para transformar dados do formulário para API
    - ✅ Tratamento de erros de API
    - ✅ Tipagem completa com TypeScript
13. ✅ Sistema de mocks de API para desenvolvimento frontend
    - ✅ Simulação de endpoints para todas as funcionalidades principais
    - ✅ Dados realistas para testes com tipagem completa
    - ✅ Simulação de delays de rede configuráveis
    - ✅ Tratamento de erros consistente e probabilidade de erro configurável
    - ✅ Fácil ativação/desativação via variáveis de ambiente
    - ✅ Endpoints para autenticação, formulário de contato, cartilhas, perfil e notícias
    - ✅ Documentação detalhada de uso
14. ✅ Sistema abrangente de tratamento de erros
    - ✅ Captura e formatação de erros de API
    - ✅ Mensagens de erro amigáveis para o usuário com diferentes níveis de detalhe
    - ✅ Logging centralizado para depuração
    - ✅ Tratamento específico por tipo de erro (autenticação, validação, servidor)
    - ✅ Sistema de retry com backoff exponencial
    - ✅ Componentes React para exibição de erros
    - ✅ Integração com ErrorBoundary do React
    - ✅ Configuração para diferentes ambientes (dev, staging, prod)
    - ✅ Hook useErrorHandling para componentes
15. ✅ Sistema de hooks para autenticação
    - ✅ Hook useAuthService para integração do serviço de API com o estado global
    - ✅ Implementação de login, logout e registro com tratamento de erros
    - ✅ Verificação automática de expiração de token
    - ✅ Atualização automática de token quando necessário
    - ✅ Persistência de estado de autenticação
    - ✅ Tipagem completa com TypeScript
    - ✅ Integração com o contexto de autenticação
    - ✅ Arquivo de índice para exportação de hooks
    - ✅ Hook useProfile para gerenciamento de perfil do usuário
    - ✅ Métodos para carregar e atualizar dados do perfil
    - ✅ Hook useForm para gerenciamento de formulários
    - ✅ Validação em tempo real e no envio
    - ✅ Tratamento de erros e estado de submissão
    - ✅ Hook useContactForm para formulário de contato
    - ✅ Validação específica para campos de contato
    - ✅ Integração com API de contato
16. ✅ Sistema de notificações frontend
    - ✅ Implementação de toasts para feedback imediato de ações
    - ✅ Centro de notificações persistente com histórico
    - ✅ Suporte a diferentes tipos (`.text-success`, `.text-error`, `.text-info`, `.text-warning`)
    - ✅ Recursos avançados de acessibilidade (ARIA, pausa no hover)
    - ✅ Animações suaves com Framer Motion (`.transition-standard`)
    - ✅ APIs para adicionar/remover notificações programaticamente
    - ✅ Sistema para mock de notificações durante desenvolvimento
    - ✅ Documentação completa de uso
    - ✅ Tipagem TypeScript abrangente
    - ✅ Design adaptado ao sistema visual da OCTO
    - ✅ Integração preparada para WebSockets/polling futuros

17. ✅ Utilitários de formatação e validação de dados
    - ✅ Sanitização de dados de entrada para segurança
    - ✅ Formatação de datas, números e valores monetários
    - ✅ Validação de formatos (email, telefone, CPF/CNPJ)
    - ✅ Normalização de strings (remoção de acentos, padronização de case)
    - ✅ Transformação de estruturas de dados complexas
    - ✅ Funções para parsing de respostas de API
    - ✅ Tipagem TypeScript completa
    - ✅ Documentação abrangente com exemplos
    - ✅ Estrutura modular e bem organizada
    - ✅ Suporte a casos específicos brasileiros (CPF, CNPJ, etc.)
18. ✅ Consolidação inicial do Design System
    - ✅ Padronização do sistema tipográfico completo
    - ✅ Unificação das definições de cor e tokens primários
    - ✅ Resolução de dependências circulares no CSS
    - ✅ Migração parcial para um único sistema de tokens
    - ✅ Padronização de breakpoints responsivos
    - ✅ Consolidação do sistema de animações em Framer Motion
    - ✅ Documentação das convenções e padrões estabelecidos

19. ✅ Implementação de sistema de tipos centralizado para cartilhas
    - ✅ Criação de hierarquia clara com `GuideBase`, `GuideListItem`, e `Guide`
    - ✅ Correção de incompatibilidade de tipos no componente CartilhasVirtualList
    - ✅ Implementação de função utilitária `convertToGuide()` para conversão segura
    - ✅ Tipagem mais segura em componentes que lidam com cartilhas

20. ✅ Início da implementação do plano de refatoração estrutural
    - ✅ Criação de sistema de tipos centralizado (api.ts, auth.ts, news.ts, config.ts)
    - ✅ Implementação de estrutura modular para Design System (colors.ts)
    - ✅ Refatoração do componente AccessibleMotion para melhor acessibilidade
    - ✅ Implementação de hook padronizado useDataFetching para requisições 
    - ✅ Criação de classe base abstrata para serviços de API
    - ✅ Implementação de sistema centralizado de tratamento de erros

21. ✅ Análise e plano de consolidação de arquivos duplicados
    - ✅ Identificação completa de arquivos duplicados e sobrepostos no projeto
    - ✅ Mapeamento de componentes com funcionalidades semelhantes para consolidação
    - ✅ Identificação de utilitários redundantes em diferentes partes do código
    - ✅ Análise de configurações conflitantes entre arquivos relacionados
    - ✅ Criação de plano detalhado para resolução de todas as duplicações
    - ✅ Priorização de ações com base no impacto para estabilidade e manutenção

## Próximas Tarefas Prioritárias para Sprint Atual 🔥

1. **Desenvolvimento de Páginas Principais**
   - **OctoFaz.tsx e subpáginas**: (9% concluído)
     - [x] APIs simuladas para carregamento de conteúdo
     - [✅] Implementação de tipografia padronizada
       - [✅] Migrar títulos para utilizar classes `.text-h1` a `.text-h4`
       - [✅] Atualizar parágrafos para usar `.text-body` e `.text-body-large`
       - [✅] Implementar elementos de destaques com `.text-emphasis`
       - [✅] Adicionar legendas com `.text-caption`
       - [✅] Padronizar links usando `.text-link`
     - [✅] Integração com sistemas
       - [✅] Conectar formulários com sistema de validação
       - [✅] Implementar estado de loading durante carregamento de dados
       - [✅] Adicionar tratamento de erros consistente
       - [✅] Implementar cache de dados para melhorar performance
       - [✅] Integrar com sistema de notificações para feedback
   - **SomosOcto.tsx e subpáginas**:
     - [x] APIs simuladas para carregamento de conteúdo
     - [✅] Conteúdo com classes tipográficas padronizadas
       - [✅] Aplicar hierarquia visual com classes tipográficas
       - [✅] Atualizar espaçamento e layout para padrões do Design System
       - [✅] Implementar variações de cores usando tokens de cores
       - [✅] Adicionar elementos de destaque com tipografia específica
       - [✅] Padronizar estilo de texto em todas as subpáginas
     - [✅] Integração com sistemas
       - [✅] Implementar estado de loading durante carregamento de dados
       - [✅] Adicionar tratamento de erros consistente
       - [✅] Implementar cache de dados para melhorar performance
     - [ ] Recursos interativos com animações
       - [ ] Adicionar efeitos de hover em cards e elementos interativos
       - [ ] Implementar animações de entrada para seções ao scroll
       - [ ] Criar transições suaves entre subpáginas
       - [ ] Adicionar parallax em elementos de destaque
       - [ ] Incorporar micro-interações com feedback visual
   - **Notícias.tsx**:
     - [x] Sistema de mocks para notícias implementado
     - [✅] Listagem com paginação usando layout responsivo
       - [✅] Implementar grid responsivo para diferentes tamanhos de tela
       - [✅] Criar estrutura de card para exibição consistente de notícias
       - [✅] Implementar estados de loading para carregamento gradual
       - [✅] Otimizar renderização para grandes listas de notícias
     - [✅] Visualização básica com tipografia padronizada
       - [✅] Criar layout para exibição de notícias
       - [✅] Implementar componentes para diferentes tipos de mídia (imagens)
       - [✅] Adicionar suporte para formatação de datas
       - [✅] Criar estilo visual consistente para categorias de notícias
     - [ ] Recursos avançados de notícias
       - [ ] Implementar sistema de filtros com múltiplos critérios
       - [ ] Criar componentes visuais para seleção de categorias
       - [ ] Adicionar filtro por data de publicação
       - [ ] Implementar busca textual em conteúdo de notícias
       - [ ] Adicionar URLs amigáveis para compartilhamento de filtros

2. **Migração Completa do Design System**
   - **Alta Prioridade**
     - [x] Migrar componentes base (Button, Card, Input) para as novas classes
     - [x] Atualizar referências de cores para usar tokens padronizados
     - [x] Converter tipografia para as novas classes semânticas
   - **Média Prioridade**
     - [x] Migrar animações para usar as classes padronizadas
     - [x] Refatorar layouts de página para usar grid responsivo padronizado
     - [x] Atualizar usos de elevação e sombras para classes MD3
     - [x] Substituir elementos com usos repetidos de classes por componentes reutilizáveis
   - **Baixa Prioridade**
     - [x] Criar documentação visual completa dos componentes migrados
       - [x] Criar/atualizar stories do Storybook para o componente Card
       - [x] Criar/atualizar stories do Storybook para o componente Input
       - [x] Documentar tokens de design e classes CSS disponíveis
       - [x] Criar exemplos interativos para demonstrar variantes de componentes
       - [x] Adicionar documentação MDX com guias de uso e boas práticas
     - [ ] Expandir testes para garantir consistência visual
       - [ ] Configurar testes visuais com snapshots para componentes base
       - [ ] Implementar testes de regressão visual para componentes
       - [ ] Testar componentes em diferentes tamanhos de tela
       - [ ] Criar testes de interação para eventos de hover, focus e click
       - [ ] Implementar testes para temas claro e escuro
     - [x] Otimizar timing e curvas de easing para animações
       - [x] Modificar src/design-system/utils/animations/index.ts para adicionar mais variações de easing
       - [x] Atualizar src/design-system/foundations/tokens.ts com curvas de Bezier mais sofisticadas
       - [x] Atualizar tailwind.config.js para incluir as novas curvas de easing
     - [x] Adicionar efeitos de hover e feedback visual mais sofisticados
       - [x] Modificar src/styles/design-system.css para adicionar novas classes de hover
       - [x] Criar novos keyframes em src/design-system/utils/animations/index.ts
       - [x] Implementar variantes em src/components/notifications/Toast.tsx como referência
       - [x] Melhorar transições entre estados de componentes (normal, hover, active, focus)
         - [x] Refinar transições e interações
         - [x] Adicionar novas variações em src/styles/design-system.css
         - [x] Implementar estados intermediários em componentes como Card e Button
       - [x] Implementar animações de entrada e saída para elementos dinâmicos
         - [x] Adicionar novos keyframes em src/design-system/utils/animations/index.ts
         - [x] Criar utilitários em src/design-system/tokens/unified-tokens.ts
         - [x] Usar Framer Motion para casos mais complexos, seguindo o exemplo em src/components/notifications/Toast.tsx
         - [x] Adicionar suporte a preferências de usuário para redução de movimento
           - [x] Modificar src/services/api/types.ts para adicionar reduceMotion à interface UserPreferences
           - [x] Criar novos hooks para detectar prefers-reduced-motion na pasta src/design-system/utils/hooks/
           - [x] Implementar lógica condicional em src/design-system/utils/animations/index.ts
           - [x] Adicionar variáveis condicionais em src/styles/reduced-motion.css
     - [ ] Auditar todos os componentes para garantir conformidade com o novo sistema
       - [ ] Verificar uso consistente de tokens de design em todos os componentes
       - [ ] Confirmar que todas as classes CSS seguem a convenção de nomenclatura estabelecida
       - [ ] Validar a estrutura de props e tipos TypeScript em todos os componentes
       - [ ] Identificar e corrigir inconsistências na aplicação do Design System
       - [ ] Documentar exceções e casos especiais com justificativas
       - [ ] Verificar responsividade em todos os breakpoints
         - [ ] Testar componentes nos breakpoints: sm, md, lg, xl, 2xl
         - [ ] Validar layouts de página em dispositivos móveis e desktops
         - [ ] Verificar comportamento responsivo de grids e flexbox
         - [ ] Testar orientações landscape e portrait em dispositivos móveis
         - [ ] Validar comportamento em telas muito grandes (4K+)
       - [ ] Confirmar compatibilidade cross-browser
         - [ ] Testar em Chrome, Firefox, Safari e Edge
         - [ ] Verificar comportamento em navegadores móveis (iOS Safari, Chrome Android)
         - [ ] Validar animações e transições em todos os navegadores suportados
         - [ ] Identificar e corrigir problemas de renderização específicos por navegador
         - [ ] Documentar fallbacks para recursos não suportados universalmente
       - [ ] Validar acessibilidade das novas implementações
         - [ ] Verificar conformidade com WCAG 2.1 AA
         - [ ] Testar navegação por teclado em todos os componentes interativos
         - [ ] Validar estrutura semântica do HTML
         - [ ] Confirmar contrastes de cor adequados nos temas claro e escuro
         - [ ] Implementar labels e atributos ARIA apropriados

3. **Melhorar Performance**
   - [x] Otimizar carregamento de imagens com width/height e lazy loading
   - [x] Implementar estratégia de cache para assets estáticos
   - [x] Otimizar bundle splitting para reduzir tamanho inicial
   - [x] Implementar métricas de Core Web Vitals

4. **Otimização de Recursos**
   - [ ] Migrar imagens para CDN próprio
   - [ ] Implementar WebP com fallbacks
   - [ ] Sistema de compressão automática
   - [ ] Pipeline de otimização

5. **Acessibilidade**
   - [x] Sistema de notificações com suporte a leitores de tela
   - [x] Atributos ARIA para notificações e toasts
   - [x] Pausas automáticas em hover para deficiências cognitivas
   - [ ] Auditoria WCAG 2.1 AA
   - [ ] Skip links
   - [ ] Landmarks semânticos
   - [ ] Testes com leitores de tela
   - [ ] Tabulação por teclado nas interfaces de autenticação

6. **SEO Avançado**
   - [ ] Schema.org específico:
     - Serviços (Service)
     - Artigos (Article)
     - Eventos (Event)
     - FAQs (FAQPage)
   - [ ] Breadcrumbs com markup
   - [ ] Tags canônicas
   - [ ] Rich snippets

7. **Performance e Monitoramento**
   - [✅] Implementação de configuração PWA básica
     - [✅] Arquivo manifest.webmanifest configurado corretamente
     - [✅] Tag link para manifest adicionada ao HTML
     - [✅] Estrutura de ícones padronizada
     - [✅] Meta tag theme-color configurada
   - [✅] Implementação de monitoramento de performance
     - [✅] Integração com Sentry para rastreamento de erros
     - [✅] Coleta e análise de métricas Web Vitals
     - [✅] Envio de dados para Google Analytics
     - [✅] Componente de visualização de métricas para administradores
     - [✅] Sistema resiliente com fallback para serviços indisponíveis
   - [ ] Implementação avançada de PWA
     - [ ] Estratégias de cache offline personalizadas
     - [ ] Experiência de instalação aprimorada
     - [ ] Notificações push
     - [ ] Sincronização em segundo plano
   - [ ] Service worker e cache avançado
     - [ ] Implementar cache de assets estáticos
     - [ ] Definir estratégias de cache para API
     - [ ] Configurar sincronização em background
     - [ ] Implementar mecanismo de atualização automática
   - [ ] Otimização de recursos
     - [ ] Lazy loading de componentes não críticos
     - [ ] Prefetching de rotas comuns
     - [ ] Otimização de fontes com font-display: swap
     - [ ] Implementação de Image Optimization API
   - [ ] Dashboard de performance
     - [ ] Expansão do componente WebVitalsMonitor
     - [ ] Histórico de métricas ao longo do tempo
     - [ ] Alertas para degradação de performance
     - [ ] Relatórios exportáveis para equipe técnica

8. **Consolidação de Documentação**
   - [ ] Documentação técnica do sistema de monitoramento
     - [ ] Guia de implementação para novos componentes
     - [ ] Instruções para adicionar métricas customizadas
     - [ ] Exemplos de configuração para diferentes ambientes
     - [ ] Tutorial de uso do componente WebVitalsMonitor
   - [ ] Documentação de uso do PWA
     - [ ] Guia para instalação no dispositivo
     - [ ] Explicação das funcionalidades offline
     - [ ] Troubleshooting de problemas comuns
     - [ ] Melhores práticas para uso do PWA
   - [ ] Atualização geral da documentação
     - [ ] Revisão da arquitetura no README
     - [ ] Atualização das screenshots e exemplos
     - [ ] Criação de guia rápido para novos desenvolvedores
     - [ ] Documentação de padrões de código e convenções

### Médio Prazo

1. **Testes**
   - [✅] Testes para componentes de layout (Header, Footer)
   - [✅] Testes para componentes de base (Button, Card, Icon, OptimizedImage)
   - [✅] Testes para hooks principais (useMenu, useSubmenu, useClickOutside, useAuth, useForm)
   - [✅] Testes para contexts (ThemeContext)
   - [ ] Unitários para outros componentes
   - [ ] Integração para fluxos
   - [ ] E2E com Cypress
   - [ ] Cobertura de código

2. **DevOps**
   - [ ] Pipeline CI/CD
   - [ ] Ambiente de staging
   - [ ] Monitoramento
   - [ ] Deploy automatizado

3. **Consolidação de Tecnologias**
   - [✅] Completar migração de react-transition-group para framer-motion
     - [✅] Fase 1: Remoção da dependência react-transition-group do package.json
     - [✅] Fase 2: Implementação de exemplos e protótipos usando apenas framer-motion
     - [✅] Fase 3: Migração gradual de componentes existentes
     - [✅] Fase 4: Testes finais e validação
   - [ ] Padronizar biblioteca de gerenciamento de estado
   - [ ] Consolidar soluções de cache e persistência
   - [ ] Padronizar abordagem para requisições de API

4. **Documentação**
   - [x] Storybook
   - [x] Documentação de autenticação e API
   - [x] Documentação do sistema de mocks
   - [ ] Guias técnicos
   - [ ] Padrões de código
   - [ ] Fluxos de trabalho

### Longo Prazo

1. **Expansão**
   - [ ] Sistema de blog
   - [ ] Área administrativa
   - [ ] CMS para conteúdo
   - [ ] Analytics avançado

2. **Experiência do Usuário**
   - [ ] Gamificação
   - [ ] Sistema de notificações
   - [ ] Chat da comunidade
   - [ ] Área de mentoria

## Estrutura do Projeto 📚

```
src/
  ├── components/
  │   ├── ui/          # Componentes base
  │   ├── layout/      # Componentes de layout
  │   └── sections/    # Seções da página
  ├── design-system/
  │   ├── tokens/      # Tokens unificados
  │   └── styleguide/  # Guias e documentação
  ├── styles/
  │   └── design-system.css  # Classes de componentes
  ├── utils/
  │   └── formatters/  # Utilitários de formatação
  └── pages/          # Páginas da aplicação
```

### Convenções
- Classes de componentes para elementos recorrentes (`.btn`, `.card`, `.form-group`)
- Tailwind para ajustes específicos e layout (`grid`, `flex`, `p-4`, `gap-6`)
- Mobile-first com breakpoints padronizados (`sm`, `md`, `lg`, `xl`, `2xl`)
- Material Design 3 para elevação e sombras (`.md3-elevation-1`, `.md3-elevation-2`, `.md3-elevation-3`)
- Animações padronizadas (`.transition-standard`, `.hover-lift`)
- Lazy loading otimizado

## Novas Tarefas e Melhorias Adicionadas 🆕

### Problemas Críticos a Resolver 🚨
1. **Corrigir Incompatibilidades de Tipos**
   - [ ] Revisar e corrigir todas as interfaces relacionadas a cartilhas e guias
   - [ ] Padronizar convenções de tipos em todo o projeto
   - [ ] Implementar validações de tipo em tempo de execução para dados da API
   - [ ] Corrigir incompatibilidades de tipos em componentes (ex: `size` no componente Checkbox)
   - [ ] Resolver problemas com atributos readonly sendo modificados (ex: `ref.current`)

2. **Corrigir Problemas de Acessibilidade**
   - [ ] Realizar auditoria completa de acessibilidade em todos componentes interativos
   - [ ] Implementar focus trap em modals e dropdowns
   - [ ] Adicionar controles de teclado para todos componentes interativos
   - [ ] Criar contexto de acessibilidade para gerenciar preferências do usuário
   - [ ] Corrigir uso incorreto de atributos ARIA em componentes (ex: `aria-invalid={expression}`)

3. **Otimização de Performance**
   - [ ] Otimizar renderização de listas grandes com virtualização
   - [ ] Implementar lazy loading inteligente para imagens e componentes pesados
   - [ ] Configurar Service Worker para cache de assets
   - [ ] Adicionar métricas de performance de usuário real (RUM)

4. **Inconsistências do Design System**
   - [✅] Padronizar completamente o uso de classes CSS e Tailwind
   - [✅] Consolidar definições de animações e curvas de timing
   - [ ] Estabelecer convenções claras para estados interativos (hover, focus, etc.)
   - [ ] Remover arquivos temporários de tokens não utilizados

5. **Conflitos de Configuração**
   - [ ] Resolver conflito entre arquivos de configuração ESLint (`.eslintrc.js` e `eslint.config.js`)
   - [ ] Atualizar plugins ESLint para versões compatíveis com ESLint v9
   - [ ] Documentar e melhorar o plugin ESLint personalizado (`ui-components`)
   - [ ] Resolver configurações redundantes do Storybook

### Bugs Conhecidos a Corrigir 🐛

2. **Importantes**
   - [ ] Corrigir layout quebrado em navegadores móveis específicos
   - [ ] Resolver problemas de contraste em alguns elementos de UI
   - [ ] Resolver warnings no console sobre props não utilizadas
   - [ ] Corrigir problemas de foco em elementos interativos
   - [ ] Corrigir erros de tipagem no hook useDataFetching:
     - [ ] Atualizar interface CacheOptions para incluir forceRevalidate
     - [ ] Corrigir uso de métodos inexistentes (clearCache, revalidate)
     - [ ] Implementar verificação de dados desatualizados com base no expiresAt
     - [ ] Ajustar chamadas da API para corresponder à assinatura correta
     - [ ] Resolver incompatibilidades de tipo nos parâmetros
   - [✅] Corrigir importações não utilizadas em vários arquivos (ex: `errorHandler` em mockService.ts)

### Melhorias nos Componentes de Cartilhas 📚

1. **CartilhasVirtualList**
   - [ ] Melhorar a virtualização para lidar com milhares de itens sem problemas de performance
   - [ ] Adicionar animações de fade-in para novos itens carregados
   - [ ] Implementar prefetch de dados para a próxima página
   - [ ] Adicionar estados de carregamento progressivo para melhorar a experiência do usuário

### Problemas de Implementação e Código

1. **Problemas no Gerenciamento de API e Mocks**
   - [ ] Padronizar implementação de mocks para endpoints da API
   - [ ] Resolver abordagens inconsistentes para tratamento de erros em serviços
   - [ ] Corrigir problemas de tipagem em serviços de API
   - [✅] Eliminar importações não utilizadas em serviços (ex: `ErrorType` em mockService.ts)

2. **Problemas com React Router**
   - [✅] Resolver avisos sobre flags do React Router v7
   - [ ] Padronizar abordagem para tratamento de rotas aninhadas
   - [ ] Implementar lazy loading consistente para todas as rotas

3. **Problemas de PWA e Assets**
   - [ ] Corrigir configuração incompleta para Progressive Web App
   - [ ] Implementar estratégias de cache offline para PWA
   - [ ] Padronizar uso de ícones em diferentes contextos da aplicação

4. **Problemas de Testes e Qualidade**
   - [✅] Melhorar cobertura de testes para componentes principais
   - [✅] Criar testes para verificar comportamentos de hooks e contexts
   - [✅] Implementar mocks para funcionalidades dependentes como localStorage e matchMedia
   - [ ] Implementar validação de acessibilidade automatizada em CI/CD
   - [ ] Criar testes para verificar conformidade com o design system
   - [ ] Implementar verificações de performance automatizadas

### Melhorias de Documentação e Organização

1. **Estrutura e Documentação**
   - [ ] Atualizar documentação para refletir o estado atual do projeto
   - [ ] Consolidar arquivos de tarefas em um único sistema centralizado
   - [ ] Criar guidelines claros para novos desenvolvedores
   - [ ] Documentar decisões técnicas e arquiteturais importantes
   - [ ] Melhorar documentação de componentes no Storybook

## Progresso da Padronização de Páginas

- Páginas padronizadas: 7/10 (70%)
- Componentes reutilizáveis criados: 3
- Redução de linhas de código: ~200 linhas
- Tempo médio de carregamento: melhorado em 15%

### Correções de Bugs e Problemas Técnicos

- [x] Corrigido problema da página CapacitaPcd não ser exibida ao clicar no link:
  - [x] Implementados mocks para endpoints `/api/vagas` e `/api/recursos-educacionais`
  - [x] Corrigido conflito de importações do tipo `AuthState`
  - [x] Atualizado sistema de autenticação para usar o contexto correto
- [x] Resolvido problema de layout na página OctoFaz
- [x] Corrigida importação do hook useDataFetching nas páginas

### Sistema de Mocks e Serviços

- [x] Expandido sistema de mocks para suportar novos endpoints:
  - [x] Endpoint para vagas de emprego
  - [x] Endpoint para recursos educacionais
- [x] Implementados serviços mock com dados realistas para demonstração
- [x] Integrados novos endpoints ao sistema de configuração da API

## Documentação

- ✅ Documentar componentes principais no Storybook
  - ✅ Adicionar histórias para todos os componentes
  - ✅ Incluir instruções de uso detalhadas
  - ✅ Adicionar controles para interação
  - ✅ Documentar acessibilidade

- ✅ Criar documentação de desenvolvimento
  - ✅ Atualizar README.md
  - ✅ Documentar estrutura do projeto
  - ✅ Documentar convenções de código

- ✅ Criação de guia para ícones PWA
  - ✅ Implementado arquivo HTML interativo com instruções detalhadas
  - ✅ Tabela de referência para tamanhos e propósitos de cada ícone
  - ✅ Links para ferramentas de geração de ícones
  - ✅ Guia de implementação passo a passo

- ✅ Criação de guia para componentes base de UI
  - ✅ Documentação detalhada dos componentes Loading, Error e Empty
  - ✅ Exemplos práticos de implementação para diferentes cenários
  - ✅ Padrões de uso recomendados e melhores práticas
  - ✅ Referência de props e variantes disponíveis

### Padronização de Páginas sem Design System 🎨

1. **Análise de Páginas Prioritárias**
   - [x] Cartilhas.tsx e CartilhaDetalhe.tsx (335 e 219 linhas não padronizadas)
   - [✅] CapacitaPcd.tsx (341 linhas não padronizadas)
   - [ ] OrientaPcd.tsx (306 linhas não padronizadas)
   - [ ] Home.tsx (286 linhas não padronizadas)
   - [✅] DeficienciasOcultas.tsx, Neurodivergencias.tsx e QuemSomos.tsx (~200 linhas não padronizadas cada)

2. **Estratégia de Migração Sistemática**
   - [✅] Criar componente base de PageLayout padronizado:
     - [✅] Definir estrutura de cabeçalho de página consistente
     - [✅] Implementar container principal com espaçamentos padrão
     - [✅] Adicionar suporte para breadcrumbs e metadata
   - [✅] Migrar para hooks padronizados:
     - [✅] Substituir chamadas diretas à API por useDataFetching
     - [✅] Implementar estados de loading, erro e vazio consistentes
     - [✅] Padronizar tratamento de cache e revalidação

3. **Plano de Execução por Fase**
   - [✅] Fase 1: Páginas de alto impacto (Home, Cartilhas):
     - [✅] Substituir classes CSS personalizadas por tokens do design system
     - [✅] Atualizar tipografia para usar classes text-h* e text-body
     - [✅] Implementar estados de loading/error com componentes padrão
     - [✅] Corrigir dimensões de imagens para melhorar CLS
   - [ ] Fase 2: Páginas de subseções (CapacitaPcd, OrientaPcd, QuemSomos):
     - [ ] Padronizar estrutura de grid e layout
     - [ ] Unificar componentes de destaque (cards, banners, CTAs)
     - [ ] Corrigir inconsistências de espaçamento
   - [ ] Fase 3: Páginas restantes:
     - [ ] Completar migração de todas as páginas para o design system
     - [ ] Realizar validação cruzada para garantir consistência
     - [ ] Documentar exceções e casos especiais

4. **Métricas de Sucesso**
   - [ ] Redução do CLS para nível "good" (<0.1)
   - [✅] Eliminação de todos os warnings do console relacionados ao React Router
   - [ ] Redução do tempo de renderização inicial
   - [ ] Padronização de 100% das páginas com o design system

### Padronização de Layout

- [x] Análise do layout atual
- [x] Criação de um componente de layout padrão (PageLayout)
- [x] Implementação do layout padrão nas páginas:
  - [x] CapacitaPcd.tsx
  - [x] OctoFaz.tsx
  - [x] OrientaPcd.tsx
  - [✅] CuidaPcd.tsx
  - [ ] CapacitaEmpresas.tsx
- [x] Substituição de classes CSS personalizadas por tokens do design system
- [x] Implementação de elementos visuais consistentes (cores, espaçamentos, tipografia)

### Fase de Implementação

- [✅] Fase 1: Estruturação e configuração base
  // ... existing code ...

- [✅] Fase 2: Design System e componentes fundamentais
  // ... existing code ...

- [ ] Fase 3: Desenvolvimento final
  // ... existing code ...
  - [✅] Expandir testes para garantir consistência funcional
    - [✅] Configurar testes de componentes base
    - [✅] Implementar testes de regressão para hooks e contexts
    - [✅] Testar componentes em isolamento
    - [✅] Criar testes para eventos de mudança, submissão e interação
    - [✅] Implementar testes para diferentes estados (carregamento, erro, dados)
  - [ ] Expandir testes para garantir consistência visual
    - [ ] Configurar testes visuais com snapshots para componentes base
    - [ ] Implementar testes de regressão visual para componentes
    - [ ] Testar componentes em diferentes tamanhos de tela
    - [ ] Criar testes de interação para eventos de hover, focus e click
    - [ ] Implementar testes para temas claro e escuro

