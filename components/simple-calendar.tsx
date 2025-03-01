'use client'
import { es } from 'date-fns/locale'
import React from 'react'
import { Calendar } from './ui/calendar'

type SimpleCalendarType = {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  size?: number
}

export const SimpleCalendar = ({ date, setDate, size }: SimpleCalendarType) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={es}
      size={size}
      initialFocus
    />
  )
}
