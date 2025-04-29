import { useContext } from 'react';
import { TransactionContext } from '@/context/TransactionContext';

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactionContext debe ser usado dentro de un TransactionProvider');
  }
  return context;
} 