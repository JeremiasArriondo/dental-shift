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

  const {
    name,
    dni,
    dateOfBirth,
    gender,
    address,
    age,
    numberPhone,
    healthInsurance,
    affiliateNumber
  } = await request.json()

  const { data, error } = await supabase
    .from('users')
    .update({
      name,
      dni,
      date_of_birth: dateOfBirth,
      gender,
      address,
      age,
      number_phone: numberPhone,
      obra_social_id: healthInsurance,
      affiliate_number: affiliateNumber
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
