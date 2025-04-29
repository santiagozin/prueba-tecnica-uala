import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Transaction from '@/components/transaction';

describe('Transaction', () => {
  const mockTransaction = {
    id: '1',
    createdAt: '2023-05-15T10:30:00Z',
    amount: 1500.75,
    card: 'Visa',
    installments: 1,
    paymentMethod: 'credit',
    date: '2023-05-15T10:30:00Z',
    status: 'completed',
    type: 'payment',
    description: 'Test transaction',
    updatedAt: '2023-05-15T10:30:00Z'
  };

  it('renderiza correctamente la transacción', () => {
    render(<Transaction transaction={mockTransaction} />);
    
    // Verificar que se muestra el metodo de pago
    expect(screen.getByText('credit')).toBeInTheDocument();
    
    // Verificar que se muestra Venta
    expect(screen.getByText('Venta')).toBeInTheDocument();
    
    // Verificar que se muestra el monto formateado
    const amountContainer = screen.getByTestId('transaction-amount');
    expect(amountContainer).toHaveTextContent('+ $');
    expect(amountContainer).toHaveTextContent('1,500.75');
    
    // Verificar que se muestra la fecha formateada
    expect(screen.getByText('15/05/2023')).toBeInTheDocument();
    
    // Verificar que se muestra la imagen de la tienda
    const storeImage = screen.getByAltText('Store');
    expect(storeImage).toBeInTheDocument();

  });

  it('renderiza correctamente con diferentes valores', () => {
    const differentTransaction = {
      id: '2',
      createdAt: '2023-06-20T15:45:00Z',
      amount: 2750.50,
      card: 'Mastercard',
      installments: 3,
      paymentMethod: 'debit',
      date: '2023-06-20T15:45:00Z',
      status: 'completed',
      type: 'payment',
      description: 'Different transaction',
      updatedAt: '2023-06-20T15:45:00Z'
    };
    
    render(<Transaction transaction={differentTransaction} />);
    
    // Verificar que se muestra el método de pago
    expect(screen.getByText('debit')).toBeInTheDocument();
    
    // Verificar que se muestra el monto formateado
    const amountContainer = screen.getByTestId('transaction-amount');
    expect(amountContainer).toHaveTextContent('+ $');
    expect(amountContainer).toHaveTextContent('2,750.5');
    
    // Verificar que se muestra la fecha formateada
    expect(screen.getByText('20/06/2023')).toBeInTheDocument();
  });
}); 