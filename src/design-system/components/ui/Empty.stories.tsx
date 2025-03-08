import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from './Empty';

const meta: Meta<typeof Empty> = {
  title: 'Design System/UI/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente para exibição de estados vazios ou sem dados, com opções de ações para guiar o usuário.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título opcional do estado vazio',
      table: {
        type: { summary: 'string' },
      },
    },
    message: {
      control: 'text',
      description: 'Mensagem principal que explica o estado vazio',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['basic', 'card', 'page'],
      description: 'Estilo visual do componente',
      table: {
        type: { summary: 'basic | card | page' },
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
    action: {
      control: 'object',
      description: 'Ação primária (botão ou link)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    secondaryAction: {
      control: 'object',
      description: 'Ação secundária (botão ou link)',
      table: {
        type: { summary: 'ReactNode' },
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
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    message: 'Nenhum resultado encontrado'
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Lista Vazia',
    message: 'Sua lista de favoritos está vazia'
  },
};

export const WithAction: Story = {
  args: {
    title: 'Sem itens',
    message: 'Adicione itens aos seus favoritos para vê-los aqui',
    action: <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Explorar catálogo</button>
  },
};

export const WithActions: Story = {
  args: {
    title: 'Nenhum filtro corresponde à sua busca',
    message: 'Tente ajustar seus filtros ou buscar por outros termos',
    action: <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">Limpar filtros</button>,
    secondaryAction: <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded">Ver todos</button>
  },
};

export const CardVariant: Story = {
  args: {
    title: 'Sem notificações',
    message: 'Você não tem novas notificações no momento',
    variant: 'card'
  },
};

export const PageVariant: Story = {
  args: {
    title: 'Página em construção',
    message: 'Esta seção do site ainda está sendo desenvolvida. Volte em breve para conferir as novidades.',
    variant: 'page',
    action: <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Voltar para página inicial</button>
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Small: Story = {
  args: {
    message: 'Nenhum comentário',
    size: 'sm'
  },
};

export const Large: Story = {
  args: {
    title: 'Busca sem resultados',
    message: 'Não encontramos resultados para sua busca. Tente usar termos diferentes ou menos específicos.',
    size: 'lg'
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Pasta vazia',
    message: 'Esta pasta não contém arquivos',
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        width="48" 
        height="48" 
        fill="currentColor"
      >
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
      </svg>
    )
  },
}; 