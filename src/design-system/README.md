# Design System OCTO - Versão Unificada

Este é o design system unificado do projeto OCTO, que fornece uma fonte única da verdade para todos os estilos, componentes e tokens visuais da aplicação.

## Estrutura

```
design-system/
├── tokens/
│   ├── design-tokens.js  # Tokens centralizados em JavaScript (fonte única da verdade)
│   └── css-variables.css # Variáveis CSS derivadas dos tokens JS
├── components/
│   └── ...               # Componentes React estilizados (a serem desenvolvidos)
├── foundations/
│   └── ...               # Componentes fundamentais (a serem desenvolvidos)
├── patterns/
│   └── ...               # Padrões de design reutilizáveis (a serem desenvolvidos)
└── index.css             # Reset CSS e estilos globais
```

## Princípios de Design

1. **Consistência**: Todos os estilos derivam de uma única fonte da verdade (tokens)
2. **Acessibilidade**: Componentes seguem as diretrizes WCAG 2.1 AA
3. **Responsividade**: Design adaptável a todos os tamanhos de tela
4. **Performance**: Otimizado para carregamento rápido e renderização eficiente
5. **Extensibilidade**: Fácil de estender e personalizar

## Sistema de Tokens

Nosso sistema usa JavaScript como fonte única da verdade para os tokens de design, que são então usados por:

1. **Tailwind CSS** - Para classes utilitárias e personalizações
2. **CSS Variables** - Para componentes legacy e estilos personalizados
3. **Componentes React** - Para estilos integrados aos componentes

### Como Usar

#### Usando classes Tailwind (Recomendado)
```jsx
<button className="bg-primary-400 text-white px-4 py-2 rounded-md">
  Botão
</button>
```

#### Usando variáveis CSS (para casos específicos)
```css
.meu-componente {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

#### Aplicando estilos de componentes predefinidos
```jsx
<button className="btn btn-primary">
  Botão Primary
</button>
```

## Temas

O design system suporta tema claro e escuro através do atributo `data-theme`:

```html
<html data-theme="dark">
  <!-- Conteúdo com tema escuro -->
</html>
```

## Documentação Completa

Para visualizar todos os componentes e suas variações, consulte a documentação no Storybook:

```bash
npm run storybook
```

## Manutenção e Contribuição

### Modificando Tokens

Quando precisar modificar ou adicionar novos tokens:

1. Edite o arquivo `tokens/design-tokens.js`
2. Execute `npm run build:design-system` para gerar os assets

### Adicionando Componentes

Para adicionar novos componentes:

1. Crie o componente React em `components/`
2. Documente o componente no Storybook
3. Adicione testes visuais para o componente

### Regras de Estilo

- Use classes Tailwind sempre que possível
- Evite criar estilos CSS personalizados, exceto quando estritamente necessário
- Para componentes complexos, use Styled Components com os tokens
- Siga as convenções de nomenclatura BEM para classes personalizadas

## Testes

Todos os componentes do design system devem ter:

- Testes unitários com Jest
- Testes visuais com Storybook/Chromatic
- Testes de acessibilidade