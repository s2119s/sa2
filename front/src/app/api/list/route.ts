import { getList } from "@/app/lib/pq";
import { NextResponse } from "next/server";

export async function GET() {
  const list = await getList()
  return NextResponse.json({ responce: list }, { status: 200 })
}

