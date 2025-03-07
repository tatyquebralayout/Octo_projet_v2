import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Design System/Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      control: { type: 'select' },
      description: 'Estilo visual do botão',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      options: ['sm', 'md', 'lg', 'icon'],
      control: { type: 'select' },
      description: 'Tamanho do botão',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Se o botão deve ocupar a largura total do container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Se o botão está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: false,
      description: 'Ícone à esquerda do texto',
    },
    rightIcon: {
      control: false,
      description: 'Ícone à direita do texto',
    },
    onClick: { action: 'clicked' },
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

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  children: 'Botão Ghost',
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
  children: 'Botão Link',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Botão Pequeno',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  children: 'Botão Médio',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Botão Grande',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  children: 'Botão de Largura Total',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Botão Desabilitado',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  leftIcon: <span>←</span>,
  rightIcon: <span>→</span>,
  children: 'Com Ícones',
};

// História com todas as variantes (visualização em grid)
export const AllVariants = () => (
  <div className="grid grid-cols-3 gap-4">
    <div className="flex flex-col space-y-4">
      <h3 className="text-h3">Primary</h3>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
    <div className="flex flex-col space-y-4">
      <h3 className="text-h3">Secondary</h3>
      <Button variant="secondary" size="sm">Small</Button>
      <Button variant="secondary" size="md">Medium</Button>
      <Button variant="secondary" size="lg">Large</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
    <div className="flex flex-col space-y-4">
      <h3 className="text-h3">Outline</h3>
      <Button variant="outline" size="sm">Small</Button>
      <Button variant="outline" size="md">Medium</Button>
      <Button variant="outline" size="lg">Large</Button>
      <Button variant="outline" disabled>Disabled</Button>
    </div>
  </div>
); 