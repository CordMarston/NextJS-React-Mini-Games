import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { auth } from "@/lib/auth"

export async function PUT(request: NextRequest) {
  const data = await request.json()
  const session = await auth()
  if(session) {
    const user = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        nicknameAsked: true,
        nickname: data.nickName
      }
    });
    return NextResponse.json({success: true, message: 'User updated successfully'}, { status: 200 });
  }
  
}