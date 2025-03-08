/**
 * Hook específico para o formulário de contato
 */
import { useCallback } from 'react';
import { useForm, FormErrors } from './useForm';
import { ContactFormData } from '../services/api/types';
import { apiService } from '../services/api';
import { ENDPOINTS } from '../services/api/config';

// Valores iniciais do formulário
const initialValues: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  termsAccepted: false,
  newsletterSubscribe: false
};

// Validador do formulário
const validateContactForm = (values: ContactFormData): FormErrors<ContactFormData> => {
  const errors: FormErrors<ContactFormData> = {};
  
  // Validação do nome
  if (!values.name.trim()) {
    errors.name = 'Nome é obrigatório';
  } else if (values.name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 caracteres';
  }
  
  // Validação do email
  if (!values.email.trim()) {
    errors.email = 'Email é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email inválido';
  }
  
  // Validação do telefone (opcional)
  if (values.phone && !/^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/.test(values.phone)) {
    errors.phone = 'Telefone inválido';
  }
  
  // Validação do assunto
  if (!values.subject.trim()) {
    errors.subject = 'Assunto é obrigatório';
  } else if (values.subject.trim().length < 5) {
    errors.subject = 'Assunto deve ter pelo menos 5 caracteres';
  }
  
  // Validação da mensagem
  if (!values.message.trim()) {
    errors.message = 'Mensagem é obrigatória';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Mensagem deve ter pelo menos 20 caracteres';
  }
  
  // Validação dos termos
  if (!values.termsAccepted) {
    errors.termsAccepted = 'Você deve aceitar os termos para continuar';
  }
  
  return errors;
};

/**
 * Hook para gerenciar o formulário de contato
 */
export const useContactForm = () => {
  // Manipulador de submissão
  const handleSubmit = useCallback(async (values: ContactFormData) => {
    try {
      const response = await apiService.post(
        ENDPOINTS.CONTACT.SUBMIT,
        values
      );
      
      return response.success;
    } catch (error) {
      console.error('Erro ao enviar formulário de contato:', error);
      return false;
    }
  }, []);
  
  // Utiliza o hook useForm com os valores iniciais, validador e manipulador de submissão
  const form = useForm({
    initialValues,
    validator: validateContactForm,
    onSubmit: handleSubmit
  });
  
  return form;
};

export default useContactForm; 