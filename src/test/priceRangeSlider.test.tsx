import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import PriceRangeSlider from '@/components/priceRangeSlider';

describe('PriceRangeSlider', () => {
  it('renderiza correctamente con los valores iniciales', () => {
    const mockOnChange = vi.fn();
    render(
      <PriceRangeSlider 
        value={[100, 500]} 
        onChange={mockOnChange} 
        min={10} 
        max={1000} 
      />
    );

    expect(screen.getByText('$100 - $500')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    
    expect(screen.getByText('Monto mínimo')).toBeInTheDocument();
    expect(screen.getByText('Monto máximo')).toBeInTheDocument();
  });

  it('actualiza el valor mostrado cuando cambia la prop value', () => {
    const mockOnChange = vi.fn();
    const { rerender } = render(
      <PriceRangeSlider 
        value={[100, 500]} 
        onChange={mockOnChange} 
        min={10} 
        max={1000} 
      />
    );

    expect(screen.getByText('$100 - $500')).toBeInTheDocument();
    
    rerender(
      <PriceRangeSlider 
        value={[200, 800]} 
        onChange={mockOnChange} 
        min={10} 
        max={1000} 
      />
    );
    
    expect(screen.getByText('$200 - $800')).toBeInTheDocument();
  });

  it('muestra los valores actuales del rango seleccionado', () => {
    const mockOnChange = vi.fn();
    render(
      <PriceRangeSlider 
        value={[50, 150]} 
        onChange={mockOnChange} 
        min={0} 
        max={200} 
      />
    );

    expect(screen.getByText('$50 - $150')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
  });
}); 