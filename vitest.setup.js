import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

// Cleanup automaticamente após cada teste
afterEach(() => {
  cleanup();
}); 