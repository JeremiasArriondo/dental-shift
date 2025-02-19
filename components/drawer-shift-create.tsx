'use client'
import { CalendarPlus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'
import { SelectShiftDay } from './select-shift-day'
import { useState } from 'react'

export const DrawerShiftCreate = () => {
  const [open, setOpen] = useState(false)

  const closeDrawer = () => setOpen(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="w-48 border border-bgColor bg-greenLigth hover:bg-greenLigth/50"
        >
          <CalendarPlus className="mr-2" />
          <span>Crear nuevo turno</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Crea un nuevo turno</DrawerTitle>
            <DrawerDescription>
              Elegí el momento que mejor te convenga
            </DrawerDescription>
          </DrawerHeader>
          <div className="m-4">
            <SelectShiftDay closeDrawer={closeDrawer} action="create" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
