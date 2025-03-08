# Guia de Migração do Design System

Este documento contém instruções detalhadas para migrar componentes e estilos para o novo Design System unificado.

## Visão Geral das Mudanças

1. **Tokens de design unificados**: Todos os tokens foram consolidados em `src/design-system/tokens/unified-tokens.ts`
2. **Padronização das classes CSS**: Definimos classes de componentes consistentes e regras para uso de utilitários
3. **Breakpoints responsivos padronizados**: Estabelecemos convenções para uso dos breakpoints

## 1. Migrando Componentes UI

### Antes

```tsx
// Abordagem antiga com muitas classes utilitárias
<button className="inline-flex items-center px-8 py-3 bg-[#972ae6] text-white font-medium rounded-full shadow-md transition-all duration-300 hover:bg-[#e8b624] hover:shadow-lg">
  Clique aqui
</button>
```

### Depois

```tsx
// Abordagem nova com classes de componentes
<button className="btn btn-primary">
  Clique aqui
</button>
```

### Passos para Migração:

1. Identifique elementos comuns (botões, cards, títulos, etc.)
2. Substitua classes utilitárias diretas por classes de componentes
3. Use classes utilitárias apenas para ajustes específicos

## 2. Atualizando Referências de Cores

### Antes

```tsx
// Cores hardcoded ou com nomes inconsistentes
<div className="bg-[#972ae6] text-white">
<div className="bg-primary text-white">
```

### Depois

```tsx
// Sistema de cores padronizado
<div className="bg-primary-400 text-white">
<div className="bg-accent-400 text-white">
```

### Passos para Migração:

1. Substitua cores hexadecimais diretas por tokens de cores
2. Atualize referências antigas para os novos nomes (ex: `bg-primary` → `bg-primary-400`)
3. Use as variações de tons de acordo com a intensidade desejada

## 3. Padronizando Breakpoints Responsivos

### Antes

```tsx
// Abordagem inconsistente com breakpoints diversos
<div className="block md:hidden lg:block">
<div className="flex flex-col xl:flex-row">
```

### Depois

```tsx
// Abordagem consistente usando a sequência sm, md, lg, xl, 2xl
<div className="block sm:flex md:grid lg:flex">
<div className="w-full md:w-1/2 lg:w-1/3">
```

### Passos para Migração:

1. Use apenas os breakpoints padrão do Tailwind: `sm`, `md`, `lg`, `xl`, `2xl`
2. Mantenha a ordem do menor para o maior
3. Substitua media queries customizadas por classes responsivas

## 4. Migrando Media Queries Customizadas

### Antes (em CSS)

```css
@media (min-width: 750px) {
  .elemento {
    padding: 2rem;
  }
}
```

### Depois (usando classes Tailwind)

```tsx
<div className="p-4 md:p-8">
  Conteúdo
</div>
```

## 5. Usando a Nova Tipografia

### Antes

```tsx
<h1 className="text-3xl font-bold text-gray-900">Título</h1>
<p className="text-base text-gray-600">Texto</p>
```

### Depois

```tsx
<h1 className="text-h1">Título</h1>
<p className="text-body">Texto</p>
```

## 6. Verificação de Componentes

Use esta lista de verificação ao migrar seus componentes:

- [ ] Substitua referências de cores por tokens padronizados
- [ ] Use classes de componentes para elementos comuns
- [ ] Padronize breakpoints responsivos
- [ ] Atualize tipografia para as novas classes
- [ ] Remova media queries customizadas

## Exemplo Completo de Componente Migrado

### Antes

```tsx
function CardAntigo() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Título do Card</h3>
      <p className="text-gray-600 mb-6">Conteúdo do card com descrição detalhada.</p>
      <button className="bg-[#972ae6] text-white px-6 py-2 rounded-full hover:bg-[#e8b624]">
        Saiba mais
      </button>
    </div>
  );
}
```

### Depois

```tsx
function CardNovo() {
  return (
    <div className="card card-secondary">
      <h3 className="text-h3 mb-4">Título do Card</h3>
      <p className="text-body-small mb-6">Conteúdo do card com descrição detalhada.</p>
      <button className="btn btn-primary">
        Saiba mais
      </button>
    </div>
  );
}
```

## Dúvidas Frequentes

### O que fazer com componentes altamente customizados?

Para componentes com necessidades muito específicas, você ainda pode usar classes utilitárias do Tailwind. O importante é ser consistente dentro do componente e documentar quaisquer desvios do padrão.

### Como lidar com animações?

Use as animações padronizadas definidas nos tokens: `.animate-float`, `.animate-slideIn`, `.animate-fadeIn`.

### E se eu precisar de um novo token?

Adicione primeiro ao arquivo `unified-tokens.ts` e depois atualize o arquivo `design-tokens.js` para manter a consistência.

## Recursos

- [Guia de Estilo](./styleguide.md) - Referência completa dos padrões de estilo
- [Tokens Unificados](./tokens/unified-tokens.ts) - Definições dos tokens
- [Design System CSS](../styles/design-system.css) - Classes de componentes 