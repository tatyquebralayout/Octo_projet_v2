import { colorPalette, spacing, typographySystem } from '../../tokens';

export const navigationStyles = {
  menu: `
    flex
    items-center
    gap-[${spacing[4]}]
  `,
  
  menuItem: `
    relative
    text-[${typographySystem.fontSize.base}]
    font-[${typographySystem.fontWeight.medium}]
    text-[${colorPalette.gray[700]}]
    hover:text-[${colorPalette.primary[400]}]
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
    text-[${typographySystem.fontSize.sm}]
    text-[${colorPalette.gray[700]}]
    hover:bg-[${colorPalette.gray[50]}]
    hover:text-[${colorPalette.primary[400]}]
    transition-colors
    duration-200
  `,
  
  breadcrumbs: `
    flex
    items-center
    gap-[${spacing[2]}]
    text-[${typographySystem.fontSize.sm}]
    text-[${colorPalette.gray[500]}]
  `,
  
  breadcrumbItem: `
    hover:text-[${colorPalette.primary[400]}]
    transition-colors
    duration-200
  `,
  
  breadcrumbSeparator: `
    text-[${colorPalette.gray[400]}]
  `
}; 