"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";

type DatePickerProps = {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  className?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
}: DatePickerProps) {
  const parsed = React.useMemo(() => {
    if (!value) return undefined;
    const asDate = new Date(value);
    return isNaN(asDate.getTime()) ? undefined : asDate;
  }, [value]);

  const [date, setDate] = React.useState<Date | undefined>(parsed);

  React.useEffect(() => {
    setDate(parsed);
  }, [parsed]);

  function handleSelect(newDate?: Date) {
    setDate(newDate);
    onChange?.(newDate ? newDate.toISOString() : undefined);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-full hover:bg-transparent justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", {
              locale: ptBR,
            })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
