import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: string | Date): string {
  return format(new Date(date), "dd/MM/yyyy", { locale: es });
} 