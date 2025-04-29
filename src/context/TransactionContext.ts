import { createContext } from 'react';
import { DateRange } from 'react-day-picker';
import { Transaction } from '@/types/transaction';

export interface TransactionContextType {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  filteredTransactions: Transaction[];
  filters: {
    dateEnabled: boolean;
    date: DateRange | undefined;
    cardEnabled: boolean;
    selectedCards: string[];
    creditEnabled: boolean;
    selectedCredits: string[];
    methodEnabled: boolean;
    selectedMethods: string[];
    amountEnabled: boolean;
    amountRange: [number, number];
  };
  setFilters: (filters: Partial<TransactionContextType['filters']>) => void;
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined); 