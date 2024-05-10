import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const data = await request.json();
  const session = await auth()
  if(session?.user.id && data.game && data.score) {
    const score = await prisma.memoryScores.create({
        data: {
          userId: session.user.id,
          score: parseInt(data.score)
        },
    });
  }
  return NextResponse.json({success: true, message: 'Score saved successfully!'}, { status: 200 });
}

export async function GET(request: NextRequest) {
  const session = await auth()
  if(session?.user.id) {
    const score = await prisma.memoryScores.findFirst({
        where: {
          userId: session.user.id
        },
        orderBy: {
          score: 'asc',
        },
    })
    return NextResponse.json({success: true, message: score}, { status: 200 });
  } else {
    return NextResponse.json({success: false, message: 'Unauthenticated'}, { status: 401 });
  }
  
}