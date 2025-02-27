import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ObrasSociales } from '@/types/shift'

type ObrasSocialesProps = {
  obrasSociales: ObrasSociales[]
}

export const ObrasSocialesList = ({ obrasSociales }: ObrasSocialesProps) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {obrasSociales &&
            obrasSociales.map((obraSocial) => (
              <TableRow>
                <TableCell>{obraSocial.sigla}</TableCell>
                <TableCell>{obraSocial.name}</TableCell>
                <TableCell>{obraSocial.code}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}
