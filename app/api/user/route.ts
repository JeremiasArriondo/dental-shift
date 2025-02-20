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

  const { name, obraSocialId } = await request.json()

  // @ts-ignore
  const { data, error } = await supabase
    .from('users')
    .update({
      name,
      obra_social_id: obraSocialId
    })
    .eq('id', currentUser.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log({ data })

  return NextResponse.json(data, {
    status: 200
  })
}
