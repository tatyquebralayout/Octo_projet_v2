import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilitário para combinar classes CSS com suporte para condicionais,
 * arrays e objetos, e mesclando classes Tailwind de forma inteligente
 * para evitar conflitos de propriedades.
 * 
 * @example
 * cn('text-red-500', { 'bg-blue-500': isActive }, ['p-4', 'rounded'])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn; 