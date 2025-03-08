/**
 * Utilitários para validação de dados
 * 
 * @module utils/formatters/validation
 */

/**
 * Interface para resultados de validação
 */
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Valida se um string de email é válido
 * 
 * @param email - Email a ser validado
 * @returns Resultado da validação
 * 
 * @example
 * isValidEmail('usuario@dominio.com') // { isValid: true }
 */
export function isValidEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, message: 'O email é obrigatório' };
  }
  
  // Regex para validação de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Formato de email inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida se uma string de CPF é válida
 * 
 * @param cpf - CPF a ser validado (com ou sem formatação)
 * @returns Resultado da validação
 * 
 * @example
 * isValidCPF('123.456.789-09') // { isValid: false, message: 'CPF inválido' }
 */
export function isValidCPF(cpf: string): ValidationResult {
  if (!cpf) {
    return { isValid: false, message: 'O CPF é obrigatório' };
  }
  
  // Remove caracteres não-numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return { isValid: false, message: 'CPF deve ter 11 dígitos' };
  }
  
  // Verifica se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return { isValid: false, message: 'CPF inválido' };
  }
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  const digit1 = remainder > 9 ? 0 : remainder;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  const digit2 = remainder > 9 ? 0 : remainder;
  
  // Verifica se os dígitos calculados são iguais aos dígitos informados
  if (
    parseInt(cleanCPF.charAt(9)) !== digit1 || 
    parseInt(cleanCPF.charAt(10)) !== digit2
  ) {
    return { isValid: false, message: 'CPF inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida se uma string de CNPJ é válida
 * 
 * @param cnpj - CNPJ a ser validado (com ou sem formatação)
 * @returns Resultado da validação
 * 
 * @example
 * isValidCNPJ('12.345.678/0001-90') // { isValid: false, message: 'CNPJ inválido' }
 */
export function isValidCNPJ(cnpj: string): ValidationResult {
  if (!cnpj) {
    return { isValid: false, message: 'O CNPJ é obrigatório' };
  }
  
  // Remove caracteres não-numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) {
    return { isValid: false, message: 'CNPJ deve ter 14 dígitos' };
  }
  
  // Verifica se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return { isValid: false, message: 'CNPJ inválido' };
  }
  
  // Validação do primeiro dígito verificador
  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  const digits = cleanCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return { isValid: false, message: 'CNPJ inválido' };
  }
  
  // Validação do segundo dígito verificador
  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return { isValid: false, message: 'CNPJ inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida se uma string de telefone é válida
 * 
 * @param phone - Telefone a ser validado (com ou sem formatação)
 * @returns Resultado da validação
 * 
 * @example
 * isValidPhone('(11) 99999-9999') // { isValid: true }
 */
export function isValidPhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: false, message: 'O telefone é obrigatório' };
  }
  
  // Remove caracteres não-numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Verifica se tem entre 10 e 11 dígitos (telefone fixo ou celular com DDD)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return { isValid: false, message: 'Telefone deve ter entre 10 e 11 dígitos' };
  }
  
  // Verifica se é celular (começando com 9)
  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') {
    return { isValid: false, message: 'Formato de celular inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida se uma string de CEP é válida
 * 
 * @param cep - CEP a ser validado (com ou sem formatação)
 * @returns Resultado da validação
 * 
 * @example
 * isValidCEP('12345-678') // { isValid: true }
 */
export function isValidCEP(cep: string): ValidationResult {
  if (!cep) {
    return { isValid: false, message: 'O CEP é obrigatório' };
  }
  
  // Remove caracteres não-numéricos
  const cleanCEP = cep.replace(/\D/g, '');
  
  if (cleanCEP.length !== 8) {
    return { isValid: false, message: 'CEP deve ter 8 dígitos' };
  }
  
  // Verifica se não é um CEP com todos os dígitos iguais (inválido)
  if (/^(\d)\1+$/.test(cleanCEP)) {
    return { isValid: false, message: 'CEP inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida se uma URL é válida
 * 
 * @param url - URL a ser validada
 * @returns Resultado da validação
 * 
 * @example
 * isValidURL('https://www.example.com') // { isValid: true }
 */
export function isValidURL(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, message: 'A URL é obrigatória' };
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, message: 'URL inválida' };
  }
}

/**
 * Valida uma data
 * 
 * @param date - Data a ser validada (string em formato DD/MM/YYYY)
 * @returns Resultado da validação
 * 
 * @example
 * isValidDate('31/12/2023') // { isValid: true }
 */
export function isValidDate(date: string): ValidationResult {
  if (!date) {
    return { isValid: false, message: 'A data é obrigatória' };
  }
  
  // Verifica formato DD/MM/YYYY
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(dateRegex);
  
  if (!match) {
    return { isValid: false, message: 'Formato de data inválido. Use DD/MM/YYYY' };
  }
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // JavaScript month is 0-based
  const year = parseInt(match[3], 10);
  
  // Cria uma data com os valores e verifica se são iguais aos informados
  const dateObj = new Date(year, month, day);
  
  if (
    dateObj.getDate() !== day ||
    dateObj.getMonth() !== month ||
    dateObj.getFullYear() !== year
  ) {
    return { isValid: false, message: 'Data inválida' };
  }
  
  return { isValid: true };
}

/**
 * Valida um valor mínimo e máximo
 * 
 * @param value - Valor numérico a ser validado
 * @param min - Valor mínimo permitido (opcional)
 * @param max - Valor máximo permitido (opcional)
 * @returns Resultado da validação
 * 
 * @example
 * isInRange(15, 10, 20) // { isValid: true }
 */
export function isInRange(
  value: number, 
  min?: number, 
  max?: number
): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'O valor é obrigatório' };
  }
  
  if (min !== undefined && value < min) {
    return { isValid: false, message: `O valor deve ser maior ou igual a ${min}` };
  }
  
  if (max !== undefined && value > max) {
    return { isValid: false, message: `O valor deve ser menor ou igual a ${max}` };
  }
  
  return { isValid: true };
}

/**
 * Valida se um comprimento de string está dentro dos limites
 * 
 * @param value - String a ser validada
 * @param min - Comprimento mínimo permitido (opcional)
 * @param max - Comprimento máximo permitido (opcional)
 * @returns Resultado da validação
 * 
 * @example
 * isLengthValid('teste', 3, 10) // { isValid: true }
 */
export function isLengthValid(
  value: string, 
  min?: number, 
  max?: number
): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, message: 'O valor é obrigatório' };
  }
  
  if (min !== undefined && value.length < min) {
    return { isValid: false, message: `Deve ter pelo menos ${min} caracteres` };
  }
  
  if (max !== undefined && value.length > max) {
    return { isValid: false, message: `Deve ter no máximo ${max} caracteres` };
  }
  
  return { isValid: true };
}

/**
 * Valida se um valor corresponde a uma expressão regular
 * 
 * @param value - Valor a ser validado
 * @param pattern - Padrão de expressão regular
 * @param message - Mensagem de erro personalizada
 * @returns Resultado da validação
 * 
 * @example
 * matchesPattern('ABC123', /^[A-Z]{3}\d{3}$/, 'Formato inválido') // { isValid: true }
 */
export function matchesPattern(
  value: string, 
  pattern: RegExp, 
  message: string = 'Formato inválido'
): ValidationResult {
  if (!value) {
    return { isValid: false, message: 'O valor é obrigatório' };
  }
  
  if (!pattern.test(value)) {
    return { isValid: false, message };
  }
  
  return { isValid: true };
}

/**
 * Valida se uma senha atende aos requisitos de segurança
 * 
 * @param password - Senha a ser validada
 * @param options - Opções de validação (requisitos mínimos)
 * @returns Resultado da validação
 * 
 * @example
 * isStrongPassword('Abc123!@#') // { isValid: true }
 */
export function isStrongPassword(
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): ValidationResult {
  if (!password) {
    return { isValid: false, message: 'A senha é obrigatória' };
  }
  
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = options;
  
  const errors: string[] = [];
  
  if (password.length < minLength) {
    errors.push(`Deve ter pelo menos ${minLength} caracteres`);
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Deve ter pelo menos uma letra maiúscula');
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Deve ter pelo menos uma letra minúscula');
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Deve ter pelo menos um número');
  }
  
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Deve ter pelo menos um caractere especial');
  }
  
  if (errors.length > 0) {
    return { isValid: false, message: errors.join('. ') };
  }
  
  return { isValid: true };
}

/**
 * Valida um objeto completo com base em um esquema de validação
 * 
 * @param data - Objeto a ser validado
 * @param validationSchema - Esquema de validação
 * @returns Objeto com resultados de validação por campo
 * 
 * @example
 * validateObject({ email: 'test@example.com', phone: '1234' }, {
 *   email: (v) => isValidEmail(v),
 *   phone: (v) => isValidPhone(v)
 * }) 
 * // { email: { isValid: true }, phone: { isValid: false, message: '...' } }
 */
export function validateObject<T extends Record<string, any>>(
  data: T,
  validationSchema: Record<keyof T, (value: any) => ValidationResult>
): Record<keyof T, ValidationResult> {
  const result: Record<string, ValidationResult> = {};
  
  for (const key in validationSchema) {
    if (Object.prototype.hasOwnProperty.call(validationSchema, key)) {
      const validator = validationSchema[key];
      result[key] = validator(data[key]);
    }
  }
  
  return result as Record<keyof T, ValidationResult>;
}

/**
 * Verifica se um objeto é válido com base em resultados de validação
 * 
 * @param validationResults - Resultados de validação por campo
 * @returns Verdadeiro se todos os campos forem válidos
 */
export function isObjectValid(
  validationResults: Record<string, ValidationResult>
): boolean {
  return Object.values(validationResults).every(result => result.isValid);
} 