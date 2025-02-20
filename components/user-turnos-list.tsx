'use client'

import { CalendarCheck, Trash } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Button } from './ui/button'
import { supabase } from '@/lib/connections/supabase'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { DrawerShiftUpdate } from './drawer-shift-update'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const UserTurnosList = ({ turnos = [] }: { turnos: any }) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const deleteTurno = async (id: string) => {
    const { error } = await supabase.from('turnos').delete().eq('id', id)
    if (!error) {
      router.refresh()
    }
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
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash className="mr-2" color="#ffffff" />
                          Eliminar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="">
                        <DialogHeader>
                          <DialogTitle>
                            Realmente quieres eliminar el turno?
                          </DialogTitle>
                          <DialogDescription>
                            Recuerda que puedes elegir el turno que mejor te
                            convenga
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          variant="destructive"
                          onClick={() => deleteTurno(id)}
                        >
                          <Trash className="mr-2" color="#ffffff" />
                          Eliminar
                        </Button>
                      </DialogContent>
                    </Dialog>
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
