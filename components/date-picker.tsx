'use client'

import { format, subDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DatePicker({
  date,
  setDate,
  size
}: {
  date?: Date
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  size?: number
}) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[286px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'dd/MM/yyyy')
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e)
            setIsCalendarOpen(false)
          }}
          disabled={(date) => {
            const isPastDate = date <= subDays(new Date(), 1)
            const isWeekend = [0, 6].includes(date.getDay())
            return isPastDate || isWeekend
          }}
          locale={es}
          initialFocus
          size={size}
        />
      </PopoverContent>
    </Popover>
  )
}
