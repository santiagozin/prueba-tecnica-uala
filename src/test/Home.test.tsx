import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Home from '@/pages/Home';
import { TransactionContext } from '@/context/TransactionContext';
import { Transaction, TransactionFilters } from '@/types/transaction';

// Mock
const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1000,
    date: '2024-03-20T10:00:00Z',
    status: 'completed',
    type: 'payment',
    description: 'Test transaction',
    card: '1234',
    installments: 1,
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    paymentMethod: 'credit'
  }
];

const mockFilters: TransactionFilters = {
  dateEnabled: false,
  date: undefined,
  cardEnabled: false,
  selectedCards: [],
  creditEnabled: false,
  selectedCredits: [],
  methodEnabled: false,
  selectedMethods: [],
  amountEnabled: false,
  amountRange: [0, 1000000]
};

const mockContextValue = {
  transactions: mockTransactions,
  filteredTransactions: mockTransactions,
  isLoading: false,
  error: null,
  filters: mockFilters,
  setFilters: vi.fn(),
  clearFilters: vi.fn()
};

describe('Home Component', () => {
  it('renderiza el componente correctamente con datos', () => {
    render(
      <TransactionContext.Provider value={mockContextValue}>
        <Home />
      </TransactionContext.Provider>
    );

    // Verificar elementos principales
    expect(screen.getByText('Tus cobros')).toBeInTheDocument();
    expect(screen.getByText('Historial de transacciones')).toBeInTheDocument();
    expect(screen.getByText('Ver métricas')).toBeInTheDocument();
  });

  it('muestra el estado de carga', () => {
    const loadingContext = {
      ...mockContextValue,
      isLoading: true
    };

    render(
      <TransactionContext.Provider value={loadingContext}>
        <Home />
      </TransactionContext.Provider>
    );

    // Verificar que se muestran los skeletons
    const skeletons = document.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons).toHaveLength(7); // 1 para el total y 6 para las transacciones (3 transacciones x 2 skeletons cada una)
  });

  it('muestra el mensaje de error cuando hay un error', () => {
    const errorContext = {
      ...mockContextValue,
      error: new Error('Error de prueba')
    };

    render(
      <TransactionContext.Provider value={errorContext}>
        <Home />
      </TransactionContext.Provider>
    );

    expect(screen.getByText(/Error al cargar las transacciones/)).toBeInTheDocument();
  });

  it('muestra el mensaje de no resultados cuando no hay transacciones', () => {
    const emptyContext = {
      ...mockContextValue,
      filteredTransactions: []
    };

    render(
      <TransactionContext.Provider value={emptyContext}>
        <Home />
      </TransactionContext.Provider>
    );

    expect(screen.getByText(/No hay resultados que mostrar/)).toBeInTheDocument();
  });

  it('muestra los botones de período y el total', () => {
    render(
      <TransactionContext.Provider value={mockContextValue}>
        <Home />
      </TransactionContext.Provider>
    );

    // Verificar que existen los botones de período
    const periodButtons = screen.getAllByRole('button', { name: /semanal|mensual|diario/i });
    expect(periodButtons).toHaveLength(3);

    // Verificar que el total se muestra
    expect(screen.getByText(/1.000/)).toBeInTheDocument();
  });
}); 