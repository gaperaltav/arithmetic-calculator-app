
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  console.log({ session })
  return NextResponse.json({ Welcome: 'Welcome to operations API' })
}