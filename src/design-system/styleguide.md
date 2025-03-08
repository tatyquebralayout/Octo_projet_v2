# Guia de Estilo e Padronização CSS

Este documento estabelece as convenções e melhores práticas para uso de classes CSS no projeto OCTO, incluindo o uso adequado dos utilitários Tailwind, classes de componentes e breakpoints responsivos.

## Princípios Gerais

1. **Consistência** - Mantenha padrões consistentes em todo o código para facilitar a manutenção.
2. **Reutilização** - Prefira componentes reutilizáveis em vez de duplicação de código.
3. **Semântica** - Use nomes de classes significativos que descrevam o propósito, não apenas a aparência.
4. **Modularidade** - Organize o CSS em módulos coesos com responsabilidades claras.

## Abordagens de Estilização

### 1. Classes de Componentes (Preferencial para padrões recorrentes)

Use classes de componentes para elementos que se repetem com padrões consistentes:

```jsx
// RECOMENDADO
<button className="btn btn-primary">
  Enviar
</button>

// EM VEZ DE
<button className="inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg bg-primary-400 text-white hover:bg-primary-500 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2">
  Enviar
</button>
```

As classes de componentes estão definidas em `src/styles/design-system.css`.

### 2. Utilitários Tailwind (Para casos específicos e ajustes)

Use as classes utilitárias do Tailwind para:
- Pequenos ajustes em componentes
- Casos específicos onde criar uma classe de componente seria excessivo
- Layout e espaçamento

```jsx
// RECOMENDADO
<div className="card mt-4 lg:mt-0">
  <h2 className="text-h2 mb-4">Título</h2>
  <p>Conteúdo</p>
</div>
```

### 3. Hybrid Approach (Para componentes complexos)

Para componentes complexos, combine ambas as abordagens:

```jsx
<section className="hero-section flex items-center justify-between p-8 lg:p-12">
  <div className="text-content max-w-md">
    <h1 className="text-h1 mb-4">Título Principal</h1>
    <p className="text-body-large mb-6">Descrição do projeto</p>
    <button className="btn btn-primary">Saiba mais</button>
  </div>
  <div className="hidden md:block w-1/2">
    <img src="/hero-image.jpg" alt="Hero" className="w-full h-auto" />
  </div>
</section>
```

## Breakpoints Padronizados

Utilize **apenas** os seguintes breakpoints padrão do Tailwind:

| Breakpoint | Width      | Uso                    |
|------------|------------|------------------------|
| `sm:`      | ≥ 640px    | Smartphones no modo paisagem |
| `md:`      | ≥ 768px    | Tablets                |
| `lg:`      | ≥ 1024px   | Laptops pequenos       |
| `xl:`      | ≥ 1280px   | Desktops               |
| `2xl:`     | ≥ 1536px   | Telas grandes          |

### Ordem de Aplicação dos Breakpoints

Sempre declare os breakpoints na ordem do menor para o maior:

```jsx
// CORRETO
<div className="block sm:flex md:grid lg:block xl:flex">

// INCORRETO - Ordem inconsistente
<div className="block xl:flex md:grid lg:block sm:flex">
```

### Mobile-First

Siga a abordagem mobile-first. Defina estilos base para dispositivos móveis e use breakpoints para modificá-los em telas maiores:

```jsx
// RECOMENDADO
<div className="w-full md:w-1/2 lg:w-1/3">

// EVITE
<div className="w-1/3 md:w-1/2 sm:w-full">
```

## Classes de Componentes Disponíveis

### Tipografia

- `.text-display` - Título principal destacado
- `.text-h1` a `.text-h4` - Títulos
- `.text-body-large`, `.text-body`, `.text-body-small` - Texto de corpo
- `.text-caption` - Legendas e texto pequeno
- `.text-link` - Links
- `.text-emphasis` - Texto enfatizado
- `.text-muted` - Texto com menor destaque

### Componentes

- `.card`, `.card-primary`, `.card-secondary`, `.card-accent` - Cards
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` - Botões
- `.icon-container`, `.icon` - Ícones
- `.section-hero`, `.section-content` - Seções
- `.container-narrow` - Container de largura reduzida
- `.link-primary`, `.link-white` - Links estilizados

### Utilitários Específicos

- `.bg-primary`, `.bg-accent` - Fundos
- `.text-primary`, `.text-accent` - Textos coloridos
- `.text-primary-light` - Texto principal com menor opacidade
- `.md3-elevation-1` a `.md3-elevation-3` - Elevações do Material Design
- `.transition-standard` - Transição padrão
- `.hover-lift`, `.hover-accent` - Efeitos hover

## Convenções de Nomenclatura

### Use BEM (Block, Element, Modifier) para classes personalizadas:

```css
.card {} /* Bloco */
.card__title {} /* Elemento */
.card--featured {} /* Modificador */
```

## Organização do CSS

1. Mantenha o CSS relacionado ao componente próximo do componente
2. Use comentários para separar seções
3. Agrupe propriedades relacionadas juntas

## Exemplos de Uso

### Cards

```jsx
<div className="card card-primary">
  <h3 className="text-h3 mb-4">Título do Card</h3>
  <p className="text-body mb-4">Conteúdo do card...</p>
  <button className="btn btn-secondary">Ação</button>
</div>
```

### Formulários

```jsx
<form className="space-y-6">
  <div className="form-group">
    <label htmlFor="name" className="text-body-small mb-2 block">Nome</label>
    <input id="name" className="input-field w-full" type="text" />
  </div>
  
  <div className="form-group">
    <label htmlFor="email" className="text-body-small mb-2 block">Email</label>
    <input id="email" className="input-field w-full" type="email" />
  </div>
  
  <button type="submit" className="btn btn-primary">Enviar</button>
</form>
```

### Layout Responsivo

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
  <div className="card">Item 3</div>
</div>
```

## Media Queries

**IMPORTANTE:** Evite criar media queries customizadas. Use as classes responsivas do Tailwind. Se precisar criar CSS personalizado, use as mesmas definições de breakpoint:

```css
/* EVITE ISSO */
@media (min-width: 750px) {
  .custom-element {
    display: flex;
  }
}

/* EM VEZ DISSO, USE OS MESMOS BREAKPOINTS DO TAILWIND */
@media (min-width: 768px) {
  .custom-element {
    display: flex;
  }
}
```

## Próximos Passos

1. Refatorar componentes existentes para seguir essas diretrizes
2. Substituir media queries customizadas pelas classes responsivas do Tailwind
3. Padronizar o uso de componentes e utilitários em todo o projeto

## Recursos

- [Documentação do Tailwind](https://tailwindcss.com/docs)
- [Guia BEM](http://getbem.com/introduction/)
- [Material Design Guidelines](https://material.io/design) 