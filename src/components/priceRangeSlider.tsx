import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

export default function PriceRangeSlider({
  value,
  onChange,
  min,
  max,
}: PriceRangeSliderProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="text-center mb-6">
        <span className="text-xl font-normal text-primary">
          ${value[0]} - ${value[1]}
        </span>
      </div>

      <div className="relative mb-4">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-2"
          value={value}
          min={min}
          max={max}
          step={10}
          onValueChange={(newValue) => onChange(newValue as [number, number])}
        >
          <Slider.Track className="bg-gray-100 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-primary rounded-full h-1" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            aria-label="Precio mínimo"
          />
          <Slider.Thumb
            className="block w-5 h-5 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            aria-label="Precio máximo"
          />
        </Slider.Root>
      </div>

      <div className="flex justify-between">
        <div
          className={cn(
            "border-2 border-primary rounded-md w-full pl-4 leading-2 max-w-40 py-1"
          )}
        >
          <div className="text-gray-500 font-light text-sm">Monto mínimo</div>
          <div className="text-lg font-normal">${value[0]}</div>
        </div>

        <div
          className={cn(
            "border-2 border-primary rounded-md w-full pl-4 leading-2 max-w-40 py-1"
          )}
        >
          <div className="text-gray-500 font-light text-sm">Monto máximo</div>
          <div className="text-lg font-normal">${value[1]}</div>
        </div>
      </div>
    </div>
  );
}
