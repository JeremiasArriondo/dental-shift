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
  const req = await request.json()

  const { data, error } = await supabase
    .from('historial_clinico')
    .insert({ ...req, user_id: user.id })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    status: 200
  })
}
