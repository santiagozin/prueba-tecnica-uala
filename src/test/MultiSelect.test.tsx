import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { MultiSelect } from '@/components/MultiSelect';

const mockOptions = [
  { value: '1', label: 'Opción 1' },
  { value: '2', label: 'Opción 2' },
  { value: '3', label: 'Opción 3' }
];

describe('MultiSelect Component', () => {
  it('renderiza correctamente con valores por defecto', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onChange={onChange}
        enabled={false}
        onToggle={onToggle}
      />
    );

    // Verificar que el switch estaa desactivado
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    // Verificar que el botón muestra el placeholder por defecto
    const button = screen.getByRole('combobox');
    expect(button).toHaveTextContent('Seleccionar opciones...');
    expect(button).toBeDisabled();
  });

  it('muestra el número correcto de elementos seleccionados', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={['1', '2']}
        onChange={onChange}
        enabled={true}
        onToggle={onToggle}
      />
    );

    const button = screen.getByRole('combobox');
    expect(button).toHaveTextContent('2 seleccionados');
  });

  it('permite activar/desactivar el filtro', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onChange={onChange}
        enabled={false}
        onToggle={onToggle}
      />
    );

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('muestra el popover al hacer clic en el botón', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onChange={onChange}
        enabled={true}
        onToggle={onToggle}
      />
    );

    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Verificar que las opciones son visibles
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('permite seleccionar opciones', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onChange={onChange}
        enabled={true}
        onToggle={onToggle}
      />
    );

    // Abrir el popover
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Seleccionar una opcion
    const option = screen.getByText('Opción 1');
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith(['1']);
  });

  it('permite deseleccionar opciones', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={['1']}
        onChange={onChange}
        enabled={true}
        onToggle={onToggle}
      />
    );

    // Abrir el popover
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Deseleccionar una opcion
    const option = screen.getByText('Opción 1');
    fireEvent.click(option);

    // Verificar que se llama a onChange con un array vacio
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('permite buscar opciones', () => {
    const onChange = vi.fn();
    const onToggle = vi.fn();

    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onChange={onChange}
        enabled={true}
        onToggle={onToggle}
      />
    );

    const button = screen.getByRole('combobox');
    fireEvent.click(button);


    const searchInput = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(searchInput, { target: { value: 'Opción 1' } });

    expect(screen.getByText('Opción 1')).toBeInTheDocument();
    expect(screen.queryByText('Opción 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Opción 3')).not.toBeInTheDocument();
  });
}); 