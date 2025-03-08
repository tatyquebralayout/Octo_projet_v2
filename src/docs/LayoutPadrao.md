# Padrão de Layout - Guia de Implementação

## Introdução

Este documento descreve o padrão de layout já estabelecido nas páginas do projeto OCTO, como observado em páginas como `somos-octo/Diversidade`, `somos-octo/Neurodivergencias` e `octo-faz/CuidaPcd`. Seguir este padrão é essencial para manter a consistência visual e a experiência do usuário em todo o site.

## Estrutura Visual

O layout padrão consiste em:

1. **Contêiner Principal** - `<div className="min-h-screen">` envolvendo toda a página
2. **Hero Banner** - Seção destacada no topo com imagem de fundo, cor e título
3. **Seções de Conteúdo** - Múltiplas seções alternando cores de fundo
4. **Seção Final** - Geralmente com chamada para ação, contato ou relacionados

## Implementação Básica

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { /* ícones necessários */ } from 'lucide-react';

const MinhaPagePadronizada = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/caminho/para/imagem.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
        </div>
        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center h-full">
            <div className="max-w-4xl">
              <h1 className="text-[56px] font-bold text-white">
                Título da Página
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de conteúdo */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Conteúdo da seção */}
        </div>
      </section>

      {/* Mais seções conforme necessário */}
    </div>
  );
};

export default MinhaPagePadronizada;
```

## Elementos Padrão

### Hero Banner

```tsx
<section className="h-[400px] bg-[#972ae6] relative overflow-hidden">
  <div className="absolute inset-0">
    <img
      src="/caminho/para/imagem.jpg"
      alt=""
      className="w-full h-full object-cover opacity-20"
    />
    <div className="absolute inset-0 bg-[#972ae6] opacity-90" />
  </div>
  <div className="container mx-auto px-6 h-full relative z-10">
    <div className="flex items-center h-full">
      <div className="max-w-4xl">
        <h1 className="text-[56px] font-bold text-white">
          Título da Página
        </h1>
        <p className="text-xl text-white/90 max-w-2xl">
          Descrição opcional da página
        </p>
      </div>
    </div>
  </div>
</section>
```

### Seção Imagem + Texto

```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <img
          src="/caminho/para/imagem.jpg"
          alt="Descrição da imagem"
          className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
        />
      </div>
      <div className="space-y-8">
        <div className="prose prose-lg">
          <h2 className="text-3xl font-bold text-[#972ae6] mb-6">
            Título da Seção
          </h2>
          <p className="text-lg text-[#972ae6]/70 mb-6">
            Texto do parágrafo...
          </p>
        </div>
        <Link
          to="/pagina-relacionada"
          className="inline-block px-8 py-4 bg-[#972ae6] text-white rounded-full font-bold
            hover:bg-[#e8b624] transition-all duration-300
            transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Botão de Ação
        </Link>
      </div>
    </div>
  </div>
</section>
```

### Seção Grid de Cards

```tsx
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-[#972ae6] text-center mb-16">
      Título da Seção
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6
            hover:shadow-lg transition-all duration-300
            transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-[#972ae6]/10 rounded-full 
            flex items-center justify-center mb-6">
            <div className="text-[#972ae6]">
              {item.icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#972ae6] mb-4">
            {item.title}
          </h3>
          <p className="text-[#972ae6]/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Seção com Cor de Fundo (CTA)

```tsx
<section className="py-24 bg-[#972ae6]">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-8">
        Título da Seção
      </h2>
      <p className="text-xl text-white/90 mb-12">
        Texto descritivo...
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link
          to="/contato"
          className="px-8 py-4 bg-white text-[#972ae6] text-lg font-bold rounded-full
            hover:bg-[#e8b624] hover:text-white transition-all duration-300
            transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Botão Principal
        </Link>
        <Link
          to="/informacoes"
          className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-full
            hover:bg-white/20 transition-all duration-300
            transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Botão Secundário
        </Link>
      </div>
    </div>
  </div>
</section>
```

## Paleta de Cores

Para manter a consistência visual, use estas cores:

### Cores Principais
- Primária: `#972ae6` (roxo)
- Secundária: `#e8b624` (amarelo)
- Fundos alternados: 
  - `bg-white`
  - `bg-gray-50`
  - `bg-[#972ae6]` (para seções de destaque)
  - `bg-[#e8b624]` (para seções de chamada à ação)

### Variações de Opacidade
- Textos: `text-[#972ae6]/70` (70% de opacidade)
- Fundos sutis: `bg-[#972ae6]/10` (10% de opacidade)
- Texto sobre imagem: `text-white/90` (90% de opacidade)

## Espaçamentos

- Padding vertical das seções: `py-24` (padrão) ou `py-16` (seções menores)
- Padding horizontal: `px-6` com `container mx-auto`
- Espaçamento entre elementos: `mb-6`, `mb-8`, `mb-12`, `mb-16` (dependendo da importância)
- Grids e gaps: `gap-6`, `gap-8`, `gap-12`, `gap-16` (dependendo do conteúdo)

## Tipografia

- Títulos de página: `text-[56px] font-bold text-white` (no hero)
- Títulos de seção: `text-3xl font-bold text-[#972ae6]`
- Subtítulos: `text-xl font-bold text-[#972ae6]`
- Textos: `text-lg text-[#972ae6]/70`
- Texto em seções coloridas: `text-white` ou `text-white/90`

## Animações e Interações

Todos os elementos interativos devem ter:

1. Transição suave: `transition-all duration-300`
2. Efeito hover: 
   - Para botões: `hover:bg-[#e8b624]`
   - Para cards: `hover:shadow-lg`
3. Movimentos sutis: `transform hover:-translate-y-1`

## Responsividade

- Utilize grids flexíveis: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Adapte tamanhos de texto para mobile
- Ajuste flex-direction em telas menores: `flex-col sm:flex-row`

## Melhores Práticas

1. **Consistência**: Mantenha os mesmos espaçamentos e cores em todas as páginas
2. **Acessibilidade**: Use textos alternativos para imagens e contraste adequado
3. **Desempenho**: Otimize imagens para carregamento rápido
4. **Componentização**: Extraia componentes reutilizáveis para seções comuns
5. **SEO**: Use tags semânticas e estrutura hierárquica de títulos (h1, h2, h3)

## Exemplos de Páginas

Para referência, consulte estas páginas que seguem o padrão:
- `src/pages/somos-octo/Diversidade.tsx`
- `src/pages/somos-octo/Neurodivergencias.tsx`
- `src/pages/somos-octo/QuemSomos.tsx`
- `src/pages/octo-faz/CuidaPcd.tsx` 