'use client'

import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { supabase } from '@/lib/connections/supabase'
import { useRouter } from 'next/navigation'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name?: string | null
    image: string
    email: string
  }
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const route = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    route.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name ?? '', image: user.image ?? '' }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/turnos">Mis turnos</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Mis datos personales</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
