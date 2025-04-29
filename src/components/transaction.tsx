import { formatDate } from "@/utils/date";
import store from "@/assets/categories/category-store.svg";
import type { Transaction } from "@/types/transaction";

interface TransactionProps {
  transaction: Transaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  const formattedDate = formatDate(transaction.createdAt);

  return (
    <div className="flex items-center justify-between py-4 border-b w-full">
      <div className="flex">
        <img src={store} alt="Store" className="w-10 h-10" />

        <div className="flex flex-col ml-2 leading-5">
          <span className="font-medium capitalize">
            {transaction.paymentMethod}
          </span>
          <span className="text-md text-gray-500 font-light">Venta</span>
        </div>
      </div>
      <div className="flex flex-col items-end leading-5">
        <span
          className="font-medium text-lg text-[#1C8367]"
          data-testid="transaction-amount"
        >
          + ${transaction.amount.toLocaleString()}
        </span>
        <span className="text-md text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
}
