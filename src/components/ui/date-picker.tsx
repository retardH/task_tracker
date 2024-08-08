import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import { useRef } from "react";

interface DatePickerProps {
  date: Date | undefined;
  dateFormat?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onDateChange: (newDate: Date | undefined) => void;
}
const DatePicker = ({
  date,
  onDateChange,
  dateFormat = "PPP",
  className,
  placeholder,
  disabled = false,
}: DatePickerProps) => {
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);
  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal hover:bg-none",
            className,
          )}
        >
          {date ? (
            format(date, dateFormat)
          ) : (
            <span className="text-muted-foreground">
              {placeholder || "Pick a date"}
            </span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          disabled={disabled}
          onSelect={(date) => {
            onDateChange(date);
            popoverTriggerRef.current?.click();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
