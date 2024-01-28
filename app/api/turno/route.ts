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
    const [bearer, token] = authorization?.split(' ') as string[]
    const { data: userResponse } = await supabaseCookie.auth.getUser(token)
    currentUser = userResponse.user as User
  }

  const { description, date, hour } = await request.json()

  // @ts-ignore
  const { data, error } = await supabase.from('turnos').insert(
    {
      description,
      amount: 3001,
      date,
      hour,
      user_id: currentUser.id
    },
    {
      returning: 'minimal'
    }
  )

  return NextResponse.json(currentUser, {
    status: 200
  })
}
