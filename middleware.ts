import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/dashboard/admin')) return NextResponse.next()

  const res = await fetch(`${request.nextUrl.origin}/api/role`, {
    headers: request.headers
  })

  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { role } = await res.json()

  if (role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/admin/:path*']
}
