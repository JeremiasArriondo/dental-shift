import { supabase } from '@/lib/connections/supabase'
import { User, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: any }) {
  const supabaseCookie = createRouteHandlerClient({ cookies })

  const {
    data: { session: cookieSession }
  } = await supabaseCookie.auth.getSession()

  let currentUser = cookieSession?.user
  if (!currentUser) {
    const headersList = headers()
    const authorization = headersList.get('authorization')
    const [, token] = authorization?.split(' ') as string[]
    const { data: userResponse } = await supabaseCookie.auth.getUser(token)
    currentUser = userResponse.user as User
  }

  const { description, date, hour, appointment_date } = await request.json()

  // @ts-ignore
  const { data, error } = await supabase.from('turnos').insert(
    {
      description,
      amount: 0,
      date,
      hour,
      user_id: currentUser.id,
      appointment_date
    },
    {
      returning: 'minimal'
    }
  )

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
      { error: 'El id es requerido para a ctualizar el turno' },
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
