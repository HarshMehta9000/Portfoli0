import { NextRequest, NextResponse } from "next/server";
import { put, list, download } from "@vercel/blob";

const BLOG_BLOB_KEY = "blog-posts.json";

export async function GET() {
  try {
    // Check if blob exists
    const blobs = await list();
    const found = blobs.blobs.find(b => b.pathname === BLOG_BLOB_KEY);

    if (!found) return NextResponse.json([]);

    // Download blob content
    const res = await download(BLOG_BLOB_KEY, { token: process.env.BLOB_READ_WRITE_TOKEN });
    const text = await res.text();
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
