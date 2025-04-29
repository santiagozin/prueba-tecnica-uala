import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Download, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useTransactionContext } from "@/hooks/useTransactionContext";
import { formatDate } from "@/utils/date";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner"

export function DownloadDialog() {
  const [date, setDate] = useState<DateRange | undefined>();
  const { filteredTransactions } = useTransactionContext();


  const handleDownload = () => {
    if (!date?.from || !date?.to) return;

    const filteredData = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= date.from! && transactionDate <= date.to!;
    });

    if (filteredData.length === 0) {
      toast("No hay movimientos en las fechas seleccionadas para descargar", {
        className: "bg-blue-500 text-white border-blue-600",
      });
      return;
    }

    const csvContent = [
      ["Fecha", "Monto", "Tarjeta", "Cuotas", "Método de pago"],
      ...filteredData.map((transaction) => [
        formatDate(transaction.createdAt),
        transaction.amount.toString(),
        transaction.card,
        transaction.installments.toString(),
        transaction.paymentMethod,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `transacciones_${format(date.from, "dd-MM-yyyy")}_${format(
        date.to,
        "dd-MM-yyyy"
      )}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Download data-testid="download-icon" className="h-6 w-6 text-primary cursor-pointer hover:text-gray-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-6">
        <div className="flex items-center gap-2 mb-2 ml-4">
          <CalendarDays className="w-7 h-7 text-gray-500" />
          <p className="font-medium text-lg ml-4">
            Elegí las fechas que <span className="block">querés descargar</span>
          </p>
        </div>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
          className="rounded-md mx-auto"
        />
        <div className="flex justify-center mt-6 gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 rounded-full mx-2">
              Cerrar
            </Button>
          </DialogClose>
          <Button
            onClick={handleDownload}
            disabled={!date?.from || !date?.to}
            className=" rounded-full px-6 mx-2"
          >
            Descargar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
