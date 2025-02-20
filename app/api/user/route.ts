import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
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

  const { name, obraSocialId } = await request.json()
  const { data, error } = await supabase
    .from('users')
    .update({
      name,
      obra_social_id: obraSocialId
    })
    .eq('id', user.id)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log({ data })

  return NextResponse.json(data, {
    status: 200
  })
}
