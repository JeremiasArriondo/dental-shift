import { type Database } from '@/types/database'

type ShiftEntity = Database['public']['Tables']['turnos']['Row']

type UserEntity = Database['public']['Tables']['users']['Row']

export type Turno = ShiftEntity & {
  user: UserEntity | null
}
