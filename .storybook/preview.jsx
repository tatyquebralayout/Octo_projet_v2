import React from 'react';
import '../src/index.postcss';

/**
 * Configuração principal do Storybook
 * Este arquivo substitui e consolida as configurações anteriormente divididas entre preview.js e preview.jsx
 */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
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
    // Garantir que o Storybook trate adequadamente a acessibilidade
    a11y: {
      config: {
        rules: [
          {
            // Regras personalizadas de acessibilidade podem ser configuradas aqui
          },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Aplicar tema baseado no contexto do Storybook
      // Sincroniza o tema com o background selecionado
      const isDarkTheme = 
        context.globals?.backgrounds?.value === '#121212' || 
        context.globals?.theme === 'dark';
      
      return (
        <div data-theme={isDarkTheme ? 'dark' : 'light'} className="p-4">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

/**
 * Configuração global de tipos para o Storybook
 * Permite controle de temas através da barra de ferramentas
 */
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Light' },
        { value: 'dark', icon: 'circle', title: 'Dark' },
      ],
      // Quando o tema é alterado, também atualiza o background correspondente
      onChange: (value) => {
        const background = value === 'dark' ? '#121212' : '#ffffff';
        // Nota: essa implementação será complementada pelo Storybook
        // durante a execução para alterar efetivamente o background
      },
    },
  },
};
