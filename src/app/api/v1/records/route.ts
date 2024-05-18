import { getRecordsByUserId } from "@/services/record-service";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
   return NextResponse.json({ Welcome: 'Welcome to random strings API' })
}

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = data;

   const records = await getRecordsByUserId(userId)
   console.log({ records })

    return NextResponse.json(records);
}
