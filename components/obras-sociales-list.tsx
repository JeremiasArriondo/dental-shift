'use client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { supabase } from '@/lib/connections/supabase'
import { ObrasSociales } from '@/types/shift'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ObrasSocialesProps = {
  obrasSociales: ObrasSociales[]
}

export const ObrasSocialesList = ({ obrasSociales }: ObrasSocialesProps) => {
  const router = useRouter()
  const deleteTurno = async (id: string) => {
    const { error } = await supabase.from('obra_social').delete().eq('id', id)
    if (!error) {
      router.refresh()
    }
  }
  return (
    <>
      <Table>
        <TableCaption>
          Lista de obras sociales. Podes ver mas info sobre obras sociales{' '}
          <a
            href="https://www.anses.gob.ar/listado-de-obras-sociales-para-trabajadores-en-actividad"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            acá
          </a>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sigla</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {obrasSociales &&
            obrasSociales.map((obraSocial) => (
              <TableRow>
                <TableCell>{obraSocial.sigla}</TableCell>
                <TableCell>{obraSocial.name}</TableCell>
                <TableCell>{obraSocial.code}</TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    className="border border-bgColor"
                    onClick={() => deleteTurno(obraSocial.id)}
                  >
                    <X />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}
