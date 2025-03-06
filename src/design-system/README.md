# OCTO Design System

Este documento descreve o Design System do projeto OCTO, suas convenções e como utilizá-lo corretamente para manter a consistência visual e melhorar a experiência do usuário.

## Índice

- [Cores](#cores)
- [Tipografia](#tipografia)
- [Espaçamento](#espaçamento)
- [Elevação e Sombras](#elevação-e-sombras)
- [Componentes](#componentes)
- [Acessibilidade](#acessibilidade)
- [Animações](#animações)
- [Utilização](#utilização)

## Cores

Nossa paleta de cores foi cuidadosamente selecionada para refletir os valores da marca OCTO e proporcionar uma experiência visual acessível.

### Cores Principais

- **Primary (Roxo)**: Representa a marca OCTO e é usada para elementos principais de interação
  - Variante principal: `primary-400` (#972ae6)
  - Use tonalidades mais claras (50-300) para fundos e mais escuras (500-900) para elementos com mais contraste

### Cores Secundárias

- **Secondary (Azul)**: Complementa a cor primária e é usada para elementos secundários
  - Variante principal: `secondary-400` (#1ab3ff)

### Cores de Acentuação

- **Accent (Amarelo)**: Usada para chamar atenção para elementos específicos
  - Variante principal: `accent-400` (#ffd91a)

### Cores Semânticas

- **Success**: `#10b981` - Para mensagens de sucesso e confirmação
- **Warning**: `#f59e0b` - Para alertas e avisos
- **Error**: `#ef4444` - Para erros e mensagens críticas
- **Info**: `#3b82f6` - Para informações neutras

### Uso de Cores

```tsx
// Exemplo de uso com classes Tailwind
<div className="bg-primary-400 text-white">Conteúdo</div>
<div className="bg-secondary-50 text-secondary-800">Conteúdo</div>
<div className="text-error">Mensagem de erro</div>
```

## Tipografia

O sistema utiliza principalmente a fonte **Poppins** em várias espessuras para criar hierarquia e facilitar a leitura.

### Tamanhos de Texto

- **xs**: 0.75rem (12px) - Texto muito pequeno, use com moderação
- **sm**: 0.875rem (14px) - Texto auxiliar, legendas
- **base**: 1rem (16px) - Corpo de texto padrão
- **lg**: 1.125rem (18px) - Subtítulos, texto destacado
- **xl**: 1.25rem (20px) - Títulos de seção menores
- **2xl**: 1.5rem (24px) - Títulos de seção
- **3xl**: 1.875rem (30px) - Títulos de página
- **4xl**: 2.25rem (36px) - Títulos principais
- **5xl**: 3rem (48px) - Títulos de destaque, banners

### Espessuras

- **light**: 300 - Texto mais leve, use para blocos grandes de texto
- **normal**: 400 - Corpo de texto padrão
- **medium**: 500 - Subtítulos, texto levemente destacado
- **semibold**: 600 - Títulos, botões
- **bold**: 700 - Elementos de destaque

### Uso de Tipografia

```tsx
// Exemplo de uso com classes Tailwind
<h1 className="text-4xl font-bold">Título Principal</h1>
<h2 className="text-2xl font-semibold">Título de Seção</h2>
<p className="text-base">Texto normal do parágrafo</p>
<span className="text-sm text-gray-500">Texto auxiliar menor</span>
```

## Espaçamento

O sistema segue uma escala de espaçamento consistente baseada em múltiplos de 4px.

- **0**: 0px
- **0.5**: 2px
- **1**: 4px
- **2**: 8px
- **4**: 16px
- **6**: 24px
- **8**: 32px
- **12**: 48px
- **16**: 64px
- etc.

### Uso de Espaçamento

```tsx
// Exemplo de uso com classes Tailwind
<div className="p-4">Padding de 16px em todos os lados</div>
<div className="mt-6 mb-8">Margin top de 24px e bottom de 32px</div>
<div className="gap-4">Gap de 16px entre elementos</div>
```

## Elevação e Sombras

O sistema utiliza três níveis principais de elevação, inspirados no Material Design 3:

- **Nível 1** (`md3-elevation-1`): Elementos ligeiramente elevados, como cards
- **Nível 2** (`md3-elevation-2`): Elementos com elevação média, como menus suspensos
- **Nível 3** (`md3-elevation-3`): Elementos com alta elevação, como modais

### Uso de Elevação

```tsx
// Exemplo de uso com classes Tailwind
<div className="md3-elevation-1 p-4">Card com elevação nível 1</div>
<div className="md3-elevation-2 p-4">Elemento com elevação nível 2</div>
```

## Componentes

O Design System inclui vários componentes UI reutilizáveis que seguem as diretrizes de design.

### Button

O componente Button possui três variantes principais:

- **Primary**: Ação principal, maior destaque
- **Secondary**: Ação secundária ou complementar
- **Outline**: Ação mais sutil ou terciária
- **Ghost**: Ação muito sutil, quase sem destaque visual

```tsx
import { Button } from '../components/ui/Button';

// Exemplos de uso
<Button variant="primary">Botão Principal</Button>
<Button variant="secondary" size="lg">Botão Secundário Grande</Button>
<Button variant="outline" leftIcon={<Icon />}>Com Ícone</Button>
<Button variant="ghost" isLoading>Carregando</Button>
<Button href="/outra-pagina">Link Interno</Button>
<Button href="https://site.com" external>Link Externo</Button>
```

### Card

O componente Card é usado para agrupar informações relacionadas:

```tsx
import { Card } from '../components/ui/Card';

<Card variant="primary" className="p-4">
  <h3 className="text-xl font-semibold">Título do Card</h3>
  <p>Conteúdo do card</p>
</Card>

<Card variant="accent" className="p-6">
  <h3>Card com destaque</h3>
</Card>
```

## Acessibilidade

O Design System foi projetado considerando princípios de acessibilidade:

- Contraste adequado entre texto e fundo
- Foco visível em elementos interativos
- Suporte para navegação por teclado
- Estrutura semântica HTML

### Estados de Foco

Todos os elementos interativos devem ter um estado de foco visível, utilizando o utilitário `focus:ring`:

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2">
  Botão com foco visível
</button>
```

## Animações

O sistema inclui algumas animações predefinidas para melhorar a experiência do usuário:

- **float**: Movimento suave para cima e para baixo, útil para chamar atenção
- **slideIn**: Desliza elementos para dentro da tela
- **fadeIn**: Aparecimento gradual

### Uso de Animações

```tsx
<div className="animate-float">Elemento flutuante</div>
<div className="animate-slide-in">Elemento que desliza</div>
<div className="animate-fade-in">Elemento que aparece gradualmente</div>
```

## Utilização

### Com Tailwind

A maioria das classes do Design System é implementada como classes utilitárias do Tailwind:

```tsx
<div className="bg-primary-400 text-white p-4 rounded-lg md3-elevation-1">
  Elemento que segue o Design System
</div>
```

### Com o utilitário `cn`

Use o utilitário `cn` para combinar classes de forma mais organizada e condicional:

```tsx
import { cn } from '../utils/cn';

const isActive = true;

<div className={cn(
  "p-4 rounded-lg", 
  isActive ? "bg-primary-400 text-white" : "bg-gray-100 text-gray-800"
)}>
  Conteúdo com estilo condicional
</div>
```

### Com Componentes

Sempre que possível, utilize os componentes do Design System em vez de recriar elementos:

```tsx
import { Button } from '../components/ui/Button';

// Prefira isso:
<Button variant="primary">Clique Aqui</Button>

// Em vez disso:
<button className="bg-primary-400 text-white px-4 py-2 rounded-lg ...">
  Clique Aqui
</button>
```

## Extensão

Para estender o Design System com novos componentes, siga estas diretrizes:

1. Mantenha a consistência visual com os componentes existentes
2. Reutilize tokens de design (cores, espaçamento, etc.)
3. Garanta a acessibilidade dos novos componentes
4. Documente os componentes de forma clara e completa
5. Teste em diferentes tamanhos de tela e condições