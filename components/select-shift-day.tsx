'use client'
import React from 'react'
import { DatePicker } from './date-picker'
import { Button } from './ui/button'

export const SelectShiftDay = () => {
  const [date, setDate] = React.useState<Date>()
  return (
    <div>
      <div className="my-4">
        <h3>Fecha:</h3>
        <DatePicker date={date || new Date()} setDate={setDate} />
      </div>
      <div>
        <h3>Horarios disponibles:</h3>
        <ul className="flex flex-wrap gap-2">
          {[
            '9:00',
            '9:30',
            '10:00',
            '10:30',
            '11:00',
            '12:00',
            '14:30',
            '15:00',
            '16:30'
          ].map((hour) => (
            <li key={hour}>
              <Button className="w-20" variant="secondary">
                {hour}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
