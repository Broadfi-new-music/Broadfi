import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  // Generate hours and minutes for the time dropdown
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const handleTimeChange = (timeString: string) => {
    if (!date) return;
    
    const [hourStr, minuteStr] = timeString.split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    const newDate = new Date(date);
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    
    setDate(newDate);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left w-full",
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
            onSelect={(selectedDate) => {
              // Preserve the current time when selecting a new date
              if (selectedDate && date) {
                selectedDate.setHours(date.getHours());
                selectedDate.setMinutes(date.getMinutes());
              }
              setDate(selectedDate);
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      <Select 
        onValueChange={handleTimeChange}
        value={date ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}` : undefined}
      >
        <SelectTrigger className={cn("w-full", !date && "text-muted-foreground")}>
          <SelectValue placeholder="Select time">
            {date ? (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {format(date, "h:mm a")}
              </div>
            ) : (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Pick a time
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hours.flatMap(hour => 
            minutes.map(minute => {
              const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              const displayTime = format(
                new Date().setHours(hour, minute),
                "h:mm a"
              );
              return (
                <SelectItem key={timeValue} value={timeValue}>
                  {displayTime}
                </SelectItem>
              );
            })
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
