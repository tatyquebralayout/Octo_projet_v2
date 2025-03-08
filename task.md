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
   - [ ] Unitários para componentes
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
   - [✅] Resolver incompatibilidade entre `GuideListItem` e `Guide` no componente CartilhasVirtualList
     - [✅] Resolvido problema entre `GuideListItem` (downloadUrl opcional) e `Guide` (downloadUrl obrigatório)
     - [✅] Implementada solução com tipos centralizados e função de conversão segura
     - [✅] Melhorada manutenibilidade com hierarquia clara de tipos
   - [ ] Revisar e corrigir todas as interfaces relacionadas a cartilhas e guias
   - [ ] Padronizar convenções de tipos em todo o projeto
   - [ ] Implementar validações de tipo em tempo de execução para dados da API

2. **Corrigir Problemas de Acessibilidade**
   - [x] Corrigir atributos ARIA inválidos no componente Card
   - [ ] Realizar auditoria completa de acessibilidade em todos componentes interativos
   - [ ] Implementar focus trap em modals e dropdowns
   - [ ] Adicionar controles de teclado para todos componentes interativos
   - [ ] Criar contexto de acessibilidade para gerenciar preferências do usuário

3. **Otimização de Performance**
   - [x] Implementar backoff exponencial para retentativas de API
   - [ ] Otimizar renderização de listas grandes com virtualização
   - [ ] Implementar lazy loading inteligente para imagens e componentes pesados
   - [ ] Configurar Service Worker para cache de assets
   - [ ] Adicionar métricas de performance de usuário real (RUM)

4. **Inconsistências do Design System**
   - [✅] Resolver duplicidade de tokens entre `unified-tokens.ts` e `design-tokens.js`
   - [✅] Eliminar dependência do react-transition-group para animações
   - [✅] Resolver dependências circulares no CSS
   - [✅] Corrigir problemas de referências circulares nos tokens para integração com Tailwind
     - [✅] Resolvido erro de estouro de pilha (Maximum call stack size exceeded)
     - [✅] Implementada estrutura simplificada para evitar circularidade
     - [✅] Adicionados tokens ausentes (sombras MD3, focus, modalBackdrop)
   - [ ] Padronizar completamente o uso de classes CSS e Tailwind
   - [ ] Consolidar definições de animações e curvas de timing
   - [ ] Estabelecer convenções claras para estados interativos (hover, focus, etc.)
   - [ ] Eliminar inconsistências de tema entre componentes
   - [ ] Implementar validações automáticas para conformidade com o Design System

### Melhorias de Infraestrutura 🔧

1. **Otimização da pasta `/public`**
   - [✅] Implementada estrutura organizada para ícones PWA
     - [✅] Criada pasta `/icons` para centralizar todos os ícones
     - [✅] Padronizados nomes e tamanhos dos ícones
     - [✅] Criado guia de referência para manutenção futura
   - [✅] Melhorado arquivo manifest.webmanifest
     - [✅] Atualizada descrição e cores para consistência
     - [✅] Padronizados caminhos para ícones
     - [✅] Adicionado suporte para ícones maskable
   - [ ] Revisar e otimizar `robots.txt` para melhor indexação
   - [ ] Atualizar `sitemap.xml` para incluir novas páginas
   - [ ] Implementar cache agressivo para arquivos estáticos no `.htaccess`
   - [ ] Adicionar mais metadados Open Graph no `index.html`

2. **Configuração do Storybook**
   - [✅] Consolidar arquivos de configuração no diretório `.storybook`
     - [✅] Remover arquivo duplicado `preview.js`
     - [✅] Melhorar configuração em `preview.jsx`
     - [✅] Atualizar e documentar `main.js`
   - [✅] Corrigir compatibilidade de versões do Storybook
     - [✅] Atualizar todos os pacotes para versão 8.6.4
     - [✅] Resolver conflitos de dependências
   - [✅] Implementar decoradores para tema
   - [✅] Configurar suporte de acessibilidade via addon-a11y
   - [✅] Atualizar documentação no README.md
   - [ ] Criar histórias para todos os componentes principais
   - [ ] Integrar testes visuais automatizados no Storybook

3. **Consolidação do Sistema de Animações**
   - [✅] Fase 1: Remover dependência react-transition-group
     - [✅] Removida dependência do package.json
     - [✅] Instaladas dependências atualizadas
     - [✅] Resolvidas incompatibilidades com pacotes de teste
   - [✅] Fase 2: Refatorar animações existentes
     - [✅] Auditar usos atuais de react-transition-group no código
     - [✅] Identificar componentes que utilizavam ambas as bibliotecas simultaneamente
     - [✅] Criar sistema de variantes para framer-motion
     - [✅] Implementar componente wrapper AccessibleMotion
     - [✅] Avaliar impacto em performance nos componentes migrados
   - [✅] Fase 3: Implementar estratégia para todas as animações
     - [✅] Definir abordagem para respeitar prefers-reduced-motion
     - [✅] Criar sistema de contexto para animações acessíveis
     - [✅] Implementar lógica de detecção de preferências do usuário
     - [✅] Desenvolver variantes alternativas para movimento reduzido
     - [✅] Adicionar suporte a localStorage para persistência de preferências
   - [✅] Fase 4: Padronizar uso do Framer Motion
     - [✅] Criar guia de implementação padronizada
     - [✅] Documentar abordagens recomendadas para diferentes tipos de animação
     - [✅] Estabelecer convenções para nomeação e estruturação das animações
     - [✅] Desenvolver exemplos de implementação para casos comuns

4. **Organização de Código**
   - [ ] Reorganizar pastas por domínio ao invés de tipo
   - [ ] Criar arquivos de barril (index.ts) para todas as pastas
   - [ ] Padronizar nomenclatura de arquivos e componentes
   - [ ] Implementar imports organizados com aliases consistentes
   - [ ] Revisar e atualizar documentação de código

### Refinamentos do Design System 🎨

1. **Componentes Base**
   - [ ] Revisar e atualizar sistema de tipos para componentes base
   - [ ] Implementar variantes mais flexíveis para Card e Button
   - [ ] Criar componentes compostos para padrões comuns de UI
   - [ ] Adicionar testes unitários para todos componentes do Design System
   - [ ] Documentar padrões de uso e exemplos interativos

2. **Acessibilidade e Internacionalização**
   - [✅] Implementar sistema de animações acessíveis (WCAG 2.1, critério 2.3.3)
   - [✅] Criar contexto para gerenciamento de preferências de animação
   - [✅] Desenvolver componentes que respeitem prefers-reduced-motion
   - [✅] Adicionar interface de usuário para configuração de preferências de movimento
   - [ ] Implementar suporte completo para i18n em todos componentes
   - [ ] Criar contexto de tema com suporte para alto contraste
   - [ ] Adicionar suporte para texto e controles redimensionáveis
   - [ ] Implementar testes automatizados para acessibilidade
   - [ ] Criar guidelines de acessibilidade para desenvolvedores

3. **Tokens e Estilos**
   - [✅] Revisar e consolidar tokens de design para consistência
     - [✅] Identificação e correção de referências circulares nos tokens
     - [✅] Complementação de tokens ausentes necessários ao CSS
     - [✅] Remover arquivos redundantes após migração
   - [ ] Implementar variantes de tema (claro, escuro, alto contraste)
   - [ ] Criar sistema de formatação para valores regionais (datas, números)
   - [ ] Otimizar sistema de cores para garantir contraste adequado
   - [ ] Documentar sistema de espaçamento e grid

### DevOps e Qualidade 🔄

1. **Testes Automatizados**
   - [ ] Implementar testes unitários para todos componentes críticos
   - [ ] Configurar testes E2E para fluxos principais do usuário
   - [ ] Implementar testes de regressão visual
   - [ ] Adicionar testes de performance e carga
   - [ ] Configurar relatórios de cobertura de código

2. **CI/CD**
   - [ ] Configurar pipeline de integração contínua
   - [ ] Implementar deploys automáticos para ambientes de teste
   - [ ] Criar processo de release automatizado
   - [ ] Adicionar verificações de segurança ao pipeline
   - [ ] Implementar monitoramento de produção

### Bugs Conhecidos a Corrigir 🐛

1. **Críticos**
   - [✅] Corrigir erro no componente CartilhasVirtualList relacionado a tipos
     - [✅] Resolvido problema entre `GuideListItem` (downloadUrl opcional) e `Guide` (downloadUrl obrigatório)
     - [✅] Implementada solução com tipos centralizados e função de conversão segura
     - [✅] Melhorada manutenibilidade com hierarquia clara de tipos
   - [✅] Resolver problemas de acessibilidade no Card e Button
     - [✅] Adicionado suporte a teclado para Card interativo
     - [✅] Melhorada semântica com atributos ARIA apropriados
     - [✅] Corrigido foco visual para melhor acessibilidade
   - [✅] Corrigir problema de memória em listas grandes
     - [✅] Otimizada memoização de componentes
     - [✅] Implementada comparação personalizada para evitar rerenderizações
     - [✅] Limitado número de itens pré-renderizados
   - [✅] Resolver erros de cache que causam dados desatualizados
     - [✅] Adicionado mecanismo de revalidação automática
     - [✅] Implementada detecção de dados obsoletos
     - [✅] Adicionadas funções para limpar e revalidar cache manualmente
   - [✅] Corrigir comportamento errático da paginação em telas pequenas
     - [✅] Implementada detecção de tamanho de tela
     - [✅] Ajustado layout para dispositivos móveis
     - [✅] Reduzido número de páginas visíveis em telas pequenas

2. **Importantes**
   - [ ] Corrigir layout quebrado em navegadores móveis específicos
   - [ ] Resolver problemas de contraste em alguns elementos de UI
   - [✅] Corrigir animações que podem causar problemas em dispositivos antigos
   - [✅] Implementar sistema que respeite prefers-reduced-motion
   - [✅] Oferecer alternativas para animações com movimento intenso
   - [ ] Resolver warnings no console sobre props não utilizadas
   - [ ] Corrigir problemas de foco em elementos interativos
   - [ ] Corrigir erros de tipagem no hook useDataFetching:
     - [ ] Atualizar interface CacheOptions para incluir forceRevalidate
     - [ ] Corrigir uso de métodos inexistentes (clearCache, revalidate)
     - [ ] Implementar verificação de dados desatualizados com base no expiresAt
     - [ ] Ajustar chamadas da API para corresponder à assinatura correta
     - [ ] Resolver incompatibilidades de tipo nos parâmetros

### Novos Bugs Identificados no Console 🚨

1. **Avisos do React Router**
   - [✅] Resolver avisos de flags futuras do React Router:
     - [✅] Configurar flag `v7_startTransition` para migrar proativamente para React Router v7
     - [✅] Configurar flag `v7_relativeSplatPath` para resolver problemas com rotas splat
   
2. **Problemas de Atributos React**
   - [✅] Corrigir warning sobre atributo `fetchPriority` não reconhecido:
     - [✅] Substituir por atributo em lowercase `fetchpriority` ou removê-lo dos elementos `img`
     - [✅] Atualizar componentes que usam este atributo (especialmente na página Home)

3. **Erro de WebSocket para Dev Server**
   - [✅] Corrigir erro de conexão WebSocket no HMR (Hot Module Replacement):
     - [✅] Resolver problema de URL inválida: `ws://localhost:undefined/?token=9hTwwBBhIaR6`
     - [✅] Configurar corretamente a porta WebSocket em `vite.config.ts`
     - [✅] Adicionar fallback para casos onde a porta não está definida

4. **Falhas de Importação Dinâmica**
   - [✅] Resolver erro de carregamento de módulos dinâmicos:
     - [✅] Corrigir caminhos para `src/pages/somos-octo/QuemSomos.tsx`
     - [✅] Verificar se o arquivo existe e está no local correto
     - [✅] Implementar fallback para caso de erro de carregamento
     - [✅] Atualizar imports lazy no roteamento
   
5. **Problemas de Métricas de Performance**
   - [✅] Melhorar CLS (Cumulative Layout Shift) que está atualmente em nível "poor" (0.48):
     - [✅] Definir dimensões explícitas para imagens
     - [✅] Evitar inserções dinâmicas que causam deslocamento de layout
     - [✅] Revisar animações que podem causar deslocamento de conteúdo
     - [✅] Implementar placeholders com dimensões fixas durante carregamento

### Melhorias nos Componentes de Cartilhas 📚

1. **CartilhasVirtualList**
   - [x] Corrigir incompatibilidade entre `GuideListItem` e `Guide` no componente
   - [ ] Melhorar a virtualização para lidar com milhares de itens sem problemas de performance
   - [ ] Adicionar animações de fade-in para novos itens carregados
   - [ ] Implementar prefetch de dados para a próxima página
   - [ ] Adicionar estados de carregamento progressivo para melhorar a experiência do usuário

2. **GuidesFilter**
   - [ ] Melhorar acessibilidade dos controles de filtro
   - [ ] Otimizar performace de filtragem para grandes conjuntos de dados
   - [ ] Implementar persistência de preferências de filtro
   - [ ] Adicionar filtros avançados (intervalo de datas, múltiplas tags)
   - [ ] Criar URL amigáveis que reflitam o estado dos filtros

3. **Sistema de Cache e Resiliência**
   - [x] Implementar backoff exponencial para retentativas de API
   - [x] Adicionar suporte a configurações de retry por ambiente
   - [ ] Implementar cache em vários níveis (memória, localStorage, IndexedDB)
   - [ ] Criar sistema de sincronização offline para uso sem conectividade
   - [ ] Adicionar suporte a websockets para atualizações em tempo real de cartilhas populares

4. **Experiência do Usuário**
   - [ ] Implementar sistema de avaliação e feedback para cartilhas
   - [ ] Adicionar recursos de compartilhamento em redes sociais
   - [ ] Criar sistema de recomendações baseado em interesses do usuário
   - [ ] Implementar notificações para novas cartilhas em categorias favoritas
   - [ ] Adicionar visualização prévia de conteúdo em hover

2. **Implementar Plano de Consolidação de Arquivos Duplicados**
   - [✅] Tokens de Design:
     - [✅] Consolidar todas as definições de cores em `colors.ts`
     - [✅] Criar arquivo centralizado para tipografia
     - [✅] Criar arquivo centralizado para espaçamento
     - [✅] Criar arquivo centralizado para sombras
     - [✅] Resolver problemas de referências circulares nos tokens
     - [✅] Complementar tokens ausentes necessários ao CSS
     - [✅] Remover arquivos redundantes após migração
   - [ ] Componentes com Funcionalidades Semelhantes:
     - [✅] Implementar componentes base para estados de UI (Loading, Error, Empty)
     - [✅] Migrar componentes principais para usar componentes base
     - [✅] Completar migração de componentes com animações para usar framer-motion (100% concluído)
   - [ ] Utilitários Redundantes:
     - [✅] Consolidar hooks de fetch de dados em `useDataFetching`
     - [✅] Criar biblioteca centralizada para funções de formatação
     - [✅] Migrar componentes para usar utilitários centralizados
   - [ ] Configurações Conflitantes:
     - [✅] Unificar definições de tema em uma única fonte
     - [✅] Consolidar configurações de ESLint
   - [✅] Sistema de Geração de Tokens:
     - [✅] Implementar sistema automatizado de compilação de tokens:
       - [✅] Criar script para compilação TypeScript → JavaScript
       - [✅] Integrar com build process (dev, build, storybook)
       - [✅] Configurar geração dinâmica para Tailwind
       - [✅] Simplificar estrutura para evitar referências circulares
     - [✅] Remover arquivos redundantes após migração:
       - [✅] Identificação de arquivos obsoletos
       - [✅] Remoção de `design-tokens.js`
       - [✅] Verificação de dependências

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
   - [ ] CapacitaPcd.tsx (341 linhas não padronizadas)
   - [ ] OrientaPcd.tsx (306 linhas não padronizadas)
   - [ ] Home.tsx (286 linhas não padronizadas)
   - [ ] DeficienciasOcultas.tsx, Neurodivergencias.tsx e QuemSomos.tsx (~200 linhas não padronizadas cada)

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
   - [ ] Fase 1: Páginas de alto impacto (Home, Cartilhas):
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

