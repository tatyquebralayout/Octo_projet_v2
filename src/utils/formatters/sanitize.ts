/**
 * Utilitários para sanitização de dados
 * 
 * @module utils/formatters/sanitize
 */

/**
 * Remove caracteres HTML/XML potencialmente perigosos
 * 
 * @param html - String que pode conter HTML/XML
 * @returns String limpa de caracteres HTML/XML
 * 
 * @example
 * sanitizeHTML('<script>alert("teste")</script>') // 'alert("teste")'
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';
  
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<\/?\w+(?:\s+[^>]*)?>/g, '')
    .replace(/&[^;]+;/g, match => {
      const entities: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#x3D;': '='
      };
      return entities[match] || match;
    });
}

/**
 * Sanitiza um texto para uso em SQL (remoção básica de caracteres perigosos)
 * 
 * @param value - Valor a ser sanitizado
 * @returns Valor sanitizado para SQL
 * 
 * @example
 * sanitizeSQL("'; DROP TABLE users; --") // " DROP TABLE users "
 */
export function sanitizeSQL(value: string): string {
  if (!value) return '';
  
  return value
    .replace(/'/g, '')
    .replace(/"/g, '')
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '');
}

/**
 * Sanitiza strings para uso seguro em URLs
 * 
 * @param value - Valor a ser sanitizado
 * @returns Valor seguro para URLs
 * 
 * @example
 * sanitizeURLParam('teste & mais') // 'teste%20%26%20mais'
 */
export function sanitizeURLParam(value: string): string {
  if (!value) return '';
  
  return encodeURIComponent(value);
}

/**
 * Remove todos os caracteres não numéricos de uma string
 * 
 * @param value - Valor a ser sanitizado
 * @returns Apenas os dígitos do valor original
 * 
 * @example
 * digitsOnly('(11) 99999-9999') // '11999999999'
 */
export function digitsOnly(value: string): string {
  if (!value) return '';
  
  return value.replace(/\D/g, '');
}

/**
 * Remove caracteres especiais, mantendo apenas letras, números e espaços
 * 
 * @param value - Valor a ser sanitizado
 * @returns String limpa
 * 
 * @example
 * removeSpecialChars('Teste: 123!') // 'Teste 123'
 */
export function removeSpecialChars(value: string): string {
  if (!value) return '';
  
  return value.replace(/[^\w\s]/gi, '');
}

/**
 * Sanitiza uma string de nome para evitar caracteres inválidos
 * 
 * @param name - Nome a ser sanitizado
 * @returns Nome sanitizado
 * 
 * @example
 * sanitizeName('João123') // 'João'
 */
export function sanitizeName(name: string): string {
  if (!name) return '';
  
  // Remove números e caracteres especiais, mantém letras, espaços e acentos
  return name.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').trim();
}

/**
 * Sanitiza um valor para uso seguro em um atributo de elemento HTML
 * 
 * @param value - Valor a ser sanitizado
 * @returns Valor sanitizado para atributo HTML
 * 
 * @example
 * sanitizeHTMLAttribute('alert("teste")') // 'alert(&quot;teste&quot;)'
 */
export function sanitizeHTMLAttribute(value: string): string {
  if (!value) return '';
  
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  return value.replace(/[&<>"'`=\/]/g, match => entities[match]);
}

/**
 * Sanitiza um objeto completo
 * 
 * @param data - Objeto a ser sanitizado
 * @returns Objeto com valores sanitizados
 * 
 * @example
 * sanitizeObject({ name: '<script>alert("teste")</script>', age: 30 })
 * // { name: 'alert("teste")', age: 30 }
 */
export function sanitizeObject<T extends Record<string, any>>(data: T): T {
  if (!data || typeof data !== 'object') return data;
  
  const result = { ...data };
  
  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const value = result[key];
      
      if (typeof value === 'string') {
        result[key] = sanitizeHTML(value) as any;
      } else if (typeof value === 'object' && value !== null) {
        result[key] = sanitizeObject(value);
      }
    }
  }
  
  return result;
}

/**
 * Sanitiza um array de strings
 * 
 * @param values - Array de strings a serem sanitizadas
 * @returns Array com valores sanitizados
 * 
 * @example
 * sanitizeArray(['<script>alert(1)</script>', 'texto normal'])
 * // ['alert(1)', 'texto normal']
 */
export function sanitizeArray(values: string[]): string[] {
  if (!Array.isArray(values)) return [];
  
  return values.map(value => 
    typeof value === 'string' ? sanitizeHTML(value) : value
  );
}

/**
 * Sanitiza dados de formulário
 * 
 * @param formData - Dados do formulário
 * @returns Dados sanitizados
 */
export function sanitizeFormData<T extends Record<string, any>>(formData: T): T {
  return sanitizeObject(formData);
} 