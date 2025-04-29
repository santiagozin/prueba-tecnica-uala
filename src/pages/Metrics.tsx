import { useTransactionContext } from "@/hooks/useTransactionContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useMemo, useState } from "react";
import {
  format,
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfDay,
  endOfWeek,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { es } from "date-fns/locale";
import { CreditCard, CircleDollarSign, ChartNoAxesCombined } from "lucide-react";
const Metrics = () => {
  const { filteredTransactions } = useTransactionContext();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");

  const paymentMethodData = useMemo(() => {
    const data = filteredTransactions.reduce((acc, transaction) => {
      const method = transaction.paymentMethod;
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filteredTransactions]);

  const timeSeriesData = useMemo(() => {
    const data = filteredTransactions.reduce((acc, transaction) => {
      const date = format(new Date(transaction.createdAt), "dd/MM", {
        locale: es,
      });
      acc[date] = (acc[date] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(data)
      .map(([date, amount]) => ({
        date,
        amount,
      }))
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split("/").map(Number);
        const [dayB, monthB] = b.date.split("/").map(Number);
        return (
          new Date(2024, monthA - 1, dayA).getTime() -
          new Date(2024, monthB - 1, dayB).getTime()
        );
      });
  }, [filteredTransactions]);

  const totalByPeriod = useMemo(() => {
    const now = new Date();
    const periodTransactions = filteredTransactions.filter((transaction) => {
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
  }, [filteredTransactions, selectedPeriod]);

  return (
    <div className="p-6 space-y-8 px-20 mt-10">
      <h2 className="text-2xl font-medium text-gray-700 text-left">Dashboard de Métricas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow h-full">
          <h2 className="text-lg font-normal mt-2 flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6" />
            Total de transacciones
          </h2>
          <div className="flex flex-col items-center h-full justify-evenly">
            <div className="flex gap-4 items-center justify-center">
              <button
                className={`px-4 py-2 rounded cursor-pointer ${
                  selectedPeriod === "daily"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedPeriod("daily")}
              >
                Día
              </button>
              <button
                className={`px-4 py-2 rounded cursor-pointer ${
                  selectedPeriod === "weekly"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedPeriod("weekly")}
              >
                Semana
              </button>
              <button
                className={`px-4 py-2 rounded cursor-pointer ${
                  selectedPeriod === "monthly"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedPeriod("monthly")}
              >
                Mes
              </button>
            </div>
            <div className="text-5xl font-bold text-primary">
              ${totalByPeriod.toLocaleString()}
            </div>
            <div className="text-gray-500">
              Total del{" "}
              {selectedPeriod === "daily"
                ? "día"
                : selectedPeriod === "weekly"
                ? "semana"
                : "mes"}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 my-4">
            <CreditCard className="w-6 h-6" />
            <h2 className="text-lg font-normal">
              Transacciones por Método de Pago
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#606882" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 className="text-lg font-normal mt-2 flex items-center gap-2 ml-4 my-4">
            <ChartNoAxesCombined className="w-6 h-6" />
            Evolución Temporal de Transacciones
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#022a9a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
