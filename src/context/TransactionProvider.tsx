import { ReactNode, useState, useMemo } from 'react';
import { useTransactions } from '@/services/transactions';
import { TransactionContext, TransactionContextType } from './TransactionContext';

export function TransactionProvider({ children }: { children: ReactNode }) {
  const { data: transactions = [], isLoading, error } = useTransactions();
  const [filters, setFilters] = useState<TransactionContextType['filters']>({
    dateEnabled: false,
    date: undefined,
    cardEnabled: false,
    selectedCards: [],
    creditEnabled: false,
    selectedCredits: [],
    methodEnabled: false,
    selectedMethods: [],
    amountEnabled: false,
    amountRange: [0, 1000],
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (filters.dateEnabled && filters.date?.from && filters.date?.to) {
        const transactionDate = new Date(transaction.createdAt);
        if (transactionDate < filters.date.from || transactionDate > filters.date.to) {
          return false;
        }
      }

      if (filters.cardEnabled && filters.selectedCards.length > 0) {
        if (!filters.selectedCards.includes(transaction.card.toLowerCase())) {
          return false;
        }
      }

      if (filters.creditEnabled && filters.selectedCredits.length > 0) {
        if (!filters.selectedCredits.includes(transaction.installments.toString())) {
          return false;
        }
      }

      if (filters.methodEnabled && filters.selectedMethods.length > 0) {
        if (!filters.selectedMethods.includes(transaction.paymentMethod.toLowerCase())) {
          return false;
        }
      }

      if (filters.amountEnabled) {
        if (transaction.amount < filters.amountRange[0] || transaction.amount > filters.amountRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  const updateFilters = (newFilters: Partial<TransactionContextType['filters']>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        error: error as Error | null,
        filteredTransactions,
        filters,
        setFilters: updateFilters,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
} 