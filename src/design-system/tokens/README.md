# Design System Tokens

Este diretório contém todos os tokens de design centralizados do projeto OCTO. Os tokens são organizados em arquivos modulares por categoria, facilitando a manutenção e garantindo consistência em toda a aplicação.

## Estrutura de Arquivos

- `index.ts` - Arquivo de barril que exporta todos os tokens de forma centralizada
- `colors.ts` - Tokens de cores (paleta, cores semânticas, temas)
- `typography.ts` - Tokens de tipografia (famílias, tamanhos, pesos, alturas de linha)
- `spacing.ts` - Tokens de espaçamento (sistema de grid, margens, paddings)
- `unified-tokens.ts` - Arquivo legado que está sendo migrado para os arquivos modulares
- `design-tokens.js` - Arquivo legado para uso com Tailwind (será removido após migração completa)

## Como Usar

### Importação Recomendada

```typescript
// Importar tokens específicos
import { colorPalette, semanticColors, spacing, typographySystem } from '@/design-system/tokens';

// Ou importar todos os tokens
import tokens from '@/design-system/tokens';
```

### Exemplos de Uso

#### Cores

```typescript
import { colorPalette, semanticColors } from '@/design-system/tokens';

// Usar cores da paleta
const primaryColor = colorPalette.primary[400];
const grayLight = colorPalette.gray[100];

// Usar cores semânticas
const errorColor = semanticColors.error.main;
const successColor = semanticColors.success.main;
```

#### Tipografia

```typescript
import { typographySystem } from '@/design-system/tokens';

// Usar tamanhos de fonte
const bodySize = typographySystem.fontSize.base;
const headingSize = typographySystem.fontSize['2xl'];

// Usar variantes pré-definidas
const headingStyle = typographySystem.variants.h1;
const bodyStyle = typographySystem.variants.body;
```

#### Espaçamento

```typescript
import { spacing } from '@/design-system/tokens';

// Usar valores de espaçamento
const smallGap = spacing[2]; // 0.5rem (8px)
const sectionPadding = spacing[8]; // 2rem (32px)

// Usar utilitários de espaçamento
const formGap = spacing.utility.form.elementGap;
const cardPadding = spacing.utility.card.padding;
```

## Migração em Andamento

Estamos no processo de migrar todos os tokens do arquivo `unified-tokens.ts` para arquivos modulares por categoria. Durante esta transição, alguns componentes ainda podem estar usando os tokens antigos.

### Guia de Migração

1. Identifique importações de `foundations/tokens` e substitua por importações de `tokens`
2. Atualize referências para usar os novos nomes de tokens (ex: `colors.primary[400]` → `colorPalette.primary[400]`)
3. Teste o componente para garantir que a aparência visual não foi alterada

## Tipos TypeScript

Todos os tokens exportam seus tipos correspondentes para uso em componentes:

```typescript
import { ColorPalette, SemanticColors, TypographySystem, SpacingSystem } from '@/design-system/tokens';
``` 