'use client'
import React, { useState } from 'react'
import { DatePicker } from './date-picker'
import { Button } from './ui/button'
import { Icons } from './icons'

type TimeFormat = `${string}:${string}`

export const SelectShiftDay = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [datetime, setDatetime] = useState<TimeFormat | undefined>()

  const handleDatetime = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value
    setDatetime(value as TimeFormat)
  }

  const handleSubmit = () => {
    const formatDate = date?.toLocaleDateString(undefined, {
      timeZone: 'America/Argentina/Buenos_Aires'
    })

    console.log('FECHA: ', formatDate)
    console.log('HORA: ', datetime)
  }

  const handleReset = () => {
    setDatetime(undefined)
    setDate(undefined)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-muted-foreground">Fecha:</h3>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div>
        <h3 className="mb-2 text-muted-foreground">Horarios disponibles:</h3>
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
              <Button
                className="w-20"
                variant={hour === datetime ? 'default' : 'outline'}
                value={hour}
                onClick={handleDatetime}
              >
                {hour}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[40px] w-full md:w-[280px] flex gap-4">
        {date && datetime && (
          <Button
            variant="secondary"
            className="w-full border border-bgColor bg-greenLigth"
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        )}
        {date && datetime && (
          <Button
            variant="outline"
            className="w-full border border-red-400 text-red-400"
            onClick={handleReset}
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  )
}
