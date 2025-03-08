import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Error } from './Error';

const meta: Meta<typeof Error> = {
  title: 'Design System/UI/Error',
  component: Error,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente para exibição de mensagens de erro com diferentes variantes e opções de recuperação.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do erro',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Ocorreu um erro' },
      },
    },
    message: {
      control: 'text',
      description: 'Mensagem de erro detalhada',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['basic', 'card', 'inline', 'banner'],
      description: 'Estilo visual do componente de erro',
      table: {
        type: { summary: 'basic | card | inline | banner' },
        defaultValue: { summary: 'basic' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    onRetry: {
      action: 'retry clicked',
      description: 'Função chamada quando o botão de retry é clicado',
      table: {
        type: { summary: '() => void' },
      },
    },
    retryText: {
      control: 'text',
      description: 'Texto do botão de retry',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tentar novamente' },
      },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'object',
      description: 'Ícone personalizado (React node)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    message: 'Não foi possível carregar os dados'
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Erro de conexão',
    message: 'Verifique sua conexão e tente novamente'
  },
};

export const WithRetry: Story = {
  args: {
    message: 'Falha ao carregar recursos',
    onRetry: () => console.log('Retry clicked'),
    retryText: 'Tentar novamente'
  },
};

export const InlineVariant: Story = {
  args: {
    message: 'Email inválido',
    variant: 'inline',
    size: 'sm'
  },
};

export const CardVariant: Story = {
  args: {
    title: 'Erro do servidor',
    message: 'O servidor retornou uma resposta inválida. Nossa equipe técnica foi notificada.',
    variant: 'card'
  },
};

export const BannerVariant: Story = {
  args: {
    title: 'Atenção',
    message: 'Sua sessão irá expirar em 5 minutos. Salve suas alterações.',
    variant: 'banner'
  },
  parameters: {
    layout: 'padded',
  },
};

export const Small: Story = {
  args: {
    message: 'Campo obrigatório não preenchido',
    size: 'sm'
  },
};

export const Large: Story = {
  args: {
    title: 'Erro crítico',
    message: 'Ocorreu um erro crítico que impediu a conclusão da operação. Contate o suporte técnico caso o problema persista.',
    size: 'lg'
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Sem permissão',
    message: 'Você não tem permissão para acessar este recurso',
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        width="24" 
        height="24" 
        fill="currentColor"
      >
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
      </svg>
    )
  },
}; 