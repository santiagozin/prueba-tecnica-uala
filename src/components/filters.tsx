import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  CreditCard,
  DollarSign,
  FolderClosed,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CardsFilter from "./selectFilter";
import PriceRangeSlider from "./priceRangeSlider";
import { useTransactionContext } from "@/hooks/useTransactionContext";
import { itemsCard, itemsCredit, itemsMethod } from "@/constants/filters";
import { useState, useEffect } from "react";

export function Filters() {
  const { filters, setFilters, transactions } = useTransactionContext();

  const [tempFilters, setTempFilters] = useState<typeof filters>(filters);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const minAmount = Math.min(...transactions.map(t => t.amount));
  const maxAmount = Math.max(...transactions.map(t => t.amount));

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);


  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
    }
  }, [isOpen, filters]);

  const handleCardSelect = (cardId: string) => {
    setTempFilters({
      ...tempFilters,
      selectedCards: tempFilters.selectedCards.includes(cardId)
        ? tempFilters.selectedCards.filter((id) => id !== cardId)
        : [...tempFilters.selectedCards, cardId],
    });
  };

  const handleCreditSelect = (creditId: string) => {
    setTempFilters({
      ...tempFilters,
      selectedCredits: tempFilters.selectedCredits.includes(creditId)
        ? tempFilters.selectedCredits.filter((id) => id !== creditId)
        : [...tempFilters.selectedCredits, creditId],
    });
  };

  const handleMethodSelect = (methodId: string) => {
    setTempFilters({
      ...tempFilters,
      selectedMethods: tempFilters.selectedMethods.includes(methodId)
        ? tempFilters.selectedMethods.filter((id) => id !== methodId)
        : [...tempFilters.selectedMethods, methodId],
    });
  };

  const handleAmountRangeChange = (range: [number, number]) => {
    setTempFilters({ ...tempFilters, amountRange: range });
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      dateEnabled: false,
      date: undefined,
      cardEnabled: false,
      selectedCards: [] as string[],
      creditEnabled: false,
      selectedCredits: [] as string[],
      methodEnabled: false,
      selectedMethods: [] as string[],
      amountEnabled: false,
      amountRange: [0, 1000] as [number, number],
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <Drawer 
      direction="right" 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      modal
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <SlidersHorizontal className="w-6 h-6 text-primary hover:cursor-pointer hover:text-gray-500" />
      </DrawerTrigger>
      <DrawerContent className="max-h-[100vh] overflow-y-auto">

        <div className="flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle>
              <DrawerClose asChild>
                <Button onClick={() => setIsOpen(false)} variant="ghost" className="flex items-center hover:cursor-pointer px-8 mt-8 hover:text-gray-500">
                  <ChevronLeft className="h-8 w-8" />
                  <p className="text-lg text-gray-700 font-normal ml-6 hover:text-gray-500">
                    Filtros
                  </p>
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription>
                <>
              <div className="flex justify-between items-center px-10 mt-12">
                <p className="text-md text-gray-700 font-semibold">
                  Todos los filtros
                </p>
                <Button
                  variant="outline"
                  className="text-primary text-md"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Limpiar
                </Button>
              </div>
              </>
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 flex flex-col space-y-4 px-14">
              <div className="flex flex-col mb-10">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex">
                    <CalendarDays className="text-input mr-3" />
                    <Label className="text-md" htmlFor="date">
                      Fecha
                    </Label>
                  </div>
                  <Switch
                    id="date"
                    checked={tempFilters.dateEnabled}
                    onCheckedChange={(checked) =>
                      setTempFilters({ ...tempFilters, dateEnabled: checked })
                    }
                  />
                </div>
                {tempFilters.dateEnabled && (
                  <div className="flex flex-col space-y-2 justify-center items-center mt-2">
                    <Calendar
                      mode="range"
                      selected={tempFilters.date}
                      onSelect={(date) => setTempFilters({ ...tempFilters, date })}
                      locale={es}
                      className="rounded-md border shadow-sm"
                    />
                    {tempFilters.date?.from && (
                      <div className="text-sm text-gray-500">
                        {tempFilters.date.to ? (
                          <>
                            {format(tempFilters.date.from, "dd/MM/yyyy", {
                              locale: es,
                            })}{" "}
                            -{" "}
                            {format(tempFilters.date.to, "dd/MM/yyyy", {
                              locale: es,
                            })}
                          </>
                        ) : (
                          format(tempFilters.date.from, "dd/MM/yyyy", {
                            locale: es,
                          })
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col mb-10">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex">
                    <CreditCard className="text-input mr-3" />
                    <Label className="text-md" htmlFor="card">
                      Tarjeta
                    </Label>
                  </div>
                  <Switch
                    id="card"
                    checked={tempFilters.cardEnabled}
                    onCheckedChange={(checked) =>
                      setTempFilters({ ...tempFilters, cardEnabled: checked })
                    }
                  />
                </div>
                {tempFilters.cardEnabled && (
                  <CardsFilter
                    items={itemsCard}
                    selectedItems={tempFilters.selectedCards}
                    onItemSelect={handleCardSelect}
                  />
                )}
              </div>
              <div className="flex flex-col mb-10 ">
                <div className="w-full flex justify-between ">
                  <div className="flex">
                    <CalendarClock className="text-input mr-3" />
                    <Label className="text-md" htmlFor="credit">
                      Cuotas
                    </Label>
                  </div>
                  <Switch
                    id="credit"
                    checked={tempFilters.creditEnabled}
                    onCheckedChange={(checked) =>
                      setTempFilters({ ...tempFilters, creditEnabled: checked })
                    }
                  />
                </div>
                {tempFilters.creditEnabled && (
                  <CardsFilter
                    items={itemsCredit}
                    selectedItems={tempFilters.selectedCredits}
                    onItemSelect={handleCreditSelect}
                  />
                )}
              </div>

              <div className="flex flex-col mb-10 ">
                <div className="flex items-center justify-between w-full">
                  <div className="flex">
                    <DollarSign className="text-input mr-3" />
                    <Label className="text-md" htmlFor="amount">
                      Monto
                    </Label>
                  </div>
                  <Switch
                    id="amount"
                    checked={tempFilters.amountEnabled}
                    onCheckedChange={(checked) =>
                      setTempFilters({ ...tempFilters, amountEnabled: checked })
                    }
                  />
                </div>
                {tempFilters.amountEnabled && (
                  <PriceRangeSlider
                    value={tempFilters.amountRange}
                    onChange={handleAmountRangeChange}
                    min={minAmount}
                    max={maxAmount}
                  />
                )}
              </div>
              <div className="flex flex-col mb-10 ">
                <div className="w-full flex justify-between items-center">
                  <div className="flex">
                    <FolderClosed className="text-input mr-3" />
                    <Label className="text-md" htmlFor="method">
                      Métodos de cobro
                    </Label>
                  </div>
                  <Switch
                    id="method"
                    checked={tempFilters.methodEnabled}
                    onCheckedChange={(checked) =>
                      setTempFilters({ ...tempFilters, methodEnabled: checked })
                    }
                  />
                </div>
                {tempFilters.methodEnabled && (
                  <CardsFilter
                    items={itemsMethod}
                    selectedItems={tempFilters.selectedMethods}
                    onItemSelect={handleMethodSelect}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-end px-14">
              <Button onClick={handleApplyFilters} className="w-full rounded-full py-6 cursor-pointer" disabled={tempFilters === filters}>
                Aplicar filtros
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
