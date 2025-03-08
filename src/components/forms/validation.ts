/**
 * Funções e tipos de validação para formulários
 */

// Tipos de erros de validação
export interface ValidationError {
  type: string;
  message: string;
}

// Interface para validadores
export interface Validator {
  validate: (value: any, options?: any) => boolean;
  message: string | ((options?: any) => string);
}

// Interface para regras de validação
export interface ValidationRule {
  type: string;
  options?: any;
  message?: string;
}

// Tipo para funções de validação
export type ValidatorFn = (value: any, options?: any) => boolean;

// Objeto com validadores disponíveis
export const validators: Record<string, Validator> = {
  /**
   * Validador para campos obrigatórios
   */
  required: {
    validate: (value: any) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return Object.keys(value).length > 0;
      return true;
    },
    message: 'Este campo é obrigatório.'
  },

  /**
   * Validador para email
   */
  email: {
    validate: (value: string) => {
      if (!value) return true; // Skip if empty (use required for mandatory)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    },
    message: 'Digite um endereço de email válido.'
  },

  /**
   * Validador para comprimento mínimo
   */
  minLength: {
    validate: (value: string, options: { length: number }) => {
      if (!value) return true;
      return value.length >= options.length;
    },
    message: (options: { length: number }) => 
      `Este campo deve ter pelo menos ${options.length} caracteres.`
  },

  /**
   * Validador para comprimento máximo
   */
  maxLength: {
    validate: (value: string, options: { length: number }) => {
      if (!value) return true;
      return value.length <= options.length;
    },
    message: (options: { length: number }) => 
      `Este campo deve ter no máximo ${options.length} caracteres.`
  },

  /**
   * Validador para valores numéricos
   */
  number: {
    validate: (value: any) => {
      if (!value) return true;
      return !isNaN(Number(value));
    },
    message: 'Este campo deve ser um número.'
  },

  /**
   * Validador para valores mínimos
   */
  min: {
    validate: (value: number, options: { value: number }) => {
      if (value === undefined || value === null) return true;
      return Number(value) >= options.value;
    },
    message: (options: { value: number }) => 
      `O valor mínimo é ${options.value}.`
  },

  /**
   * Validador para valores máximos
   */
  max: {
    validate: (value: number, options: { value: number }) => {
      if (value === undefined || value === null) return true;
      return Number(value) <= options.value;
    },
    message: (options: { value: number }) => 
      `O valor máximo é ${options.value}.`
  },

  /**
   * Validador para padrões (regex)
   */
  pattern: {
    validate: (value: string, options: { pattern: RegExp }) => {
      if (!value) return true;
      return options.pattern.test(value);
    },
    message: 'O valor digitado não corresponde ao formato esperado.'
  },

  /**
   * Validador para correspondência de valores (confirmar senha, etc)
   */
  match: {
    validate: (value: any, options: { target: any }) => {
      return value === options.target;
    },
    message: 'Os valores não correspondem.'
  },

  /**
   * Validador de CPF
   */
  cpf: {
    validate: (value: string) => {
      if (!value) return true;
      
      // Remove caracteres não-numéricos
      const cpf = value.replace(/[^\d]/g, '');
      
      // Valida se tem 11 dígitos
      if (cpf.length !== 11) return false;
      
      // Verifica se todos os dígitos são iguais (caso inválido)
      if (/^(\d)\1+$/.test(cpf)) return false;
      
      // Validação do primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = 11 - (sum % 11);
      let digit1 = remainder > 9 ? 0 : remainder;
      
      // Validação do segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = 11 - (sum % 11);
      let digit2 = remainder > 9 ? 0 : remainder;
      
      // Verifica se os dígitos calculados são iguais aos dígitos informados
      return (
        parseInt(cpf.charAt(9)) === digit1 && 
        parseInt(cpf.charAt(10)) === digit2
      );
    },
    message: 'Digite um CPF válido.'
  },

  /**
   * Validador de telefone brasileiro
   */
  phone: {
    validate: (value: string) => {
      if (!value) return true;
      // Remove caracteres não-numéricos
      const phone = value.replace(/[^\d]/g, '');
      // Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
      return phone.length >= 10 && phone.length <= 11;
    },
    message: 'Digite um telefone válido.'
  },

  /**
   * Validador de URL
   */
  url: {
    validate: (value: string) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch (error) {
        return false;
      }
    },
    message: 'Digite uma URL válida.'
  }
};

/**
 * Função para validar um valor com base em um conjunto de regras
 * @param value - Valor a ser validado
 * @param rules - Regras de validação
 * @returns Array com erros de validação ou array vazio se válido
 */
export function validateValue(value: any, rules: ValidationRule[]): ValidationError[] {
  if (!rules || rules.length === 0) return [];

  const errors: ValidationError[] = [];

  for (const rule of rules) {
    const validator = validators[rule.type];

    if (!validator) {
      console.warn(`Validador "${rule.type}" não encontrado.`);
      continue;
    }

    const isValid = validator.validate(value, rule.options);

    if (!isValid) {
      const message = rule.message || 
        (typeof validator.message === 'function' 
          ? validator.message(rule.options) 
          : validator.message);

      errors.push({
        type: rule.type,
        message
      });

      // Para na primeira regra que falhar se for requerido
      if (rule.type === 'required') break;
    }
  }

  return errors;
}

/**
 * Valida um formulário inteiro com base em regras de validação
 * @param values - Objeto com valores do formulário
 * @param validationSchema - Objeto com regras de validação para cada campo
 * @returns Objeto com erros para cada campo
 */
export function validateForm(
  values: Record<string, any>,
  validationSchema: Record<string, ValidationRule[]>
): Record<string, ValidationError[]> {
  const errors: Record<string, ValidationError[]> = {};

  // Valida cada campo conforme o schema
  for (const field in validationSchema) {
    if (Object.prototype.hasOwnProperty.call(validationSchema, field)) {
      const fieldErrors = validateValue(values[field], validationSchema[field]);
      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }
  }

  return errors;
}

/**
 * Obtém a primeira mensagem de erro para um campo
 * @param errors - Erros de validação do campo
 * @returns Primeira mensagem de erro ou undefined
 */
export function getFirstError(errors?: ValidationError[]): string | undefined {
  return errors && errors.length > 0 ? errors[0].message : undefined;
}

/**
 * Verifica se um formulário é válido
 * @param errors - Objeto com erros de validação do formulário
 * @returns true se não houver erros
 */
export function isFormValid(errors: Record<string, ValidationError[]>): boolean {
  return Object.keys(errors).length === 0;
}

/**
 * Helper para criar regras de validação
 */
export const rules = {
  required: (): ValidationRule => ({ type: 'required' }),
  email: (): ValidationRule => ({ type: 'email' }),
  minLength: (length: number): ValidationRule => ({ 
    type: 'minLength', 
    options: { length } 
  }),
  maxLength: (length: number): ValidationRule => ({ 
    type: 'maxLength', 
    options: { length } 
  }),
  min: (value: number): ValidationRule => ({ 
    type: 'min', 
    options: { value } 
  }),
  max: (value: number): ValidationRule => ({ 
    type: 'max', 
    options: { value } 
  }),
  pattern: (pattern: RegExp): ValidationRule => ({ 
    type: 'pattern', 
    options: { pattern } 
  }),
  match: (target: any): ValidationRule => ({ 
    type: 'match', 
    options: { target } 
  }),
  cpf: (): ValidationRule => ({ type: 'cpf' }),
  phone: (): ValidationRule => ({ type: 'phone' }),
  url: (): ValidationRule => ({ type: 'url' }),
  custom: (
    type: string, 
    validate: ValidatorFn, 
    message: string, 
    options?: any
  ): ValidationRule => ({ 
    type, 
    options,
    message 
  })
}; 