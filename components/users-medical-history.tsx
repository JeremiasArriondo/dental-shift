import { UserAvatar } from './user-avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export const UsersMedicalHistory = ({ users = [] }: { users: any }) => {
  return (
    <>
      <Select>
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
    </>
  )
}
