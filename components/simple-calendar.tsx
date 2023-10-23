'use client'
import React, { useState } from 'react'
import { Calendar } from './ui/calendar'
import { es } from 'date-fns/locale'

export const SimpleCalendar = () => {
  const [date, setDate] = useState<Date>()
  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={es}
        initialFocus
      />
    </>
  )
}
