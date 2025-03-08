/**
 * Utilitários para o sistema de cache
 */

/**
 * Cria um hash a partir de uma chave e parâmetros opcionais
 * @param key Chave base
 * @param params Parâmetros adicionais
 * @returns Hash único para a combinação de chave e parâmetros
 */
export function createHash(key: string, params?: any): string {
  // Normalizar a chave
  const normalizedKey = key.toLowerCase().trim();
  
  // Se não houver parâmetros, usar a chave diretamente
  if (!params) {
    return normalizedKey;
  }
  
  // Converter parâmetros para string ordenada para garantir consistência
  const paramsString = JSON.stringify(sortObjectKeys(params));
  
  // Combinar chave e parâmetros
  return `${normalizedKey}:${paramsString}`;
}

/**
 * Ordena as chaves de um objeto alfabeticamente
 * Importante para garantir que o mesmo objeto gere sempre o mesmo hash
 * @param obj Objeto a ser ordenado
 * @returns Novo objeto com chaves ordenadas
 */
function sortObjectKeys(obj: Record<string, any>): Record<string, any> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      const value = obj[key];
      
      // Recursivamente ordenar sub-objetos
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = sortObjectKeys(value);
      } else {
        result[key] = value;
      }
      
      return result;
    }, {} as Record<string, any>);
}

/**
 * Calcula o tamanho aproximado de um objeto em bytes
 * @param object Objeto a ser medido
 * @returns Tamanho aproximado em bytes
 */
export function estimateSize(object: any): number {
  const jsonString = JSON.stringify(object);
  return jsonString.length * 2; // Aproximação para UTF-16
}

/**
 * Verifica se dois objetos são iguais
 * @param obj1 Primeiro objeto
 * @param obj2 Segundo objeto
 * @returns true se os objetos forem iguais
 */
export function areEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }
  
  if (
    typeof obj1 !== 'object' || 
    typeof obj2 !== 'object' || 
    obj1 === null || 
    obj2 === null
  ) {
    return false;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  return keys1.every(key => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false;
    }
    
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return areEqual(obj1[key], obj2[key]);
    }
    
    return obj1[key] === obj2[key];
  });
}

/**
 * Formata um tamanho em bytes para uma string legível
 * @param bytes Tamanho em bytes
 * @param decimals Número de casas decimais
 * @returns String formatada (ex: "1.5 MB")
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Formata uma data para exibição
 * @param timestamp Timestamp em milissegundos
 * @returns String formatada com data e hora
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Calcula o tempo restante até a expiração
 * @param expiresAt Timestamp de expiração
 * @returns String com tempo restante formatado
 */
export function getTimeRemaining(expiresAt: number): string {
  const now = Date.now();
  
  if (expiresAt <= now) {
    return 'Expirado';
  }
  
  const seconds = Math.floor((expiresAt - now) / 1000);
  
  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  }
  
  const minutes = Math.floor(seconds / 60);
  
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  
  if (hours < 24) {
    return `${hours} hora${hours !== 1 ? 's' : ''}`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days} dia${days !== 1 ? 's' : ''}`;
} 