import { colors, spacing, typography } from '../../foundations/tokens';

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
    text-[${typography.fontSize.sm}]
    font-[${typography.fontWeight.medium}]
    text-[${colors.gray[700]}]
  `,
  
  error: `
    mt-[${spacing[1]}]
    text-[${typography.fontSize.sm}]
    text-[${colors.error.main}]
  `,
  
  helper: `
    mt-[${spacing[1]}]
    text-[${typography.fontSize.sm}]
    text-[${colors.gray[500]}]
  `,
  
  actions: `
    mt-[${spacing[6]}]
    flex
    justify-end
    gap-[${spacing[2]}]
  `
}; 