/**
 * Exportação de todos os componentes e tipos de formulário
 */

// Componentes principais
export { Form, FormItem, FormGroup, FormStatus } from './Form';
export { FormControl } from './FormControl';
export { Input } from './Input';
export { Textarea } from './Textarea';
export { Select } from './Select';
export { Checkbox } from './Checkbox';

// Hooks de formulário
export { useForm } from './useForm';
export { useApiSubmit, apiTransformers } from './useApiSubmit';

// Funções de validação
export {
  validateForm,
  validateValue,
  getFirstError,
  isFormValid,
  rules,
  validators
} from './validation';

// Tipos para componentes
export type { FormProps, FormItemProps, FormGroupProps } from './Form';
export type { FormControlProps } from './FormControl';
export type { InputProps } from './Input';
export type { TextareaProps } from './Textarea';
export type { SelectProps, SelectOption } from './Select';
export type { CheckboxProps } from './Checkbox';

// Tipos para hooks e validação
export type {
  UseFormOptions,
  UseFormReturn
} from './useForm';

export type {
  UseApiSubmitOptions,
  UseApiSubmitReturn,
  ApiSubmitStatus
} from './useApiSubmit';

export type {
  ValidationError,
  ValidationRule,
  Validator,
  ValidatorFn
} from './validation'; 