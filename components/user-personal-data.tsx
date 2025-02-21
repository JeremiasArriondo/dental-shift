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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  dni: z.coerce
    .number()
    .min(7, { message: 'Tu DNI debe tener al menos 7 digitos' }),
  dateOfBirth: z.coerce.date(),
  gender: z.string().optional(),
  address: z.string().optional(),
  age: z.coerce.string().optional(),
  numberPhone: z.string().optional(),
  city: z.string().optional(),
  healthInsurance: z.string().optional(),
  affiliateNumber: z.string().optional()
})

export const UserPersonalData = ({
  user,
  obraSociales
}: {
  user: any
  obraSociales: any[]
}) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      dni: user.dni ?? undefined,
      dateOfBirth: user.date_of_birth ?? undefined,
      gender: user.gender ?? 'X',
      address: user.address ?? '',
      age: user.age ?? undefined,
      numberPhone: user.number_phone ?? undefined,
      healthInsurance: user.obra_social_id ?? undefined,
      affiliateNumber: user.affiliate_number ?? undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!res.ok) {
        throw new Error(res?.statusText || 'faild to update user data')
      }

      toast({
        title: 'Datos personales',
        description: `Información: tus datos fueron guardados`
      })

      router.refresh()
    } catch (error) {
      toast({
        title: 'Oops! Ocurrió un error',
        description: 'Tus datos no pudieron guardarse'
      })
    }
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
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder={user.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="xx.xxx.xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha nacimiento</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split('T')[0]
                            : field.value
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sin definir" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                        <SelectItem value="X">Sin definir</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edad</FormLabel>
                    <FormControl>
                      <Input placeholder="18" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domicilio</FormLabel>
                  <FormControl>
                    <Input placeholder="Av. 25 de Mayo.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input placeholder="2475xxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <FormControl>
                    <Input placeholder="Rojas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="healthInsurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Obra Social</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                                <SelectItem
                                  value={obraSocial.id}
                                  key={obraSocial.id}
                                >
                                  {obraSocial.sigla
                                    ? obraSocial.sigla
                                    : obraSocial.name}
                                </SelectItem>
                              )
                            })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affiliateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero afiliado</FormLabel>
                  <FormControl>
                    <Input placeholder="100200300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Guardas datos</Button>
          </form>
        </Form>
      </CardContent>
      {/* <CardContent className="space-y-2">
        <div className="w-full">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            defaultValue={fullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="name">DNI</Label>
          <Input
            id="id"
            defaultValue={fullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <Label htmlFor="name">Fecha nacimiento</Label>
            <Input
              id="id"
              defaultValue={fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="w-[100px]">
            <Label htmlFor="name">Sexo</Label>
            <Input
              id="id"
              defaultValue={fullName}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="w-[60px]">
            <Label htmlFor="name">Edad</Label>
            <Input
              id="id"
              defaultValue={0}
              value={0}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="name">Domicilio</Label>
          <Input
            id="id"
            defaultValue={0}
            value={0}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="name">Telefono</Label>
          <Input
            id="id"
            defaultValue={0}
            value={0}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="name">Localidad</Label>
          <Input
            id="id"
            defaultValue={0}
            value={0}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
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
      */}
    </Card>
  )
}
