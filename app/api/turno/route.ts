import { supabase } from '@/lib/connections/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { user },
    error: sessionError
  } = await supabase.auth.getUser()

  if (sessionError || !user) {
    return NextResponse.json(
      { error: 'User is not authenticated' },
      { status: 401 }
    )
  }
  const { description, date, hour, appointment_date } = await request.json()

  const { data, error } = await supabase.from('turnos').insert({
    description,
    amount: 0,
    date,
    hour,
    user_id: user.id,
    appointment_date
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    status: 200
  })
}

export async function PUT(request: NextRequest) {
  const { id, description, date, hour } = await request.json()

  if (!id) {
    return NextResponse.json(
      { error: 'El id es requerido para actualizar el turno' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('turnos')
    .update({
      description,
      date,
      hour
    })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, {
    status: 200
  })
}
