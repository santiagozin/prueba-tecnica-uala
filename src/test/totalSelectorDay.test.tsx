import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import TotalSelectorDay from '@/components/totalSelectorDay';
import { Transaction } from '@/types/transaction';

describe('TotalSelectorDay', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      card: 'Visa',
      installments: 1,
      paymentMethod: 'credit',
      date: new Date().toISOString(),
      status: 'completed',
      type: 'payment',
      description: 'Test transaction 1'
    },
    {
      id: '2',
      amount: 200,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // ayer
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      card: 'Mastercard',
      installments: 1,
      paymentMethod: 'credit',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
      type: 'payment',
      description: 'Test transaction 2'
    },
    {
      id: '3',
      amount: 300,
      createdAt: new Date(Date.now() - 604800000).toISOString(), // hace una semana
      updatedAt: new Date(Date.now() - 604800000).toISOString(),
      card: 'Amex',
      installments: 1,
      paymentMethod: 'credit',
      date: new Date(Date.now() - 604800000).toISOString(),
      status: 'completed',
      type: 'payment',
      description: 'Test transaction 3'
    }
  ];

  it('renderiza correctamente con el período diario seleccionado', () => {
    const mockSetSelectedPeriod = vi.fn();
    render(
      <TotalSelectorDay 
        selectedPeriod="daily"
        setSelectedPeriod={mockSetSelectedPeriod}
        transactions={mockTransactions}
      />
    );

    // Verificar que se muestran los botones de periodo
    expect(screen.getByText('Diario')).toBeInTheDocument();
    expect(screen.getByText('Semanal')).toBeInTheDocument();
    expect(screen.getByText('Mensual')).toBeInTheDocument();

    // Verificar que el boton diario está seleccionado
    const dailyButton = screen.getByText('Diario');
    expect(dailyButton).toHaveClass('font-medium');
  });

  it('llama a setSelectedPeriod cuando se hace click en un botón', () => {
    const mockSetSelectedPeriod = vi.fn();
    render(
      <TotalSelectorDay 
        selectedPeriod="daily"
        setSelectedPeriod={mockSetSelectedPeriod}
        transactions={mockTransactions}
      />
    );

    // Hacer click en el boton semanal
    fireEvent.click(screen.getByText('Semanal'));
    expect(mockSetSelectedPeriod).toHaveBeenCalledWith('weekly');

    // Hacer click en el boton mensual
    fireEvent.click(screen.getByText('Mensual'));
    expect(mockSetSelectedPeriod).toHaveBeenCalledWith('monthly');
  });

  it('calcula correctamente el total para el período diario', () => {
    const mockSetSelectedPeriod = vi.fn();
    render(
      <TotalSelectorDay 
        selectedPeriod="daily"
        setSelectedPeriod={mockSetSelectedPeriod}
        transactions={mockTransactions}
      />
    );

    // Solo la transaccion de hoy debería ser incluida
    const totalElement = screen.getByTestId('total-amount');
    expect(totalElement).toHaveTextContent('+ $ 100,00');
  });

  it('calcula correctamente el total para el período semanal', () => {
    const mockSetSelectedPeriod = vi.fn();
    render(
      <TotalSelectorDay 
        selectedPeriod="weekly"
        setSelectedPeriod={mockSetSelectedPeriod}
        transactions={mockTransactions}
      />
    );

    // Las transacciones de hoy y ayer deberían ser incluidas
    const totalElement = screen.getByTestId('total-amount');
    expect(totalElement).toHaveTextContent('+ $ 300,00');
  });

  it('calcula correctamente el total para el período mensual', () => {
    const mockSetSelectedPeriod = vi.fn();
    render(
      <TotalSelectorDay 
        selectedPeriod="monthly"
        setSelectedPeriod={mockSetSelectedPeriod}
        transactions={mockTransactions}
      />
    );

    // Todas las transacciones deberían ser incluidas
    const totalElement = screen.getByTestId('total-amount');
    expect(totalElement).toHaveTextContent('+ $ 600,00');
  });

  it('muestra el indicador visual correcto para el período seleccionado', () => {
    const mockSetSelectedPeriod = vi.fn();
    render(
      <TotalSelectorDay 
        selectedPeriod="weekly"
        setSelectedPeriod={mockSetSelectedPeriod}
        transactions={mockTransactions}
      />
    );

    // Verificar que el botón semanal tiene el indicador visual
    const weeklyButton = screen.getByText('Semanal');
    const indicator = weeklyButton.querySelector('span');
    expect(indicator).toHaveClass('bg-primary', 'rounded-full');
  });
}); 