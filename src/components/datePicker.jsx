import { useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePicker({ date, setDate, startDate, disabled }) {
    //const [date, setDate] = useState()

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Popover open={dialogOpen} onOpenChange={setDialogOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal border-2 px-5 py-5 rounded-sm",
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
                    onSelect={(date) => { setDialogOpen(false); setDate(date); }}
                    initialFocus
                    disabled={(date) => 
                       date < startDate || date < new Date().setDate(new Date().getDate() - 1)
                    }
                />
            </PopoverContent>
        </Popover>
    )
}