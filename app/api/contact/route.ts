import { NextRequest, NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/contact";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  try {
    const record = await submitContactMessage({
      name: typeof body.name === "string" ? body.name : "",
      email: typeof body.email === "string" ? body.email : "",
      program: typeof body.program === "string" ? body.program : "",
      message: typeof body.message === "string" ? body.message : "",
    });
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    const status = (err as { status?: number })?.status ?? 500;
    const message =
      err instanceof Error && status < 500
        ? err.message
        : "Something went wrong. Please try again in a moment.";
    if (status >= 500) console.error("contact submission failed", err);
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
