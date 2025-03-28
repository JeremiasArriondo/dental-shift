'use client'

import { SelectShiftDayAdmin } from '@/components/admin/select-shift-day'
import { SimpleCalendar } from '@/components/simple-calendar'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { UserAvatar } from '@/components/user-avatar'
import { Turno } from '@/types/shift'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ShiftListFilter = () => {
  const supabase = createClientComponentClient()
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTurnos = async () => {
      setIsLoading(true)
      try {
        const dateParsed = selectedDate.toISOString().split('T')[0]
        const { data, error } = await supabase
          .from('turnos')
          .select('*, users(*)')
          .eq('date', dateParsed)

        if (error) throw error
        setTurnos(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTurnos()
  }, [selectedDate])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-4">
        <SimpleCalendar
          date={selectedDate}
          setDate={setSelectedDate}
          size={9}
        />
        <SelectShiftDayAdmin action="create" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Detalle</TableHead>
              <TableHead>Horario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {turnos.length > 0 ? (
              turnos.map((turno) => (
                <TableRow key={turno.id}>
                  <TableCell className="font-medium">
                    <UserAvatar
                      user={{
                        name: turno?.users?.name ?? '',
                        image: turno?.users?.avatar_url ?? ''
                      }}
                      className="h-8 w-8"
                    />
                  </TableCell>
                  <TableCell>{turno?.users?.name}</TableCell>
                  <TableCell>{turno?.users?.email}</TableCell>
                  <TableCell>{turno.description}</TableCell>
                  <TableCell>{turno.hour}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="flex align-center justify-center gap-4">
                    <Calendar />
                    <span>No hay turnos para este día</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
