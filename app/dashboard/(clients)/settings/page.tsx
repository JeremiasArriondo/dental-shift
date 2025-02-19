import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { supabase as supabaseConnection } from '@/lib/connections/supabase'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export const metadata = {
  title: 'Mis datos personales'
}

export default async function DashboardSettingsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: user } = await supabaseConnection
    .from('users')
    .select('*, obra_social(*)')
    .eq('id', session.user.id)
    .single()

  const { data: obra_sociales } = await supabaseConnection
    .from('obra_sociales')
    .select('*')

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Datos personales"
        text="Mantén tu información actualizada"
      />{' '}
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Mis datos</CardTitle>
              <CardDescription>
                Realice cambios en su cuenta aquí. Haga clic en Guardar cuando
                haya terminado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" defaultValue={user?.name || ''} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Obra Social</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu obra social" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Obra Sociales</SelectLabel>
                      <SelectItem value="OSDE">OSDE</SelectItem>
                      <SelectItem value="OSAM">OSAM</SelectItem>
                      <SelectItem value="IOMA">IOMA</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
