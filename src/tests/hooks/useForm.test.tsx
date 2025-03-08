/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useForm, FormValidator } from '../../hooks/useForm';

// Mock para evento de mudança
const createChangeEvent = (name: string, value: any, type: string = 'text') => ({
  target: {
    name,
    value,
    type,
    ...(type === 'checkbox' ? { checked: Boolean(value) } : {})
  }
});

// Mock para evento de blur
const createBlurEvent = (name: string) => ({
  target: {
    name
  }
});

// Mock para evento de submit
const createSubmitEvent = () => {
  const event = {
    preventDefault: vi.fn()
  };
  return event;
};

// Interface para o formulário de teste
interface TestForm {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

// Valores iniciais para o formulário de teste
const initialValues: TestForm = {
  name: '',
  email: '',
  password: '',
  acceptTerms: false
};

// Validador para o formulário de teste
const validator: FormValidator<TestForm> = (values) => {
  const errors: Record<string, string> = {};
  
  if (!values.name) {
    errors.name = 'O nome é obrigatório';
  }
  
  if (!values.email) {
    errors.email = 'O e-mail é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'E-mail inválido';
  }
  
  if (!values.password) {
    errors.password = 'A senha é obrigatória';
  } else if (values.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }
  
  if (!values.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos';
  }
  
  return errors;
};

describe('useForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve inicializar com os valores padrão', () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isDirty).toBe(false);
  });

  test('deve atualizar o valor do campo quando handleChange for chamado', () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    
    act(() => {
      result.current.handleChange(createChangeEvent('name', 'John Doe') as any);
    });
    
    expect(result.current.values.name).toBe('John Doe');
    expect(result.current.isDirty).toBe(true);
  });

  test('deve lidar corretamente com campos checkbox', () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    
    act(() => {
      result.current.handleChange(createChangeEvent('acceptTerms', true, 'checkbox') as any);
    });
    
    expect(result.current.values.acceptTerms).toBe(true);
  });

  test('deve marcar o campo como tocado quando handleBlur for chamado', () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    
    act(() => {
      result.current.handleBlur(createBlurEvent('name') as any);
    });
    
    expect(result.current.touched.name).toBe(true);
  });

  test('deve validar o campo quando handleBlur for chamado', () => {
    const { result } = renderHook(() => useForm({ 
      initialValues,
      validator 
    }));
    
    act(() => {
      result.current.handleBlur(createBlurEvent('name') as any);
    });
    
    expect(result.current.errors.name).toBe('O nome é obrigatório');
  });

  test('deve validar o campo em tempo real se já foi tocado', () => {
    const { result } = renderHook(() => useForm({ 
      initialValues,
      validator 
    }));
    
    // Primeiro marca o campo como tocado
    act(() => {
      result.current.handleBlur(createBlurEvent('email') as any);
    });
    
    // Depois muda o valor para um email inválido
    act(() => {
      result.current.handleChange(createChangeEvent('email', 'invalidemail') as any);
    });
    
    expect(result.current.errors.email).toBe('E-mail inválido');
    
    // Corrige o email
    act(() => {
      result.current.handleChange(createChangeEvent('email', 'valid@email.com') as any);
    });
    
    expect(result.current.errors.email).toBeUndefined();
  });

  test('deve resetar o formulário quando resetForm for chamado', () => {
    const { result } = renderHook(() => useForm({ initialValues }));
    
    // Alterar alguns valores e criar erros
    act(() => {
      result.current.handleChange(createChangeEvent('name', 'John Doe') as any);
      result.current.setFieldError('email', 'E-mail inválido');
      result.current.handleBlur(createBlurEvent('name') as any);
    });
    
    // Resetar o formulário
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isDirty).toBe(false);
  });

  test('deve chamar o manipulador onSubmit quando o formulário for submetido', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    
    const { result } = renderHook(() => useForm({ 
      initialValues: {
        ...initialValues,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        acceptTerms: true
      },
      validator,
      onSubmit 
    }));
    
    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent() as any);
    });
    
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(result.current.values);
  });

  test('não deve chamar onSubmit se o formulário for inválido', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    
    const { result } = renderHook(() => useForm({ 
      initialValues,
      validator,
      onSubmit 
    }));
    
    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent() as any);
    });
    
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('deve marcar todos os campos como tocados após a submissão', async () => {
    const { result } = renderHook(() => useForm({ 
      initialValues,
      validator 
    }));
    
    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent() as any);
    });
    
    expect(result.current.touched).toEqual({
      name: true,
      email: true,
      password: true,
      acceptTerms: true
    });
  });

  test('deve definir isSubmitting como true durante a submissão', async () => {
    // Mock de onSubmit que demora um pouco para ser resolvido
    let resolveSubmit: (value: boolean) => void;
    const submitPromise = new Promise<boolean>(resolve => {
      resolveSubmit = resolve;
    });
    const onSubmit = vi.fn().mockImplementation(() => submitPromise);
    
    const { result } = renderHook(() => useForm({ 
      initialValues: {
        ...initialValues,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        acceptTerms: true
      },
      validator,
      onSubmit 
    }));
    
    // Iniciar submissão sem await para capturar estado durante
    let submissionPromise: Promise<any>;
    act(() => {
      submissionPromise = result.current.handleSubmit(createSubmitEvent() as any);
    });
    
    // Verificar que isSubmitting é true enquanto o submit está em andamento
    expect(result.current.isSubmitting).toBe(true);
    
    // Completar a submissão
    await act(async () => {
      resolveSubmit!(true);
      await submissionPromise;
    });
    
    // Verificar que isSubmitting volta a ser false
    expect(result.current.isSubmitting).toBe(false);
  });
}); 