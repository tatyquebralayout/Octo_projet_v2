import { useEffect, useCallback } from 'react';

export function useEscapeKey(handler: () => void): void {
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler();
    }
  }, [handler]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [handleEscKey]);
}