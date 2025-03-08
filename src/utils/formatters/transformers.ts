/**
 * Utilitários para transformação de estruturas de dados
 * 
 * @module utils/formatters/transformers
 */

import { formatISODate, formatISODateTime } from './dates';
import { sanitizeObject } from './sanitize';

/**
 * Interface para opções de transformação
 */
export interface TransformOptions {
  /**
   * Aplica sanitização nos dados (default: true)
   */
  sanitize?: boolean;
  
  /**
   * Converte datas para formato ISO (default: true)
   */
  convertDates?: boolean;
  
  /**
   * Converte valores vazios para null (default: false)
   */
  emptyToNull?: boolean;
  
  /**
   * Remove campos indefinidos e nulos (default: false)
   */
  removeUndefined?: boolean;
  
  /**
   * Campos a serem excluídos da transformação (default: [])
   */
  excludeFields?: string[];
}

/**
 * Transforma um objeto para envio para API
 * 
 * @param data - Objeto a ser transformado
 * @param options - Opções de transformação
 * @returns Objeto transformado
 * 
 * @example
 * prepareDataForAPI({ name: 'teste', date: new Date(), empty: '' })
 * // { name: 'teste', date: '2023-01-31T14:30:00.000Z', empty: null }
 */
export function prepareDataForAPI<T extends Record<string, any>>(
  data: T,
  options: TransformOptions = {}
): Record<string, any> {
  if (!data) return {};
  
  const {
    sanitize = true,
    convertDates = true,
    emptyToNull = true,
    removeUndefined = true,
    excludeFields = []
  } = options;
  
  // Sanitiza objeto se necessário
  const sanitizedData = sanitize ? sanitizeObject(data) : { ...data };
  
  // Objeto resultante
  const result: Record<string, any> = {};
  
  // Processa cada campo
  for (const key in sanitizedData) {
    if (
      Object.prototype.hasOwnProperty.call(sanitizedData, key) &&
      !excludeFields.includes(key)
    ) {
      let value = sanitizedData[key];
      
      // Pula valores undefined
      if (value === undefined && removeUndefined) {
        continue;
      }
      
      // Converte strings vazias para null
      if (emptyToNull && value === '') {
        value = null;
      }
      
      // Converte Date para ISO string
      if (convertDates && value instanceof Date) {
        value = formatISODateTime(value);
      }
      
      // Processa objetos aninhados
      if (value !== null && typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
        value = prepareDataForAPI(value, options);
      }
      
      // Processa arrays
      if (Array.isArray(value)) {
        value = value.map((item: any) => {
          if (item !== null && typeof item === 'object') {
            return prepareDataForAPI(item, options);
          }
          return item;
        });
      }
      
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Converte uma resposta de API para formatos adequados para frontend
 * 
 * @param data - Dados da resposta da API
 * @returns Dados transformados para uso no frontend
 */
export function processAPIResponse<T>(data: any): T {
  if (!data) return null as unknown as T;
  
  // Se for um array, processa cada item
  if (Array.isArray(data)) {
    return data.map(item => processAPIResponse(item)) as unknown as T;
  }
  
  // Se não for um objeto, retorna o valor original
  if (typeof data !== 'object' || data === null) {
    return data as unknown as T;
  }
  
  const result: Record<string, any> = { ...data };
  
  // Processa cada campo
  for (const key in result) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const value = result[key];
      
      // Converte strings ISO para objetos Date
      if (typeof value === 'string' && isISODateString(value)) {
        result[key] = new Date(value);
      } 
      // Processa objetos aninhados
      else if (value !== null && typeof value === 'object') {
        result[key] = processAPIResponse(value);
      }
    }
  }
  
  return result as unknown as T;
}

/**
 * Verifica se uma string é uma data ISO
 * 
 * @param dateStr - String a verificar
 * @returns Verdadeiro se for uma data ISO válida
 * 
 * @private
 */
function isISODateString(dateStr: string): boolean {
  if (typeof dateStr !== 'string') return false;
  
  // Regex para data ISO
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
  
  if (!isoDatePattern.test(dateStr)) return false;
  
  // Tenta criar uma data e verifica se é válida
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Transforma um objeto para o formato de envio FormData
 * 
 * @param data - Objeto a ser transformado
 * @param formData - Objeto FormData existente (opcional)
 * @param parentKey - Chave para campos aninhados
 * @returns Objeto FormData
 * 
 * @example
 * objectToFormData({ name: 'teste', file: fileObject, details: { age: 30 } })
 * // FormData com 'name', 'file' e 'details[age]'
 */
export function objectToFormData(
  data: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey: string = ''
): FormData {
  if (data === null || data === undefined) {
    return formData;
  }
  
  // Para cada propriedade no objeto
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;
      
      // Pula valores undefined
      if (value === undefined) {
        continue;
      }
      
      // File ou Blob
      if ((value instanceof File) || (value instanceof Blob)) {
        formData.append(formKey, value);
      }
      // Array
      else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if ((item instanceof File) || (item instanceof Blob)) {
            formData.append(`${formKey}[${index}]`, item);
          } else if (typeof item === 'object' && item !== null) {
            objectToFormData(item, formData, `${formKey}[${index}]`);
          } else {
            formData.append(`${formKey}[${index}]`, item !== null ? String(item) : '');
          }
        });
      }
      // Objeto não nulo
      else if (typeof value === 'object' && value !== null) {
        objectToFormData(value, formData, formKey);
      }
      // Outros tipos
      else {
        formData.append(formKey, value !== null ? String(value) : '');
      }
    }
  }
  
  return formData;
}

/**
 * Converte um objeto de parâmetros para string de query URL
 * 
 * @param params - Objeto com parâmetros
 * @returns String de query URL
 * 
 * @example
 * objectToQueryString({ name: 'teste', filter: ['a', 'b'], page: 1 })
 * // 'name=teste&filter=a&filter=b&page=1'
 */
export function objectToQueryString(params: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  
  const searchParams = new URLSearchParams();
  
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      
      // Pula valores undefined ou null
      if (value === undefined || value === null) {
        continue;
      }
      
      // Arrays
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item !== undefined && item !== null) {
            searchParams.append(key, String(item));
          }
        });
      }
      // Objetos
      else if (typeof value === 'object' && !(value instanceof Date)) {
        for (const subKey in value) {
          if (Object.prototype.hasOwnProperty.call(value, subKey) && 
              value[subKey] !== undefined && value[subKey] !== null) {
            searchParams.append(`${key}[${subKey}]`, String(value[subKey]));
          }
        }
      }
      // Datas
      else if (value instanceof Date) {
        searchParams.append(key, formatISODate(value));
      }
      // Outros tipos
      else {
        searchParams.append(key, String(value));
      }
    }
  }
  
  return searchParams.toString();
}

/**
 * Parseia uma string de query em um objeto
 * 
 * @param queryString - String de query (sem o '?' inicial)
 * @returns Objeto com parâmetros
 * 
 * @example
 * parseQueryString('name=teste&filter=a&filter=b&page=1')
 * // { name: 'teste', filter: ['a', 'b'], page: '1' }
 */
export function parseQueryString(queryString: string): Record<string, string | string[]> {
  if (!queryString) {
    return {};
  }
  
  const result: Record<string, string | string[]> = {};
  const searchParams = new URLSearchParams(queryString);
  
  searchParams.forEach((value, key) => {
    // Verifica se já existe esta chave como array
    if (key in result) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value);
      } else {
        // Converte para array se já existe mas não é array
        result[key] = [result[key] as string, value];
      }
    } else {
      result[key] = value;
    }
  });
  
  return result;
}

/**
 * Converte um objeto para um formato de visualização em tabela
 * 
 * @param data - Dados a serem formatados
 * @param fields - Campos a serem incluídos e seus rótulos
 * @returns Array formatado para tabela
 * 
 * @example
 * formatTableData([{ id: 1, name: 'João', age: 30 }], { name: 'Nome', age: 'Idade' })
 * // [{ Nome: 'João', Idade: 30 }]
 */
export function formatTableData<T extends Record<string, any>>(
  data: T[],
  fields: Record<string, string>
): Record<string, any>[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  
  return data.map(item => {
    const rowData: Record<string, any> = {};
    
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const label = fields[key];
        rowData[label] = item[key];
      }
    }
    
    return rowData;
  });
}

/**
 * Agrupa um array de objetos por um campo específico
 * 
 * @param array - Array a ser agrupado
 * @param key - Chave para agrupamento
 * @returns Objeto com itens agrupados
 * 
 * @example
 * groupBy([{ type: 'A', value: 1 }, { type: 'B', value: 2 }, { type: 'A', value: 3 }], 'type')
 * // { A: [{ type: 'A', value: 1 }, { type: 'A', value: 3 }], B: [{ type: 'B', value: 2 }] }
 */
export function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  if (!array || !Array.isArray(array)) {
    return {};
  }
  
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
} 