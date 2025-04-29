import '@testing-library/jest-dom'
import { vi, expect, beforeEach } from 'vitest'

// Configuración global para los tests
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

beforeEach(() => {
  document.body.innerHTML = '';
  const div = document.createElement('div');
  div.setAttribute('id', 'root');
  document.body.appendChild(div);
});

expect.extend({
  toBeInTheDocument: (received: unknown) => {
    const pass = received !== null;
    return {
      message: () => `expected ${received} to be in the document`,
      pass,
    };
  },
  toBeDisabled: (received: unknown) => {
    const element = received as HTMLButtonElement;
    const pass = element.disabled === true;
    return {
      message: () => `expected ${received} to be disabled`,
      pass,
    };
  },
  toHaveAttribute: (received: unknown, attr: string, value?: string) => {
    const element = received as HTMLElement;
    const hasAttr = element.hasAttribute(attr);
    const attrValue = element.getAttribute(attr);
    const pass = value ? hasAttr && attrValue === value : hasAttr;
    return {
      message: () => `expected ${received} to have attribute ${attr}${value ? ` with value ${value}` : ''}`,
      pass,
    };
  },
}); 