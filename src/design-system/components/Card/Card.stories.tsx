import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Design System/Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['elevated', 'outlined', 'filled'],
      control: { type: 'select' },
      description: 'Estilo visual do card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'elevated' },
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      description: 'Tamanho do card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    padding: {
      options: ['compact', 'normal', 'spacious'],
      control: { type: 'select' },
      description: 'Espaçamento interno do card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Se o card deve ter comportamento interativo (hover effects)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    elevation: {
      options: ['sm', 'md', 'lg', 'focus', 'md3-1', 'md3-2', 'md3-3'],
      control: { type: 'select' },
      description: 'Nível de elevação do card (sombra)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Conteúdo do Card</div>,
    variant: 'elevated',
    padding: 'normal',
    interactive: false,
  },
};

export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-h3 mb-2">Card Elevado</h3>
        <p className="text-body-small">Este é um card com efeito de elevação, criando uma sombra suave.</p>
      </div>
    ),
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-h3 mb-2">Card com Borda</h3>
        <p className="text-body-small">Este card utiliza bordas em vez de sombras para definir seus limites.</p>
      </div>
    ),
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-h3 mb-2">Card Preenchido</h3>
        <p className="text-body-small">Este card utiliza uma cor de fundo sutil para se destacar.</p>
      </div>
    ),
    variant: 'filled',
  },
};

export const Interactive: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-h3 mb-2">Card Interativo</h3>
        <p className="text-body-small">Passe o mouse sobre este card para ver os efeitos de interação.</p>
      </div>
    ),
    variant: 'elevated',
    interactive: true,
  },
};

export const WithDifferentSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Card {...args} size="sm">
        <h3 className="text-h3 mb-2">Card Pequeno</h3>
        <p className="text-body-small">Tamanho sm (small)</p>
      </Card>
      <Card {...args} size="md">
        <h3 className="text-h3 mb-2">Card Médio</h3>
        <p className="text-body-small">Tamanho md (medium)</p>
      </Card>
      <Card {...args} size="lg">
        <h3 className="text-h3 mb-2">Card Grande</h3>
        <p className="text-body-small">Tamanho lg (large)</p>
      </Card>
    </div>
  ),
  args: {
    variant: 'elevated',
  },
};

export const WithDifferentPaddings: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Card {...args} padding="compact">
        <h3 className="text-h3">Padding Compacto</h3>
      </Card>
      <Card {...args} padding="normal">
        <h3 className="text-h3">Padding Normal</h3>
      </Card>
      <Card {...args} padding="spacious">
        <h3 className="text-h3">Padding Espaçoso</h3>
      </Card>
    </div>
  ),
  args: {
    variant: 'outlined',
  },
};

export const WithMD3Elevations: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Card {...args} elevation="md3-1">
        <h3 className="text-h3 mb-2">Elevação MD3-1</h3>
        <p className="text-body-small">Material Design 3 - Nível 1</p>
      </Card>
      <Card {...args} elevation="md3-2">
        <h3 className="text-h3 mb-2">Elevação MD3-2</h3>
        <p className="text-body-small">Material Design 3 - Nível 2</p>
      </Card>
      <Card {...args} elevation="md3-3">
        <h3 className="text-h3 mb-2">Elevação MD3-3</h3>
        <p className="text-body-small">Material Design 3 - Nível 3</p>
      </Card>
    </div>
  ),
  args: {
    variant: 'elevated',
  },
}; 