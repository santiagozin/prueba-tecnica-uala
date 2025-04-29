import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import SelectFilter from '@/components/selectFilter';

describe('SelectFilter', () => {
  const mockItems = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];

  it('renderiza correctamente todos los items', () => {
    const mockOnItemSelect = vi.fn();
    render(
      <SelectFilter 
        items={mockItems} 
        onItemSelect={mockOnItemSelect} 
        selectedItems={[]} 
      />
    );

    // Verificar que todos los items se renderizan
    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('aplica el estilo correcto a los items seleccionados', () => {
    const mockOnItemSelect = vi.fn();
    const selectedItems = ['1', '3'];
    
    render(
      <SelectFilter 
        items={mockItems} 
        onItemSelect={mockOnItemSelect} 
        selectedItems={selectedItems} 
      />
    );

    // Verificar que los items seleccionados tienen la clase bg-primary/5
    const selectedElements = screen.getAllByText(/Item [13]/);
    selectedElements.forEach(element => {
      expect(element.parentElement?.parentElement).toHaveClass('bg-primary/5');
    });

    // Verificar que el item no seleccionado no tiene la clase bg-primary/5
    const unselectedElement = screen.getByText('Item 2');
    expect(unselectedElement.parentElement?.parentElement).not.toHaveClass('bg-primary/5');
  });

  it('llama a onItemSelect cuando se hace click en un item', () => {
    const mockOnItemSelect = vi.fn();
    render(
      <SelectFilter 
        items={mockItems} 
        onItemSelect={mockOnItemSelect} 
        selectedItems={[]} 
      />
    );

    // Hacer click en el primer item
    fireEvent.click(screen.getByText('Item 1'));

    // Verificar que onItemSelect fue llamado con el id correcto
    expect(mockOnItemSelect).toHaveBeenCalledWith('1');
  });

  it('aplica el color de texto correcto a los items seleccionados y no seleccionados', () => {
    const mockOnItemSelect = vi.fn();
    const selectedItems = ['1'];
    
    render(
      <SelectFilter 
        items={mockItems} 
        onItemSelect={mockOnItemSelect} 
        selectedItems={selectedItems} 
      />
    );

    // Verificar que el item seleccionado tiene el color primary
    const selectedElement = screen.getByText('Item 1');
    expect(selectedElement).toHaveClass('text-primary');

    // Verificar que los items no seleccionados tienen el color gray-700
    const unselectedElements = screen.getAllByText(/Item [23]/);
    unselectedElements.forEach(element => {
      expect(element).toHaveClass('text-gray-700');
    });
  });
}); 