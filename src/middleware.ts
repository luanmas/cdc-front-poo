'use server'

import fetchData from './utils/fetchData'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const signInURL = new URL('/', request.url)
  const homeInURL = new URL('/estoque', request.url)
  try {
    await fetchData<undefined, void>('auth/status')
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(homeInURL)
    }
  } catch (error) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }
    return NextResponse.redirect(signInURL)
  }
}

export const config = {
  matcher: [
    '/',
    '/empresa/:path*',
    '/estoque/:path*',
    '/lancamento-estoque/:path*',
  ],
}
