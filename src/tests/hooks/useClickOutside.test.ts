/**
 * @vitest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useClickOutside } from '../../hooks/useClickOutside';

describe('useClickOutside Hook', () => {
  let ref: { current: HTMLDivElement | null };
  let handler: ReturnType<typeof vi.fn>;
  let divElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;
  
  beforeEach(() => {
    // Criar elementos
    divElement = document.createElement('div');
    outsideElement = document.createElement('div');
    document.body.appendChild(divElement);
    document.body.appendChild(outsideElement);
    
    // Configurar ref e handler
    ref = { current: divElement };
    handler = vi.fn();
    
    // Limpar mocks
    vi.clearAllMocks();
  });
  
  test('deve chamar o callback quando ocorrer clique fora do elemento', () => {
    // Renderizar o hook
    renderHook(() => useClickOutside(ref, handler));
    
    // Simular clique fora do elemento
    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    });
    outsideElement.dispatchEvent(mouseEvent);
    
    // Verificar se o handler foi chamado
    expect(handler).toHaveBeenCalledTimes(1);
  });
  
  test('não deve chamar o callback quando ocorrer clique dentro do elemento', () => {
    // Renderizar o hook
    renderHook(() => useClickOutside(ref, handler));
    
    // Simular clique dentro do elemento
    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    });
    divElement.dispatchEvent(mouseEvent);
    
    // Verificar que o handler não foi chamado
    expect(handler).not.toHaveBeenCalled();
  });
  
  test('não deve chamar o callback quando o ref for null', () => {
    // Configurar ref como null
    ref.current = null;
    
    // Renderizar o hook
    renderHook(() => useClickOutside(ref, handler));
    
    // Simular clique fora do elemento
    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    });
    outsideElement.dispatchEvent(mouseEvent);
    
    // Verificar que o handler não foi chamado
    expect(handler).not.toHaveBeenCalled();
  });
  
  test('deve remover o event listener ao desmontar', () => {
    // Spy no document.removeEventListener
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    
    // Renderizar o hook
    const { unmount } = renderHook(() => useClickOutside(ref, handler));
    
    // Desmontar
    unmount();
    
    // Verificar que removeEventListener foi chamado
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
}); 