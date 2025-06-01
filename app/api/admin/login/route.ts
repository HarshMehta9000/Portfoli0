import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const adminToken = process.env.ADMIN_TOKEN

    if (!adminToken) {
      return NextResponse.json({ success: false, message: "Admin token not configured on server" }, { status: 500 })
    }

    if (password === adminToken) {
      // Set the admin token cookie
      cookies().set("admin_token", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
