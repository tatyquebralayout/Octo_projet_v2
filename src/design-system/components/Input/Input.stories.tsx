import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { Mail, Eye, Search, User, Lock } from 'lucide-react';

const meta = {
  title: 'Design System/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo do campo de entrada',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido quando o campo está vazio',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro associada ao campo',
      table: {
        type: { summary: 'string' },
      },
    },
    helper: {
      control: 'text',
      description: 'Texto de ajuda para o campo',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do campo',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Ícone exibido à esquerda do campo',
    },
    rightIcon: {
      control: false,
      description: 'Ícone exibido à direita do campo',
    },
    type: {
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      control: { type: 'select' },
      description: 'Tipo de entrada',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'exemplo@email.com',
    helper: 'Usaremos seu email apenas para comunicações importantes',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    error: 'A senha deve ter pelo menos 8 caracteres',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Você não pode editar este campo',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'exemplo@email.com',
    leftIcon: <Mail size={18} />,
    type: 'email',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    rightIcon: <Eye size={18} />,
    type: 'password',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Pesquisar usuário',
    placeholder: 'Pesquisar',
    leftIcon: <Search size={18} />,
    rightIcon: <User size={18} />,
  },
};

export const DifferentTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Input
        {...args}
        label="Texto"
        placeholder="Digite o texto"
        type="text"
      />
      <Input
        {...args}
        label="Email"
        placeholder="exemplo@email.com"
        type="email"
        leftIcon={<Mail size={18} />}
      />
      <Input
        {...args}
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        leftIcon={<Lock size={18} />}
      />
      <Input
        {...args}
        label="Número"
        placeholder="Digite um número"
        type="number"
      />
      <Input
        {...args}
        label="Telefone"
        placeholder="(00) 00000-0000"
        type="tel"
      />
    </div>
  ),
}; 