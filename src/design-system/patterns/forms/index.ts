import { colorPalette, semanticColors, spacing, typographySystem } from '../../tokens';

export const formStyles = {
  container: `
    w-full
    max-w-lg
    mx-auto
    p-[${spacing[6]}]
  `,
  
  group: `
    mb-[${spacing[4]}]
  `,
  
  label: `
    block
    mb-[${spacing[1]}]
    text-[${typographySystem.fontSize.sm}]
    font-[${typographySystem.fontWeight.medium}]
    text-[${colorPalette.gray[700]}]
  `,
  
  error: `
    mt-[${spacing[1]}]
    text-[${typographySystem.fontSize.sm}]
    text-[${semanticColors.error.main}]
  `,
  
  helper: `
    mt-[${spacing[1]}]
    text-[${typographySystem.fontSize.sm}]
    text-[${colorPalette.gray[500]}]
  `,
  
  actions: `
    mt-[${spacing[6]}]
    flex
    justify-end
    gap-[${spacing[2]}]
  `
}; 