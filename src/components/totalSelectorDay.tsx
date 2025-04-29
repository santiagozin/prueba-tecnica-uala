import { useMemo } from "react";
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfDay,
  endOfWeek,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { Transaction } from "@/types/transaction";

interface SelectorDayProps {
  selectedPeriod: "daily" | "weekly" | "monthly";
  setSelectedPeriod: (period: "daily" | "weekly" | "monthly") => void;
  transactions: Transaction[];
}

const TotalSelectorDay = ({
  selectedPeriod,
  setSelectedPeriod,
  transactions,
}: SelectorDayProps) => {
  const totalAmount = useMemo(() => {
    const now = new Date();

    const periodTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);

      if (selectedPeriod === "daily") {
        return isWithinInterval(transactionDate, {
          start: startOfDay(now),
          end: endOfDay(now),
        });
      } else if (selectedPeriod === "weekly") {
        return isWithinInterval(transactionDate, {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 }),
        });
      } else if (selectedPeriod === "monthly") {
        return isWithinInterval(transactionDate, {
          start: startOfMonth(now),
          end: endOfMonth(now),
        });
      }

      return true;
    });

    return periodTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  }, [transactions, selectedPeriod]);

  return (
    <>
      <div className="flex w-full justify-between mt-8 px-1">
        <button
          onClick={() => setSelectedPeriod("daily")}
          className={`hover:cursor-pointer text-md font-light relative pb-2 text-gray-700 ${
            selectedPeriod === "daily" &&
            "font-medium scale-105 -translate-y-2 transition-all duration-300"
          }`}
        >
          Diario
          {selectedPeriod === "daily" && (
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => setSelectedPeriod("weekly")}
          className={`hover:cursor-pointer text-md font-light relative pb-2 text-gray-700 ${
            selectedPeriod === "weekly" &&
            "font-medium scale-105 -translate-y-2 transition-all duration-300"
          }`}
        >
          Semanal
          {selectedPeriod === "weekly" && (
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => setSelectedPeriod("monthly")}
          className={`hover:cursor-pointer text-md font-light relative pb-2 text-gray-700 ${
            selectedPeriod === "monthly" &&
            "font-medium scale-105 -translate-y-2 transition-all duration-300"
          }`}
        >
          Mensual
          {selectedPeriod === "monthly" && (
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>
      </div>
      <p
        className="text-4xl font-extralight text-gray-700 text-center mt-8"
        data-testid="total-amount"
      >
        + $ {Math.floor(totalAmount)}
        <span className="text-3xl">
          ,{String(totalAmount.toFixed(2)).split(".")[1]}
        </span>
      </p>
    </>
  );
};

export default TotalSelectorDay;
