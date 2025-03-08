/**
 * Exportações dos hooks personalizados
 */

// Hook de autenticação
export { default as useAuthService } from './useAuthService'; 

// Hook de perfil
export { default as useProfile } from './useProfile';

// Hook de formulário
export { default as useForm } from './useForm';
export type { 
  FormErrors, 
  FormValidator, 
  SubmitHandler, 
  UseFormOptions, 
  UseFormReturn 
} from './useForm';

// Hook de formulário de contato
export { default as useContactForm } from './useContactForm'; 