import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const BLOG_BLOB_KEY = "blog-posts.json";

async function getBlogPostsFromBlob(token: string) {
  const blobs = await list({ token });
  const found = blobs.blobs.find(b => b.pathname === BLOG_BLOB_KEY);
  if (!found) return [];
  const res = await fetch(found.url);
  return await res.json();
}

export async function GET() {
  try {
    const posts = await getBlogPostsFromBlob(process.env.BLOB_READ_WRITE_TOKEN as string);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 200 });
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
  } catch {
    return NextResponse.json({ error: "Failed to save blog posts." }, { status: 500 });
  }
}
