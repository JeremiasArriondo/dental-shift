'use client'
import { useEffect, useState } from 'react'
import { UserAvatar } from './user-avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { MedicalHistory, User } from '@/types/shift'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { Odontogram } from './odontogram'

const formSchema = z.object({
  medico_cabecera: z
    .string()
    .min(3, { message: 'Debe tener al menos 3 caracteres' }),
  bajo_tratamiento: z.boolean(),
  enfermedad: z.string().optional(),
  alergico: z.boolean(),
  alergias: z.string().optional(),
  toma_medicamento: z.boolean().optional(),
  medicamentos: z.string().optional(),
  afecciones: z
    .object({
      problemas_cardiacos: z.boolean().optional(),
      presion_arterial: z.boolean().optional(),
      hepatitis: z.boolean().optional(),
      cancer: z.boolean().optional(),
      diabetes: z.boolean().optional(),
      coagulacion: z.boolean().optional(),
      otros_problemas: z.boolean().optional(),
      embarazada_trimestre: z.boolean().optional(),
      terapia_radiante: z.boolean().optional(),
      fuma: z.boolean().optional(),
      bebe: z.boolean().optional()
    })
    .optional()
})

type AfeccionesKeys = keyof NonNullable<
  z.infer<typeof formSchema>['afecciones']
>

const afeccionesKeys: { name: AfeccionesKeys; label: string }[] = [
  { name: 'problemas_cardiacos', label: 'Problemas Cardíacos' },
  { name: 'presion_arterial', label: 'Presión Arterial' },
  { name: 'hepatitis', label: 'Hepatitis' },
  { name: 'cancer', label: 'Cáncer' },
  { name: 'diabetes', label: 'Diabetes' },
  { name: 'coagulacion', label: 'Problemas de Coagulación' },
  { name: 'otros_problemas', label: 'Otros Problemas de Salud' },
  {
    name: 'embarazada_trimestre',
    label: 'Está embarazada (indicar trimestre)'
  },
  { name: 'terapia_radiante', label: 'Terapia Radiante' },
  { name: 'fuma', label: 'Fuma' },
  { name: 'bebe', label: 'Bebe Alcohol' }
]

export const UsersMedicalHistory = ({ users = [] }: { users: User[] }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
    null
  )
  const { toast } = useToast()
  const router = useRouter()
  const selectedUser = users.find((u) => u.id === selectedUserId)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedUser) return
    try {
      const res = await fetch('/api/medical-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, user_id: selectedUser.id })
      })

      if (!res.ok) {
        throw new Error(res?.statusText || 'faild to update user data')
      }

      toast({
        title: 'Historial clinico',
        description: `Información: los datos fueron guardados`
      })

      router.refresh()
    } catch (error) {
      toast({
        title: 'Oops! Ocurrió un error',
        description: 'Los datos no pudieron guardarse'
      })
    }
  }

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        if (!selectedUser?.id) {
          setMedicalHistory(null)
          form.reset()
          return
        }

        setMedicalHistory(null)

        const res = await fetch(
          `/api/medical-history?user_id=${selectedUser.id}`
        )

        if (!res.ok) {
          throw new Error('Error al obtener el historial clínico')
        }

        const data = await res.json()

        if (!data) {
          form.reset()
          return
        }

        setMedicalHistory(data)
      } catch (error) {
        console.error('Error al obtener historial clínico:', error)
      }
    }

    fetchMedicalHistory()
  }, [selectedUser])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medico_cabecera: medicalHistory?.medico_cabecera ?? '',
      bajo_tratamiento: medicalHistory?.bajo_tratamiento ?? false,
      enfermedad: medicalHistory?.enfermedad ?? '',
      alergico: medicalHistory?.alergico ?? false,
      toma_medicamento: medicalHistory?.toma_medicamento ?? false,
      medicamentos: medicalHistory?.medicamentos ?? '',
      afecciones: {
        problemas_cardiacos:
          medicalHistory?.afecciones?.['problemas_cardiacos'] ?? false,
        presion_arterial:
          medicalHistory?.afecciones?.['presion_arterial'] ?? false,
        hepatitis: medicalHistory?.afecciones?.['hepatitis'] ?? false,
        cancer: medicalHistory?.afecciones?.['cancer'] ?? false,
        diabetes: medicalHistory?.afecciones?.['diabetes'] ?? false,
        coagulacion: medicalHistory?.afecciones?.['coagulacion'] ?? false,
        otros_problemas:
          medicalHistory?.afecciones?.['otros_problemas'] ?? false,
        embarazada_trimestre:
          medicalHistory?.afecciones?.['embarazada_trimestre'] ?? false,
        terapia_radiante:
          medicalHistory?.afecciones?.['terapia_radiante'] ?? false,
        fuma: medicalHistory?.afecciones?.['fuma'] ?? false,
        bebe: medicalHistory?.afecciones?.['bebe'] ?? false
      }
    }
  })

  useEffect(() => {
    if (medicalHistory) {
      form.reset({
        medico_cabecera: medicalHistory?.medico_cabecera ?? '',
        bajo_tratamiento: medicalHistory?.bajo_tratamiento ?? false,
        enfermedad: medicalHistory?.enfermedad ?? '',
        alergico: medicalHistory?.alergico ?? false,
        toma_medicamento: medicalHistory?.toma_medicamento ?? false,
        medicamentos: medicalHistory?.medicamentos ?? '',
        afecciones: {
          problemas_cardiacos:
            medicalHistory?.afecciones?.['problemas_cardiacos'] ?? false,
          presion_arterial:
            medicalHistory?.afecciones?.['presion_arterial'] ?? false,
          hepatitis: medicalHistory?.afecciones?.['hepatitis'] ?? false,
          cancer: medicalHistory?.afecciones?.['cancer'] ?? false,
          diabetes: medicalHistory?.afecciones?.['diabetes'] ?? false,
          coagulacion: medicalHistory?.afecciones?.['coagulacion'] ?? false,
          otros_problemas:
            medicalHistory?.afecciones?.['otros_problemas'] ?? false,
          embarazada_trimestre:
            medicalHistory?.afecciones?.['embarazada_trimestre'] ?? false,
          terapia_radiante:
            medicalHistory?.afecciones?.['terapia_radiante'] ?? false,
          fuma: medicalHistory?.afecciones?.['fuma'] ?? false,
          bebe: medicalHistory?.afecciones?.['bebe'] ?? false
        }
      })
    } else {
      form.reset({
        medico_cabecera: '',
        bajo_tratamiento: false,
        enfermedad: '',
        alergico: false,
        toma_medicamento: false,
        medicamentos: '',
        afecciones: {
          problemas_cardiacos: false,
          presion_arterial: false,
          hepatitis: false,
          cancer: false,
          diabetes: false,
          coagulacion: false,
          otros_problemas: false,
          embarazada_trimestre: false,
          terapia_radiante: false,
          fuma: false,
          bebe: false
        }
      })
    }
  }, [medicalHistory, form.reset])

  return (
    <>
      <Select value={selectedUserId} onValueChange={setSelectedUserId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un paciente" />
        </SelectTrigger>
        <SelectContent>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <SelectItem value={user.id} key={user.id}>
                {user.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle>Datos personales del paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8">
              <UserAvatar
                user={{
                  image: selectedUser.avatar_url ?? '',
                  name: selectedUser.name
                }}
                className="h-16 w-16"
              />
              <div className="flex gap-2">
                <div>
                  <Label htmlFor="name">Nombre:</Label>
                  <Input
                    id="name"
                    value={selectedUser.full_name ?? ''}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="name">DNI:</Label>
                  <Input
                    id="name"
                    value={selectedUser.dni ?? 'XX.XXX.XXX'}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <Label htmlFor="name">Fecha nacimiento</Label>
                <Input
                  id="id"
                  type="date"
                  value={selectedUser.date_of_birth ?? ''}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="name">Sexo</Label>
                <Input id="id" value={selectedUser.gender ?? ''} readOnly />
              </div>
              <div>
                <Label htmlFor="name">Edad</Label>
                <Input id="id" value={selectedUser.age ?? ''} readOnly />
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <Label htmlFor="name">Domicilio</Label>
                <Input id="id" value={selectedUser.address ?? ''} readOnly />
              </div>
              <div>
                <Label htmlFor="name">Localidad</Label>
                <Input id="id" value={selectedUser.city ?? ''} readOnly />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Telefono</Label>
              <Input id="id" value={selectedUser.number_phone ?? ''} readOnly />
            </div>
            <hr className="my-4" />
            <CardTitle className="py-4">Historia clínica</CardTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="medico_cabecera"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Médico cabecera:</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. X" {...field} className="h-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bajo_tratamiento"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormLabel>
                        Está bajo tratamiento médico por alguna enfermedad:
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enfermedad"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormLabel>Cual/es?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enfermedad"
                          {...field}
                          className="h-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alergico"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormLabel>Es alérgico a algún medicamento:</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alergias"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormLabel>Cual/es?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alergias"
                          {...field}
                          className="h-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toma_medicamento"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormLabel>Toma algún medicamento:</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medicamentos"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                      <FormLabel>Cual/es?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese los medicamentos"
                          {...field}
                          className="h-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormDescription>
                  Marque con una x las afeccione que haya tenido
                </FormDescription>
                {afeccionesKeys.map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={
                      `afecciones.${name}` as `afecciones.${AfeccionesKeys}`
                    }
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>{label}</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <hr className="my-4" />
                <CardTitle className="py-4">Odontograma</CardTitle>
                <Odontogram />
                <Button type="submit">Guardar datos</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
