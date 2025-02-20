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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const UserPersonalData = ({
  user,
  obraSociales
}: {
  user: any
  obraSociales: any[]
}) => {
  const [selectedOption, setSelectedOption] = useState(user.obra_social_id)
  const [fullName, setFullName] = useState(user.name || '')

  const savePersonalData = () => {
    console.log(fullName)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis datos</CardTitle>
        <CardDescription>
          Realice cambios en su cuenta aquí. Haga clic en Guardar cuando haya
          terminado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            defaultValue={fullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Obra Social</Label>
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
                      <SelectItem value={obraSocial.id} key={obraSocial.id}>
                        {obraSocial.sigla ? obraSocial.sigla : obraSocial.name}
                      </SelectItem>
                    )
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={savePersonalData}>Guardar cambios</Button>
      </CardFooter>
    </Card>
  )
}
