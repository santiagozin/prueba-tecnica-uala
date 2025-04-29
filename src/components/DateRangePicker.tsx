import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
  date: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function DateRangePicker({
  date,
  onChange,
  enabled,
  onToggle,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        aria-label="Activar filtro de fecha"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            disabled={!enabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy', { locale: es })} -{' '}
                  {format(date.to, 'dd/MM/yyyy', { locale: es })}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy', { locale: es })
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 