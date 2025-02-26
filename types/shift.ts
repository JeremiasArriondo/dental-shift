import { type Database } from '@/types/database'

type ShiftEntity = Database['public']['Tables']['turnos']['Row']

type UserEntity = Database['public']['Tables']['users']['Row']

type ObraSocialEntity = Database['public']['Tables']['obra_social']['Row']

type MedicalHistoryEntity =
  Database['public']['Tables']['historial_clinico']['Row']

export type Turno = ShiftEntity & {
  users: UserEntity | null
}

export type User = UserEntity & {
  obra_social: ObraSocialEntity | null
}

export type MedicalHistory = MedicalHistoryEntity
