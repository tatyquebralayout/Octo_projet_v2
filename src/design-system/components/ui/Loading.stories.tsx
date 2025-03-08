import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Design System/UI/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de carregamento (loading) com várias variantes e tamanhos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['spinner', 'dots', 'pulse'],
      description: 'Estilo visual do indicador de carregamento',
      table: {
        type: { summary: 'spinner | dots | pulse' },
        defaultValue: { summary: 'spinner' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do indicador de carregamento',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    fullPage: {
      control: 'boolean',
      description: 'Se o loading deve ocupar toda a tela',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    overlay: {
      control: 'boolean',
      description: 'Se deve mostrar um overlay escuro por trás',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto a ser exibido abaixo do indicador',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'color',
      description: 'Cor personalizada para o indicador',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
      table: {
        type: { summary: 'string' },
      },
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Texto para leitores de tela',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Carregando' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};

export const Spinner: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    size: 'md',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Carregando dados...',
    size: 'md',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#8e44ad',
    size: 'md',
  },
};

export const WithOverlay: Story = {
  args: {
    overlay: true,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading com um overlay semi-transparente por trás.',
      },
    },
  },
};

export const FullPage: Story = {
  args: {
    fullPage: true,
    overlay: true,
    size: 'lg',
    label: 'Carregando aplicação...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading que ocupa toda a tela, útil para carregamentos iniciais da aplicação.',
      },
    },
    layout: 'fullscreen',
  },
}; 