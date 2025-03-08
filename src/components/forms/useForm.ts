/**
 * Hook useForm para gerenciamento de estado de formulários
 */
import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { validateForm, validateValue, ValidationRule, ValidationError, isFormValid } from './validation';

// Status de submissão do formulário
export enum FormStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Interface para opções do hook useForm
export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: Record<keyof T, ValidationRule[]>;
  onSubmit?: (values: T) => Promise<any> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  resetOnSubmit?: boolean;
  transformSubmitData?: (values: T) => any;
}

// Interface para o retorno do hook useForm
export interface UseFormReturn<T> {
  values: T;
  errors: Record<string, ValidationError[]>;
  touched: Record<string, boolean>;
  status: FormStatus;
  isSubmitting: boolean;
  isValid: boolean;
  submitError: any;
  submitData: any;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  handleReset: () => void;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setTouched: (field: keyof T, isTouched: boolean) => void;
  setError: (field: keyof T, error: ValidationError) => void;
  clearErrors: () => void;
  validateField: (field: keyof T) => ValidationError[];
  validateForm: () => Record<string, ValidationError[]>;
  setStatus: (status: FormStatus) => void;
  setSubmitError: (error: any) => void;
}

/**
 * Hook para gerenciamento de estado de formulários
 * @param options - Opções de configuração do formulário
 * @returns Objeto com estado e funções para manipulação do formulário
 */
export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>): UseFormReturn<T> {
  const {
    initialValues,
    validationSchema = {} as Record<keyof T, ValidationRule[]>,
    onSubmit,
    validateOnChange = false,
    validateOnBlur = true,
    validateOnSubmit = true,
    resetOnSubmit = false,
    transformSubmitData
  } = options;

  // Estados do formulário
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, ValidationError[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [submitError, setSubmitError] = useState<any>(null);
  const [submitData, setSubmitData] = useState<any>(null);

  // Estado derivado
  const isSubmitting = status === FormStatus.SUBMITTING;
  const isValid = Object.keys(errors).length === 0;

  // Reseta o formulário para o estado inicial
  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus(FormStatus.IDLE);
    setSubmitError(null);
    setSubmitData(null);
  }, [initialValues]);

  // Atualiza o valor de um campo
  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (validateOnChange && validationSchema[field]) {
      const fieldErrors = validateValue(value, validationSchema[field]);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (fieldErrors.length > 0) {
          newErrors[field as string] = fieldErrors;
        } else {
          delete newErrors[field as string];
        }
        return newErrors;
      });
    }
  }, [validateOnChange, validationSchema]);

  // Atualiza múltiplos valores
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
    
    if (validateOnChange) {
      const updatedErrors = { ...errors };
      
      for (const field in newValues) {
        if (validationSchema[field as keyof T]) {
          const fieldErrors = validateValue(newValues[field], validationSchema[field as keyof T]);
          if (fieldErrors.length > 0) {
            updatedErrors[field] = fieldErrors;
          } else {
            delete updatedErrors[field];
          }
        }
      }
      
      setErrors(updatedErrors);
    }
  }, [validateOnChange, validationSchema, errors]);

  // Marca um campo como tocado
  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  // Define um erro para um campo específico
  const setFieldError = useCallback((field: keyof T, error: ValidationError) => {
    setErrors(prev => ({
      ...prev,
      [field as string]: [error]
    }));
  }, []);

  // Limpa todos os erros
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Valida um campo específico
  const validateField = useCallback((field: keyof T) => {
    if (!validationSchema[field]) return [];
    
    const fieldErrors = validateValue(values[field], validationSchema[field]);
    
    setErrors(prev => {
      const newErrors = { ...prev };
      if (fieldErrors.length > 0) {
        newErrors[field as string] = fieldErrors;
      } else {
        delete newErrors[field as string];
      }
      return newErrors;
    });
    
    return fieldErrors;
  }, [values, validationSchema]);

  // Valida o formulário inteiro
  const validateAllForm = useCallback(() => {
    const formErrors = validateForm(values, validationSchema as any);
    setErrors(formErrors);
    return formErrors;
  }, [values, validationSchema]);

  // Handler para mudança em campos de formulário
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Para checkboxes, utilizamos a propriedade checked
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setValue(name as keyof T, checkbox.checked);
    } 
    // Para campos numéricos, convertemos para número
    else if (type === 'number') {
      setValue(name as keyof T, value === '' ? '' : Number(value));
    }
    // Para outros tipos, usamos o valor diretamente
    else {
      setValue(name as keyof T, value);
    }
  }, [setValue]);

  // Handler para evento de blur (saída do foco)
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    
    setFieldTouched(name as keyof T, true);
    
    if (validateOnBlur) {
      validateField(name as keyof T);
    }
  }, [validateOnBlur, validateField, setFieldTouched]);

  // Submete o formulário
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Marca todos os campos como tocados
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);
    
    // Valida o formulário se necessário
    let formErrors = errors;
    if (validateOnSubmit) {
      formErrors = validateAllForm();
    }
    
    // Verifica se o formulário é válido
    if (!isFormValid(formErrors)) {
      setStatus(FormStatus.ERROR);
      return false;
    }
    
    // Se não houver função de submit, retorna true
    if (!onSubmit) {
      return true;
    }
    
    try {
      setStatus(FormStatus.SUBMITTING);
      setSubmitError(null);
      
      // Transforma os dados se necessário
      let dataToSubmit: any = values;
      if (transformSubmitData) {
        dataToSubmit = transformSubmitData(values);
      }
      
      // Armazena os dados que serão enviados
      setSubmitData(dataToSubmit);
      
      // Chama a função de submit
      const result = await onSubmit(values);
      
      // Define o status como sucesso
      setStatus(FormStatus.SUCCESS);
      
      // Reseta o formulário se necessário
      if (resetOnSubmit) {
        handleReset();
      }
      
      return true;
    } catch (error) {
      // Define o status como erro
      setStatus(FormStatus.ERROR);
      setSubmitError(error);
      return false;
    }
  }, [
    values, 
    errors, 
    validateOnSubmit, 
    validateAllForm, 
    onSubmit, 
    transformSubmitData,
    resetOnSubmit,
    handleReset
  ]);

  // Efeito para retornar ao estado IDLE após sucesso ou erro
  useEffect(() => {
    if (status === FormStatus.SUCCESS || status === FormStatus.ERROR) {
      const timer = setTimeout(() => {
        setStatus(FormStatus.IDLE);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  return {
    values,
    errors,
    touched,
    status,
    isSubmitting,
    isValid,
    submitError,
    submitData,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setValue,
    setValues: setFormValues,
    setTouched: setFieldTouched,
    setError: setFieldError,
    clearErrors: clearAllErrors,
    validateField,
    validateForm: validateAllForm,
    setStatus,
    setSubmitError
  };
} 