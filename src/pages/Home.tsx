import { ChartPie } from "lucide-react";
import notResults from "@/assets/icons/small-empty-busqueda.svg";
import TotalSelectorDay from "@/components/totalSelectorDay";
import Transaction from "@/components/transaction";
import { Filters } from "@/components/filters";
import { useTransactionContext } from "@/hooks/useTransactionContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { DownloadDialog } from "@/components/DownloadDialog";
import { Link } from "react-router-dom";

function Home() {
  const { filteredTransactions, isLoading, error } = useTransactionContext();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredTransactions]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-red-500">
          Error al cargar las transacciones: {error.message}
        </p>
      </div>
    );
  }

  return (
    <main className="md:mt-14">
      <section className="flex flex-col items-center justify-center">
        <div className="flex-col w-full max-w-sm md:max-w-md mx-auto">
          <h2 className="text-2xl font-medium text-gray-700 text-left">
            Tus cobros
          </h2>
          {isLoading ? (
            <Skeleton className="h-12 w-48 mt-8 mx-auto" />
          ) : (
            <TotalSelectorDay
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              transactions={filteredTransactions}
            />
          )}
        </div>

        <Link to="/metrics" className="text-md text-primary font-light mt-8 flex items-center justify-center gap-2 hover:text-gray-500">
          <ChartPie className="w-6 h-6" /> Ver métricas
        </Link>
      </section>

      <section className="mt-20">
        <div className="flex items-center gap-2 justify-between w-full max-w-96 md:max-w-xl mx-auto">
          <p className="text-md text-gray-900 font-medium">
            Historial de transacciones
          </p>
          <div className="flex items-center gap-6">
            <Filters />
            <DownloadDialog />
          </div>
        </div>
        {isLoading ? (
          <div className="max-w-96 md:max-w-xl mx-auto mt-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-20 h-18 rounded-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : sortedTransactions.length === 0 ? (
          <div className="flex items-center justify-center mt-10 flex-col gap-4">
            <img src={notResults} alt="No hay resultados" />
            <p className="text-center text-neutral max-w-96">
              No hay resultados que mostrar. Podés probar usando los filtros
              disponibles.
            </p>
          </div>
        ) : (
          <div className="max-w-96 md:max-w-xl mx-auto mt-6">
            {sortedTransactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
