'use client'
import React, { useState } from 'react'
import { DatePicker } from './date-picker'
import { Button } from './ui/button'

type TimeFormat = `${string}:${string}`

export const SelectShiftDay = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [hour, setHour] = useState<TimeFormat | undefined>()

  const handlehour = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value
    setHour(value as TimeFormat)
  }

  const handleSubmit = async () => {
    if (!date || !hour) return

    const formatDate = date?.toLocaleDateString(undefined, {
      timeZone: 'America/Argentina/Buenos_Aires'
    })

    try {
      const res = await fetch('/api/turno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: 'Una descripción',
          date: formatDate,
          hour: hour
        })
      })

      if (!res.ok) {
        throw new Error(
          res?.statusText || 'something went wrong trying to do the fetch'
        )
      }

      const resToJson = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const handleReset = () => {
    setHour(undefined)
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
          ].map((eachHour) => (
            <li key={eachHour}>
              <Button
                className="w-20"
                variant={eachHour === hour ? 'default' : 'outline'}
                value={eachHour}
                onClick={handlehour}
                disabled={!Boolean(date)}
              >
                {eachHour}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[40px] w-full md:w-[280px] flex gap-4">
        {date && hour && (
          <Button
            variant="secondary"
            className="w-full border border-bgColor bg-greenLigth"
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        )}
        {date && hour && (
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
