import { getRecordsByUserId, getTotalRecordsByUser } from "@/services/record-service";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
   return NextResponse.json({ Welcome: 'Welcome to random strings API' })
}

export async function POST(request: Request) {
  const data = await request.json();
  const { userId, page, pageSize } = data;

   const records = await getRecordsByUserId(userId, page, pageSize)

   const totalReocords = await getTotalRecordsByUser(userId)
   const resultData = {
      records,
      page,
      total: totalReocords[0].count
   } 

    return NextResponse.json(resultData);
}
