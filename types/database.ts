export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      historial_clinico: {
        Row: {
          afecciones: Json | null
          alergias: string | null
          alergico: boolean | null
          bajo_tratamiento: boolean | null
          created_at: string
          enfermedad: string | null
          id: string
          medicamentos: string | null
          medico_cabecera: string | null
          odontogram: Json | null
          toma_medicamento: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          afecciones?: Json | null
          alergias?: string | null
          alergico?: boolean | null
          bajo_tratamiento?: boolean | null
          created_at?: string
          enfermedad?: string | null
          id?: string
          medicamentos?: string | null
          medico_cabecera?: string | null
          odontogram?: Json | null
          toma_medicamento?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          afecciones?: Json | null
          alergias?: string | null
          alergico?: boolean | null
          bajo_tratamiento?: boolean | null
          created_at?: string
          enfermedad?: string | null
          id?: string
          medicamentos?: string | null
          medico_cabecera?: string | null
          odontogram?: Json | null
          toma_medicamento?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historial_clinico_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      obra_social: {
        Row: {
          code: string | null
          created_at: string
          id: string
          name: string
          sigla: string
          updated_at: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          name: string
          sigla: string
          updated_at?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string
          sigla?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      turnos: {
        Row: {
          amount: number | null
          appointment_date: string | null
          created_at: string
          date: string | null
          description: string | null
          hour: string | null
          id: string
          update_at: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          appointment_date?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          hour?: string | null
          id?: string
          update_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          appointment_date?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          hour?: string | null
          id?: string
          update_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "turnos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          affiliate_number: string | null
          age: number | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          dni: number | null
          email: string | null
          full_name: string
          gender: string | null
          id: string
          name: string
          number_phone: string | null
          obra_social_id: string | null
          role: string | null
        }
        Insert: {
          address?: string | null
          affiliate_number?: string | null
          age?: number | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          dni?: number | null
          email?: string | null
          full_name: string
          gender?: string | null
          id?: string
          name: string
          number_phone?: string | null
          obra_social_id?: string | null
          role?: string | null
        }
        Update: {
          address?: string | null
          affiliate_number?: string | null
          age?: number | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          dni?: number | null
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          name?: string
          number_phone?: string | null
          obra_social_id?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_obra_social_id_fkey"
            columns: ["obra_social_id"]
            isOneToOne: false
            referencedRelation: "obra_social"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
