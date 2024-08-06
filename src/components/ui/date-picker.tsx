import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "./calendar";

interface DatePickerProps {
  date: Date | undefined;
  dateFormat?: string;
  disabled?: boolean;
  onDateChange: (newDate: Date | undefined) => void;
}
const DatePicker = ({
  date,
  onDateChange,
  dateFormat = "PPP",
  disabled = false,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal hover:bg-none",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, dateFormat) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          disabled={disabled}
          onSelect={(date) => onDateChange(date)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
