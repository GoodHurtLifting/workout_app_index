import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { EditorialRateLimitError, saveEditorialRequest } from "@/lib/editorial-requests";

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12000) {
    return NextResponse.json({ message: "The request is too long." }, { status: 413 });
  }

  try {
    const raw = await request.text();
    if (raw.length > 12000) {
      return NextResponse.json({ message: "The request is too long." }, { status: 413 });
    }
    await saveEditorialRequest(JSON.parse(raw));
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError || error instanceof SyntaxError) {
      return NextResponse.json({ message: "Please check the required fields and URLs." }, { status: 400 });
    }
    if (error instanceof EditorialRateLimitError) {
      return NextResponse.json({ message: error.message }, { status: 429 });
    }
    console.error("Could not save editorial request", error);
    return NextResponse.json({ message: "We could not send your request. Please try again later." }, { status: 500 });
  }
}
