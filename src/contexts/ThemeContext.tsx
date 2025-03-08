/**
 * Contexto de Tema Centralizado
 * 
 * Este contexto gerencia o tema da aplicação (claro/escuro) e fornece acesso
 * centralizado a todos os tokens de design.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import tokens, { DesignTokens } from '../design-system/tokens';

// Tipos de tema suportados
export type ThemeMode = 'light' | 'dark';

// Interface do contexto
interface ThemeContextType {
  // Estado do tema
  theme: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  
  // Tokens de design
  tokens: DesignTokens;
  
  // Helpers
  getTokenValue: (path: string) => any;
}

// Criar o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props do provedor
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

/**
 * Provedor de tema que gerencia o estado do tema e fornece acesso aos tokens
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme 
}) => {
  // Estado do tema
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Prioridade: prop > localStorage > preferência do sistema
    if (initialTheme) return initialTheme;
    
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  });
  
  // Alternar tema
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Atualizar atributo data-theme no HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Observar mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Função auxiliar para acessar tokens por caminho de string
  const getTokenValue = (path: string): any => {
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : null;
    }, tokens as any);
  };
  
  // Valor do contexto
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    tokens,
    getTokenValue
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de tema
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  
  return context;
};

export default ThemeProvider; 