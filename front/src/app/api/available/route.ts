import { getAvailable } from "@/app/lib/pq";
import { NextResponse } from "next/server";

export async function GET() {
  const available = await getAvailable()
  return NextResponse.json({ responce: available }, { status: 200 })
}

