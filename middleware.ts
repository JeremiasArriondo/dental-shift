import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si no está en una ruta de admin, no hacer nada
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Consultar la API de rol del usuario
  const res = await fetch(`${request.nextUrl.origin}/api/auth/role`, {
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
  matcher: ['/admin/:path*']
}
