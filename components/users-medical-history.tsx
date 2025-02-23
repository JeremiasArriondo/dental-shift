'use client'
import { useState } from 'react'
import { UserAvatar } from './user-avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { User } from '@/types/shift'
import Odontogram from '@/components/odontogram/odontogram'

export const UsersMedicalHistory = ({ users = [] }: { users: User[] }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('')

  const selectedUser = users.find((u) => u.id === selectedUserId)

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
        <UserAvatar
          user={{
            image: selectedUser.avatar_url ?? '',
            name: selectedUser.name
          }}
          className="h-16 w-16"
        />
      )}
      {selectedUser && <p>{selectedUser.email}</p>}
      <Odontogram />
    </>
  )
}
