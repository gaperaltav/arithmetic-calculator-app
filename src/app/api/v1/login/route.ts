import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest, response: NextResponse) {
   const { body } = request;
   return NextResponse.json({ Welcome: body })
}