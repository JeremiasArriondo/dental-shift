'use client'

import { CalendarCheck, CalendarPlus, Pencil, Trash } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Button } from './ui/button'
import { supabase } from '@/lib/connections/supabase'
import { toast } from './ui/use-toast'

import { DrawerShiftUpdate } from './drawer-shift-update'

export const UserTurnosList = ({ turnos = [] }: { turnos: any }) => {
  const deleteTurno = async (id: string) => {
    const res = await supabase.from('turnos').delete().eq('id', id)
    console.log(res)
  }

  return (
    <div>
      <h3 className="text-lg text-muted-foreground mb-2">
        Historial de turnos:
      </h3>
      {turnos && turnos.length > 0 ? (
        <ol className="relative ml-4 border-s border-gray-200">
          {turnos.map(({ id, date, hour, description }) => (
            <li className="mb-10 ms-8" key={id}>
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                <CalendarCheck />
              </span>
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Fecha: {date}</CardTitle>
                  <CardDescription>
                    Descripción: {description ? description : 'Sin descripción'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-600">
                    Horario: {hour}hs
                  </time>
                  <div className="flex gap-2">
                    <DrawerShiftUpdate id={id} />
                    <Button
                      variant="destructive"
                      onClick={() => deleteTurno(id)}
                    >
                      <Trash className="mr-2" color="#ffffff" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      ) : (
        <div>
          <p>Acá apareceran tus turnos cuando agendes uno</p>
        </div>
      )}
    </div>
  )
}
