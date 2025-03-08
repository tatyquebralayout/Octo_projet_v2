import React from 'react';
import { ErrorBoundary as EnhancedErrorBoundary } from '../utils/errors';

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <EnhancedErrorBoundary>
      {children}
    </EnhancedErrorBoundary>
  );
}