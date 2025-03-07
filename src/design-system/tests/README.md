# Testes Visuais para o Design System

Este diretório contém a configuração e implementação dos testes visuais para o Design System OCTO.

## Ferramentas

- **Storybook**: Para documentação visual de componentes
- **Jest**: Para testes unitários
- **Testing Library**: Para teste de interação com componentes
- **Chromatic**: Para testes visuais automatizados e identificação de regressões

## Estrutura

```
tests/
├── visual/            # Testes visuais com Storybook
│   ├── stories/       # Stories para componentes
│   └── snapshots/     # Snapshots para comparação visual
├── unit/              # Testes unitários com Jest
└── accessibility/     # Testes de acessibilidade
```

## Iniciando o Storybook

Para iniciar o Storybook e visualizar a documentação dos componentes:

```bash
npm run storybook
```

## Configuração do Storybook

Para configurar o Storybook para o design system, siga os passos:

1. Instale as dependências necessárias:

```bash
npm install --save-dev @storybook/react @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-docs
```

2. Crie um arquivo `.storybook/main.js` com a seguinte configuração:

```js
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
};
```

3. Configure o tema e decoradores em `.storybook/preview.js`:

```js
import '../src/index.postcss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#121212',
      },
    ],
  },
  darkMode: {
    current: 'light',
    stylePreview: true,
  },
};

// Adicione um decorador global para alternar temas
export const decorators = [
  (Story, context) => {
    // Aplicar tema baseado no contexto do Storybook
    const isDarkTheme = context.globals.backgrounds?.value === '#121212';
    
    return (
      <div data-theme={isDarkTheme ? 'dark' : 'light'}>
        <Story />
      </div>
    );
  },
];
```

## Criando Stories

Para cada componente do design system, crie um arquivo `.stories.tsx` seguindo este modelo:

```tsx
// Button.stories.tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Design System/Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Botão Primário',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Botão Secundário',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: 'Botão Outline',
};
```

## Configuração do Chromatic

Para integrar testes visuais automatizados com Chromatic:

1. Instale o Chromatic:

```bash
npm install --save-dev chromatic
```

2. Configure um script no `package.json`:

```json
{
  "scripts": {
    "chromatic": "npx chromatic --project-token=YOUR_PROJECT_TOKEN"
  }
}
```

3. Execute os testes visuais:

```bash
npm run chromatic
```

## Testes de Acessibilidade

Os testes de acessibilidade são executados automaticamente no Storybook usando o addon `@storybook/addon-a11y`.

Para executar testes de acessibilidade específicos:

```jsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Test Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 