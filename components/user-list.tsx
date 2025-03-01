import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { UserAvatar } from '@/components/user-avatar'
import { User } from '@/types/shift'

export const UserList = ({ users = [] }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Avatar</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Obra social</TableHead>
          <TableHead>Turnos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <UserAvatar
                  user={{
                    name: user.name,
                    image: user.avatar_url ?? ''
                  }}
                  className="h-12 w-12"
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.obra_social?.sigla}</TableCell>
              <TableCell className="text-right">-</TableCell>
            </TableRow>
          ))
        ) : (
          <div>
            <p>Ningún usuario cargado</p>
          </div>
        )}
      </TableBody>
    </Table>
  )
}
