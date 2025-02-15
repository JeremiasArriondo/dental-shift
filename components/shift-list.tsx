'use client'

import { UserAvatar } from './user-avatar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { SimpleCalendar } from './simple-calendar'
import { Turno } from '@/types/shift'

export const ShiftListFilter = () => {
  const supabase = createClientComponentClient()
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const fetchTurnos = async () => {
      if (!selectedDate) return
      const dateParsed = selectedDate.toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('turnos')
        .select('*, users(*)')
        .eq('date', dateParsed)

      if (error) console.error(error)
      else setTurnos(data)
    }

    fetchTurnos()
  }, [selectedDate])

  return (
    <div>
      <SimpleCalendar date={selectedDate} setDate={setSelectedDate} />
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {turnos && turnos.length > 0 ? (
          turnos.map((turno) => (
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <UserAvatar
                    user={{
                      name: turno?.users?.name ?? '',
                      image: turno?.users?.avatar_url ?? ''
                    }}
                    className="h-8 w-8"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {turno?.users?.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Detalle: {turno.description}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {turno.hour}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>
            <p>No hay turnos para día de hoy</p>
          </div>
        )}
      </ul>
    </div>
  )
}
