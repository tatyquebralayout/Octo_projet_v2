import { colors, spacing, typography } from '../../foundations/tokens';

export const navigationStyles = {
  menu: `
    flex
    items-center
    gap-[${spacing[4]}]
  `,
  
  menuItem: `
    relative
    text-[${typography.fontSize.base}]
    font-[${typography.fontWeight.medium}]
    text-[${colors.gray[700]}]
    hover:text-[${colors.primary[400]}]
    transition-colors
    duration-200
  `,
  
  submenu: `
    absolute
    top-full
    left-0
    min-w-[200px]
    bg-white
    shadow-lg
    rounded-lg
    py-[${spacing[2]}]
    mt-[${spacing[1]}]
  `,
  
  submenuItem: `
    block
    w-full
    px-[${spacing[4]}]
    py-[${spacing[2]}]
    text-[${typography.fontSize.sm}]
    text-[${colors.gray[700]}]
    hover:bg-[${colors.gray[50]}]
    hover:text-[${colors.primary[400]}]
    transition-colors
    duration-200
  `,
  
  breadcrumbs: `
    flex
    items-center
    gap-[${spacing[2]}]
    text-[${typography.fontSize.sm}]
    text-[${colors.gray[500]}]
  `,
  
  breadcrumbItem: `
    hover:text-[${colors.primary[400]}]
    transition-colors
    duration-200
  `,
  
  breadcrumbSeparator: `
    text-[${colors.gray[400]}]
  `
}; 