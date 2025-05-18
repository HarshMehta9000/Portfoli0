import { NextRequest, NextResponse } from "next/server";
import { put, get } from "@vercel/blob";

const BLOG_BLOB_KEY = "blog-posts.json";

export async function GET() {
  try {
    const blob = await get(BLOG_BLOB_KEY, { token: process.env.BLOB_READ_WRITE_TOKEN });
    if (!blob) return NextResponse.json([]);
    const text = await blob.text();
    return NextResponse.json(JSON.parse(text));
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch blog posts." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await put(BLOG_BLOB_KEY, JSON.stringify(body, null, 2), {
      token: process.env.BLOB_READ_WRITE_TOKEN,
      access: "public"
    });
    return NextResponse.json({ status: "ok" });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save blog posts." }, { status: 500 });
  }
}
