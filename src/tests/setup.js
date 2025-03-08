import { expect } from 'vitest';
import '@testing-library/jest-dom';

// Adiciona os matchers do jest-dom ao vitest
expect.extend(window.__vitest_matchers || {}); 