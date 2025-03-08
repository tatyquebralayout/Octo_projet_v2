# Guia de Migração para Tokens Centralizados

Este guia ajudará você a migrar componentes e estilos para usar os novos tokens centralizados do Design System.

## Por que estamos migrando?

- **Consistência**: Garantir que todos os componentes usem os mesmos valores para cores, espaçamento e tipografia
- **Manutenibilidade**: Facilitar atualizações futuras ao centralizar definições em arquivos modulares
- **Tipagem**: Melhorar o suporte a TypeScript com tipos específicos para cada categoria de token
- **Performance**: Reduzir o tamanho do bundle ao evitar duplicação de definições

## Mapeamento de Tokens Antigos para Novos

### Cores

| Antigo | Novo |
|--------|------|
| `colors.primary[400]` | `colorPalette.primary[400]` |
| `colors.secondary[500]` | `colorPalette.secondary[500]` |
| `colors.accent[300]` | `colorPalette.accent[300]` |
| `colors.gray[200]` | `colorPalette.gray[200]` |
| `colors.error.main` | `semanticColors.error.main` |
| `colors.success.main` | `semanticColors.success.main` |
| `colors.warning.main` | `semanticColors.warning.main` |
| `colors.info.main` | `semanticColors.info.main` |

### Tipografia

| Antigo | Novo |
|--------|------|
| `typography.fontSize.sm` | `typographySystem.fontSize.sm` |
| `typography.fontSize.base` | `typographySystem.fontSize.base` |
| `typography.fontSize.lg` | `typographySystem.fontSize.lg` |
| `typography.fontWeight.regular` | `typographySystem.fontWeight.regular` |
| `typography.fontWeight.medium` | `typographySystem.fontWeight.medium` |
| `typography.fontWeight.bold` | `typographySystem.fontWeight.bold` |
| `typography.lineHeight.normal` | `typographySystem.lineHeight.normal` |

### Espaçamento

| Antigo | Novo |
|--------|------|
| `spacing[1]` | `spacing[1]` (sem alteração) |
| `spacing[2]` | `spacing[2]` (sem alteração) |
| `spacing[4]` | `spacing[4]` (sem alteração) |
| `spacing[8]` | `spacing[8]` (sem alteração) |

## Passos para Migração

1. **Atualize as importações**:

   ```typescript
   // Antes
   import { colors, typography, spacing } from '../foundations/tokens';
   
   // Depois
   import { colorPalette, semanticColors, typographySystem, spacing } from '../tokens';
   ```

2. **Atualize as referências**:

   ```typescript
   // Antes
   const styles = {
     container: `
       bg-[${colors.primary[400]}]
       text-[${typography.fontSize.base}]
       p-[${spacing[4]}]
     `
   };
   
   // Depois
   const styles = {
     container: `
       bg-[${colorPalette.primary[400]}]
       text-[${typographySystem.fontSize.base}]
       p-[${spacing[4]}]
     `
   };
   ```

3. **Atualize os tipos**:

   ```typescript
   // Antes
   import { Colors, Typography } from '../foundations/tokens';
   
   // Depois
   import { ColorPalette, TypographySystem } from '../tokens';
   ```

## Verificação de Migração

Use o seguinte comando para encontrar componentes que ainda usam os tokens antigos:

```bash
grep -r "from '../foundations/tokens'" src/design-system/
```

## Exemplos de Componentes Migrados

Veja exemplos de componentes já migrados:

- `src/design-system/components/Button.tsx`
- `src/design-system/patterns/navigation/index.ts`
- `src/design-system/patterns/forms/index.ts`

## Próximos Passos

Após a migração completa de todos os componentes, removeremos os arquivos legados:

- `src/design-system/foundations/tokens.ts`
- `src/design-system/tokens/design-tokens.js`

## Dúvidas e Suporte

Se você tiver dúvidas sobre a migração, consulte a documentação em `src/design-system/tokens/README.md` ou entre em contato com a equipe de Design System. 