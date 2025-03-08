/**
 * Componentes de UI base para estados comuns
 * Este módulo exporta componentes para estados de UI como loading, erro e conteúdo vazio
 */

export { default as Loading } from './Loading';
export { default as Error } from './Error';
export { default as Empty } from './Empty';

// Tipos exportados
export type { LoadingProps, LoadingSize, LoadingVariant } from './Loading';
export type { ErrorProps, ErrorSize, ErrorVariant } from './Error';
export type { EmptyProps, EmptySize, EmptyVariant } from './Empty'; 