import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextApiRequest } from 'next'

type Request = NextApiRequest & {
  nextUrl: {
    pathname: string
  }
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl
  const url = req.nextUrl.clone()

  // Alllow the requests if the following is true:
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }
  if (token && pathname === '/login') {
    url.pathname = '/'
    return NextResponse.rewrite(url)
  }

  if (!token && pathname !== '/login') {
    url.pathname = 'login'
    return NextResponse.rewrite(url)
  }
}
