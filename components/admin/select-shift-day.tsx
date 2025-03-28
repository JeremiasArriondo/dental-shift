'use client'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

import { SCHEDULE } from '@/config/site'
import { formatDate } from '@/utils/formatDate'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { DatePicker } from '../date-picker'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

type TimeFormat = `${string}:${string}:${string}`

export const SelectShiftDayAdmin = ({
  action = 'create'
}: {
  action: string
}) => {
  const [date, setDate] = useState<Date | undefined>()
  const [hour, setHour] = useState<TimeFormat | undefined>()

  const availableHours = date ? SCHEDULE[new Date(date).getDay()] || [] : []

  const [description, setDescription] = useState('')
  const supabase = createClientComponentClient()
  const [users, setUsers] = useState<any[]>([])
  const [userSelected, setUserSelected] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const router = useRouter()

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
      setIsLoading(true)
      const res = await fetch('/api/turno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userSelected,
          description,
          date: onlyDate,
          hour,
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
      setIsLoading(true)
      router.refresh()
    } catch (error) {
      toast({
        title: 'Oops! Ocurrió un error',
        description:
          'El turno no pudo ser reservado, volvé a intentar más tarde'
      })
    }
  }

  const editTurno = async ({ id }: { id?: string }) => {
    try {
      const res = await fetch('/api/turno', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          date,
          hour,
          description
        })
      })

      if (!res.ok) throw new Error(res?.statusText)

      const onlyDate = date?.toLocaleDateString('en-CA', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
      toast({
        title: 'Turno actualizado',
        description: `${onlyDate}, a las ${hour}`
      })
      router.refresh()
    } catch (error) {
      toast({
        title: 'Oops! Ocurrió un error',
        description:
          'El turno no pude ser modificado, volvé a intentar más tarde'
      })
    }
  }

  useEffect(() => {
    const fetchTurnos = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.from('users').select('*')

        if (error) throw error
        setUsers(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTurnos()
  }, [])

  const handleReset = () => {
    setHour(undefined)
    setDate(undefined)
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h3 className="text-sm mb-2 text-muted-foreground">
          Crea un nuevo turno:
        </h3>
        <DatePicker date={date} setDate={setDate} size={9} />
      </div>
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un paciente" />
          </SelectTrigger>
          <SelectContent>
            {users &&
              users.length > 0 &&
              users.map((user) => {
                return (
                  <SelectItem value={user.id} key={user.id}>
                    {user.name}
                  </SelectItem>
                )
              })}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3 className="text-sm mb-2 text-muted-foreground">
          Horarios disponibles:
        </h3>
        <ul className="flex gap-2 overflow-x-scroll">
          {availableHours.map((eachHour) => (
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
