import { NextResponse, type NextRequest } from 'next/server'

const publicFile = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Legacy redirect for old blog post slug
  const oldSlugPath = '/writing/2025-10-19-why-ai-needs-boring-ops'
  const newSlugPath = '/writing/how-llms-work'
  const normalizedPath = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  if (normalizedPath.endsWith(oldSlugPath)) {
    const url = request.nextUrl.clone()
    url.pathname = newSlugPath
    return NextResponse.redirect(url)
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
