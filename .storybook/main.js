/**
 * Configuração principal do Storybook para o projeto OCTO
 * 
 * @type { import('@storybook/react-vite').StorybookConfig }
 */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y', // Addon de acessibilidade
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  // Configuração para facilitar o desenvolvimento
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
  }
};

export default config; 