/**
 * Hook useApiSubmit
 * Gerencia o envio de dados de formulário para a API
 */
import { useState, useCallback } from 'react';
import { ApiError } from '../../services/api/types';

// Tipos de resposta da API
type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

// Status de envio para API
export enum ApiSubmitStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Interface para as opções do hook
export interface UseApiSubmitOptions<TFormData, TApiData, TResponse> {
  // Função que transforma dados do formulário para o formato da API
  transform?: (formData: TFormData) => TApiData;
  
  // Função que faz a requisição para a API
  apiFunction: (data: TApiData) => Promise<ApiResponse<TResponse>>;
  
  // Callbacks de sucesso e erro
  onSuccess?: (response: ApiResponse<TResponse>) => void;
  onError?: (error: ApiError) => void;
  
  // Transforma erro de API genérico em erro específico do formulário
  mapApiErrorToFormError?: (apiError: ApiError) => Record<string, string>;
}

// Interface para o retorno do hook
export interface UseApiSubmitReturn<TFormData, TResponse> {
  submit: (formData: TFormData) => Promise<ApiResponse<TResponse> | null>;
  status: ApiSubmitStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: TResponse | null;
  error: ApiError | null;
  reset: () => void;
  formErrors: Record<string, string>;
}

/**
 * Hook para transformar e enviar dados de formulário para API
 * @param options - Opções de configuração
 * @returns Objeto com funções e estado para submissão à API
 */
export function useApiSubmit<TFormData, TApiData = TFormData, TResponse = any>(
  options: UseApiSubmitOptions<TFormData, TApiData, TResponse>
): UseApiSubmitReturn<TFormData, TResponse> {
  const { 
    transform, 
    apiFunction, 
    onSuccess, 
    onError,
    mapApiErrorToFormError 
  } = options;

  // Estados
  const [status, setStatus] = useState<ApiSubmitStatus>(ApiSubmitStatus.IDLE);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Estados derivados
  const isLoading = status === ApiSubmitStatus.LOADING;
  const isSuccess = status === ApiSubmitStatus.SUCCESS;
  const isError = status === ApiSubmitStatus.ERROR;

  // Reseta o estado
  const reset = useCallback(() => {
    setStatus(ApiSubmitStatus.IDLE);
    setData(null);
    setError(null);
    setFormErrors({});
  }, []);

  // Função para submeter os dados à API
  const submit = useCallback(async (formData: TFormData): Promise<ApiResponse<TResponse> | null> => {
    try {
      setStatus(ApiSubmitStatus.LOADING);
      setError(null);
      setFormErrors({});

      // Transforma os dados do formulário se necessário
      const apiData = transform ? transform(formData) : formData as unknown as TApiData;

      // Chama a função de API
      const response = await apiFunction(apiData);

      // Processa resposta de sucesso
      setData(response.data);
      setStatus(ApiSubmitStatus.SUCCESS);

      // Chama callback de sucesso se existir
      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (err) {
      // Processa erro
      const apiError = err as ApiError;
      setError(apiError);
      setStatus(ApiSubmitStatus.ERROR);

      // Transforma erro da API em erros de formulário se existir a função de mapeamento
      if (mapApiErrorToFormError) {
        const mappedErrors = mapApiErrorToFormError(apiError);
        setFormErrors(mappedErrors);
      }

      // Chama callback de erro se existir
      if (onError) {
        onError(apiError);
      }

      return null;
    }
  }, [transform, apiFunction, onSuccess, onError, mapApiErrorToFormError]);

  return {
    submit,
    status,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    reset,
    formErrors
  };
}

/**
 * Exemplos de transformadores para dados de API comuns
 */
export const apiTransformers = {
  // Remove campos com valores undefined ou null
  removeEmpty: <T extends Record<string, any>>(data: T): Partial<T> => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  },
  
  // Converte datas para string no formato ISO
  dateToISOString: <T extends Record<string, any>>(data: T, dateFields: (keyof T)[]): T => {
    const result = { ...data };
    
    for (const field of dateFields) {
      const value = data[field];
      if (value && typeof value === 'object' && 'toISOString' in value) {
        result[field] = value.toISOString() as any;
      }
    }
    
    return result;
  },
  
  // Formata números para API (remove separadores de milhar, ajusta decimais)
  formatNumbers: <T extends Record<string, any>>(
    data: T, 
    numberFields: (keyof T)[], 
    decimals = 2
  ): T => {
    const result = { ...data };
    
    for (const field of numberFields) {
      const value = data[field];
      if (typeof value === 'number') {
        result[field] = Number(value.toFixed(decimals)) as any;
      } else if (typeof value === 'string') {
        // Remove separadores e converte vírgula para ponto
        const cleanValue = value
          .replace(/\./g, '')
          .replace(',', '.');
        
        result[field] = Number(Number(cleanValue).toFixed(decimals)) as any;
      }
    }
    
    return result;
  },
  
  // Converte valores booleanos para 0/1
  booleanToNumber: <T extends Record<string, any>>(data: T, booleanFields: (keyof T)[]): T => {
    const result = { ...data };
    
    for (const field of booleanFields) {
      const value = data[field];
      if (typeof value === 'boolean') {
        result[field] = value ? 1 : 0 as any;
      }
    }
    
    return result;
  },
  
  // Converte valores booleanos para 'S'/'N'
  booleanToYesNo: <T extends Record<string, any>>(data: T, booleanFields: (keyof T)[]): T => {
    const result = { ...data };
    
    for (const field of booleanFields) {
      const value = data[field];
      if (typeof value === 'boolean') {
        result[field] = value ? 'S' : 'N' as any;
      }
    }
    
    return result;
  },
  
  // Combina vários transformadores em uma única função
  compose: <T>(...transformers: ((data: T) => T)[]): ((data: T) => T) => {
    return (data: T) => transformers.reduce((acc, transformer) => transformer(acc), data);
  }
}; 