/**
 * Hook para acessar o contexto de tema
 * 
 * @deprecated Use o hook do contexto de tema diretamente: import { useTheme } from '../contexts/ThemeContext'
 */
import { useTheme as useThemeContext } from '../contexts/ThemeContext';

// Reexportar o hook do contexto para manter compatibilidade
export const useTheme = useThemeContext;

export default useTheme; 