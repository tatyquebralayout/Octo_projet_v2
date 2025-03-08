import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
      control: 'boolean',
      description: 'Se o botão deve ocupar toda a largura disponível',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do botão',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botão Outline',
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Botão Ghost',
  }
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Botão Link',
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Botão Pequeno',
  }
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Botão Médio',
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Botão Grande',
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Botão de Largura Total',
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Botão Desabilitado',
  }
};

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <span>Ícone</span>
        <span>Texto</span>
      </>
    ),
  }
};

// História com todas as variantes
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex space-x-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex space-x-4">
        <Button disabled>Disabled</Button>
        <Button fullWidth>Full Width</Button>
      </div>
    </div>
  )
}; 