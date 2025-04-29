export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: string;
  type: string;
  description: string;
  card: string;
  installments: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface TransactionFilters {
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
} 