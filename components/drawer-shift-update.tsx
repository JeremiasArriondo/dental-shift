'use client'
import { CalendarPlus, Pencil } from 'lucide-react'
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

export const DrawerShiftUpdate = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)

  const closeDrawer = () => setOpen(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="border border-bgColor bg-greenLigth hover:bg-greenLigth/50"
        >
          <Pencil className="mr-2" />
          <span>Editar</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Modifica tu turno</DrawerTitle>
            <DrawerDescription>
              Elegí el momento que mejor te convenga
            </DrawerDescription>
          </DrawerHeader>
          <div className="m-4">
            <SelectShiftDay closeDrawer={closeDrawer} action="update" id={id} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
