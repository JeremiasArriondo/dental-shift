'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  sigla: z.string().optional(),
  code: z.string().optional()
})

export const CreateObraSocial = () => {
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sigla: '',
      code: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/api/obra-social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!res.ok) {
        throw new Error(res?.statusText || 'faild to update user data')
      }

      toast({
        title: 'DObras sociales',
        description: `Información: se añadió una nueva obra social`
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="w-48 border border-bgColor bg-greenLigth hover:bg-greenLigth/50"
        >
          <FilePlus className="mr-2" />
          <span>Crear obra social</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Añadir una nueva obra social</DrawerTitle>
            <DrawerDescription>
              Podes crear la obra social que necesites
            </DrawerDescription>
          </DrawerHeader>
          <div className="m-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Obra Social" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sigla"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sigla</FormLabel>
                      <FormControl>
                        <Input placeholder="OSDE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Codigo</FormLabel>
                      <FormControl>
                        <Input placeholder="0-000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full border border-bgColor bg-greenLigth"
                >
                  Crear obra social
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
