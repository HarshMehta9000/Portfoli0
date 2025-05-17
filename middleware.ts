// middleware.ts

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// TEMPORARY: Bypass all auth checks on /admin
export function middleware(request: NextRequest) {
  return NextResponse.next(); // Allow all admin access
}

export const config = {
  matcher: "/admin/:path*",
}
