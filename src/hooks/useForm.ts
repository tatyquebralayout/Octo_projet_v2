/**
 * Hook para gerenciar formulários com validação
 */
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

// Tipos para o hook
export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormValidator<T> = (values: T) => FormErrors<T>;
export type SubmitHandler<T> = (values: T) => Promise<boolean | void>;

export interface UseFormOptions<T> {
  initialValues: T;
  validator?: FormValidator<T>;
  onSubmit?: SubmitHandler<T>;
}

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
  resetForm: () => void;
  validateForm: () => boolean;
}

/**
 * Hook para gerenciar formulários com validação e submissão
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validator,
  onSubmit
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Validação do formulário
  const validateForm = useCallback((): boolean => {
    if (!validator) return true;
    
    const newErrors = validator(values);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [values, validator]);

  // Manipulador de mudança de campo
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Tratamento especial para checkboxes
    const fieldValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    setIsDirty(true);
    
    // Validação em tempo real se o campo já foi tocado
    if (touched[name as keyof T] && validator) {
      const validationResult = validator({
        ...values,
        [name]: fieldValue
      });
      
      setErrors(prev => ({
        ...prev,
        [name]: validationResult[name as keyof T]
      }));
    }
  }, [values, touched, validator]);

  // Manipulador de perda de foco
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validação quando o campo perde o foco
    if (validator) {
      const validationResult = validator(values);
      
      setErrors(prev => ({
        ...prev,
        [name]: validationResult[name as keyof T]
      }));
    }
  }, [values, validator]);

  // Manipulador de submissão
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    
    setTouched(allTouched);
    
    // Valida o formulário
    const isValid = validateForm();
    
    if (!isValid || !onSubmit) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  // Define o valor de um campo específico
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    setIsDirty(true);
  }, []);

  // Define um erro para um campo específico
  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Reseta o formulário para os valores iniciais
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid: Object.keys(errors).length === 0,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    validateForm
  };
}

export default useForm; 