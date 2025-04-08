
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ date, setDate }) => {
  const [selectedTime, setSelectedTime] = useState<string>(
    date ? format(date, "HH:mm") : "12:00"
  );

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    if (date) {
      const [hours, minutes] = e.target.value.split(":");
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setDate(newDate);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(":");
      selectedDate.setHours(parseInt(hours, 10));
      selectedDate.setMinutes(parseInt(minutes, 10));
    }
    setDate(selectedDate);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full md:w-auto justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <div className="flex items-center w-full md:w-auto">
        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
        <Input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
