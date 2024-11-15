import { getNumber } from "@/app/lib/pq";
import { NextResponse } from "next/server";

export async function GET() {
  const list = await getNumber()
  return NextResponse.json({ responce: list }, { status: 200 })
}

