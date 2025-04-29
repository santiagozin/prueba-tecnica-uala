
import { useQuery } from '@tanstack/react-query';
import type { Transaction } from '@/types/transaction';

const fetchTransactions = async (): Promise<Transaction[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}`);
  if (!response.ok) {
    throw new Error('Error al cargar las transacciones');
  }
  return response.json();
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
}; 