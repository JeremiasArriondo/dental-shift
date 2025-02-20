'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'

export const UpdateObraSocial = ({
  currentValue,
  obraSociales
}: {
  currentValue: string
  obraSociales: any[] | null
}) => {
  const [selectedOption, setSelectedOption] = useState(currentValue)
  return (
    <Select
      value={selectedOption}
      onValueChange={(value) => {
        setSelectedOption(value)
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecciona tu obra social" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Obra Sociales</SelectLabel>
          {obraSociales &&
            obraSociales.length > 0 &&
            obraSociales.map((obraSocial) => {
              return (
                <SelectItem value={obraSocial.id}>
                  {obraSocial.sigla ? obraSocial.sigla : obraSocial.name}
                </SelectItem>
              )
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
