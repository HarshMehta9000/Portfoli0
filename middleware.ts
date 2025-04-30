import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    // Get the admin token from cookies
    const adminToken = request.cookies.get("admin_token")?.value
    const envAdminToken = process.env.ADMIN_TOKEN

    // If no token or invalid token, redirect to login
    if (!adminToken || adminToken !== envAdminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
}
