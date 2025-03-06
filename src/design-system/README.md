# OCTO Design System

## Visão Geral
O Design System da OCTO foi criado para manter consistência visual e funcional em toda a aplicação, seguindo princípios de acessibilidade e usabilidade.

## Estrutura

```
design-system/
├── foundations/      # Elementos fundamentais
│   ├── colors/      # Sistema de cores
│   ├── typography/  # Tipografia
│   ├── spacing/     # Espaçamentos
│   └── breakpoints/ # Pontos de quebra
├── components/      # Componentes base
│   ├── Button/     # Botões
│   ├── Card/       # Cards
│   └── Input/      # Campos de entrada
├── patterns/       # Padrões de design
│   ├── forms/      # Formulários
│   └── navigation/ # Navegação
└── utils/          # Utilitários
    ├── animations/ # Animações
    └── hooks/      # Hooks customizados
```

## Fundamentos

### Cores
- **Primárias**
  - Purple: #972ae6 (Identidade principal)
  - Yellow: #e8b624 (Destaque)
  
- **Neutras**
  - White: #ffffff
  - Gray-50: #f9fafb
  - Gray-100: #f3f4f6
  - Gray-800: #1f2937

### Tipografia
- **Família**: Poppins
- **Pesos**
  - Regular: 400
  - Medium: 500
  - Bold: 700

- **Tamanhos**
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)

### Espaçamentos
- 0: 0px
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 4: 1rem (16px)
- 8: 2rem (32px)
- 16: 4rem (64px)

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Componentes

### Button
```tsx
<Button 
  variant="primary" // primary, secondary, outline, text
  size="md" // sm, md, lg
  disabled={false}
  loading={false}
>
  Texto do Botão
</Button>
```

### Card
```tsx
<Card
  variant="elevated" // elevated, outlined, filled
  padding="normal" // compact, normal, spacious
  interactive={false}
>
  Conteúdo do Card
</Card>
```

### Input
```tsx
<Input
  type="text"
  label="Nome"
  placeholder="Digite seu nome"
  error="Mensagem de erro"
  helper="Texto de ajuda"
/>
```

## Padrões

### Forms
- Validação em tempo real
- Feedback visual de erros
- Mensagens de ajuda
- Estados de loading
- Acessibilidade WCAG 2.1

### Navigation
- Menus responsivos
- Breadcrumbs
- Links com estados visuais
- Suporte a keyboard navigation

## Acessibilidade

### Contraste
- Texto normal: 4.5:1
- Texto grande: 3:1
- Elementos interativos: 3:1

### Interação
- Focus visible em todos elementos interativos
- Skip links para navegação
- ARIA labels e roles
- Suporte a screen readers

## Animações

### Transições
- Duração: 150ms - 300ms
- Timing: ease-in-out
- Redução de movimento via prefers-reduced-motion

### Estados
- Hover
- Focus
- Active
- Disabled
- Loading

## Responsividade

### Grid System
- Container máximo: 1280px
- Colunas: 12
- Gutters: 1rem (16px)
- Margens: 1rem (16px) < md, 2rem (32px) >= md

### Layouts
- Mobile First
- Flexbox
- CSS Grid
- Container Queries

## Utilização

```tsx
import { Button, Card } from '@design-system/components';
import { useTheme } from '@design-system/hooks';
import { spacing, colors } from '@design-system/foundations';

// Exemplo de uso
function MyComponent() {
  return (
    <Card variant="elevated" padding="normal">
      <Button variant="primary" size="md">
        Ação Principal
      </Button>
    </Card>
  );
}
```

## Boas Práticas

1. **Consistência**
   - Use componentes do design system
   - Mantenha padrões visuais
   - Siga as diretrizes de espaçamento

2. **Acessibilidade**
   - Implemente ARIA roles
   - Mantenha contraste adequado
   - Suporte navegação por teclado

3. **Performance**
   - Lazy load de componentes grandes
   - Otimize imagens
   - Minimize bundle size

4. **Manutenção**
   - Documente alterações
   - Mantenha versionamento
   - Atualize tokens globalmente