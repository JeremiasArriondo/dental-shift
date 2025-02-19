import { createRouteHandlerClient, User } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
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

  const { id, description, date, hour, appointment_date } = await request.json()

  // @ts-ignore
  const { data, error } = await supabase
    .from('users')
    .update({
      description,
      date,
      hour,
      user_id: currentUser.id,
      appointment_date
    })
    .eq('id', id)

  return NextResponse.json(currentUser, {
    status: 201
  })
}
