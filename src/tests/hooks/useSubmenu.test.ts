import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useSubmenu } from '../../hooks/useSubmenu';

describe('useSubmenu Hook', () => {
  test('deve iniciar com activeSubmenu como null', () => {
    const { result } = renderHook(() => useSubmenu());
    expect(result.current.activeSubmenu).toBeNull();
  });

  test('deve abrir um submenu ao chamar openSubmenu', () => {
    const { result } = renderHook(() => useSubmenu());
    
    act(() => {
      result.current.openSubmenu('produtos');
    });
    
    expect(result.current.activeSubmenu).toBe('produtos');
  });

  test('deve fechar o submenu ao chamar closeSubmenu', () => {
    const { result } = renderHook(() => useSubmenu());
    
    act(() => {
      result.current.openSubmenu('produtos');
    });
    
    expect(result.current.activeSubmenu).toBe('produtos');
    
    act(() => {
      result.current.closeSubmenu();
    });
    
    expect(result.current.activeSubmenu).toBeNull();
  });

  test('deve verificar corretamente se um submenu está aberto', () => {
    const { result } = renderHook(() => useSubmenu());
    
    act(() => {
      result.current.openSubmenu('produtos');
    });
    
    expect(result.current.isSubmenuOpen('produtos')).toBe(true);
    expect(result.current.isSubmenuOpen('contato')).toBe(false);
  });

  test('deve trocar entre submenus ao abrir um novo com openSubmenu', () => {
    const { result } = renderHook(() => useSubmenu());
    
    act(() => {
      result.current.openSubmenu('produtos');
    });
    
    expect(result.current.activeSubmenu).toBe('produtos');
    
    act(() => {
      result.current.openSubmenu('servicos');
    });
    
    expect(result.current.activeSubmenu).toBe('servicos');
    expect(result.current.isSubmenuOpen('produtos')).toBe(false);
    expect(result.current.isSubmenuOpen('servicos')).toBe(true);
  });
}); 