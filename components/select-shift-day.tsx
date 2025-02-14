'use client'
import React, { useState } from 'react'
import { DatePicker } from './date-picker'
import { Button } from './ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from './ui/textarea'
import { formatDate } from '@/utils/formatDate'

type TimeFormat = `${string}:${string}:${string}`

export const SelectShiftDay = ({
  closeDrawer
}: {
  closeDrawer: () => void
}) => {
  const [date, setDate] = useState<Date | undefined>()
  const [hour, setHour] = useState<TimeFormat | undefined>()
  const [contentAdd, setContentAdd] = useState('')
  const { toast } = useToast()

  const handlehour = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value
    setHour(value as TimeFormat)
  }

  const handleSubmit = async () => {
    if (!date || !hour) return

    const onlyDate = date?.toLocaleDateString('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires'
    })

    const appointment_date = formatDate(date, hour)

    try {
      const res = await fetch('/api/turno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: contentAdd,
          date: onlyDate,
          hour: hour,
          appointment_date: appointment_date
        })
      })

      if (!res.ok) {
        throw new Error(
          res?.statusText || 'something went wrong trying to do the fetch'
        )
      }

      toast({
        title: 'Turno agendado',
        description: `Información: ${onlyDate}, a las ${hour}`
      })
      const resToJson = await res.json()
    } catch (error) {
      toast({
        title: 'Oops! Ocurrió un error',
        description:
          'El turno no pudo ser reservado, volvé a intentar más tarde'
      })
    } finally {
      closeDrawer()
    }
  }

  const handleReset = () => {
    setHour(undefined)
    setDate(undefined)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm mb-2 text-muted-foreground">Fecha:</h3>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div>
        <h3 className="text-sm mb-2 text-muted-foreground">
          Horarios disponibles:
        </h3>
        <ul className="flex flex-wrap gap-2">
          {[
            '09:00',
            '09:30',
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
                variant={eachHour + ':00' === hour ? 'default' : 'outline'}
                value={eachHour + ':00'}
                onClick={handlehour}
                disabled={!Boolean(date)}
              >
                {eachHour}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Textarea
        placeholder="¿Quieres añadir información adicional?"
        value={contentAdd}
        onChange={(e) => setContentAdd(e.target.value)}
      />
      <div className="h-[40px] w-full md:w-[280px] flex gap-4">
        <Button
          variant="secondary"
          className="w-full border border-bgColor bg-greenLigth"
          onClick={handleSubmit}
          disabled={!Boolean(hour)}
        >
          Confirmar
        </Button>
        <Button
          variant="outline"
          className="w-full border border-red-400 text-red-400"
          onClick={handleReset}
          disabled={!Boolean(hour)}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
