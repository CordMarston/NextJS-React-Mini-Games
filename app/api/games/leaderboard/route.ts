import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const session = await auth()
    if(session?.user.id) {

        const memoryScores = await prisma.memoryScores.findMany({
            take: 10,
            select: {
                score: true,
                createdAt: true,
                user: {
                    select: {
                        nickname: true,
                        image: true
                    }
                }
            },
            orderBy: {
                score: 'asc',
            },
        });

        return NextResponse.json({memoryScores: memoryScores}, { status: 200 });
    } else {
        return NextResponse.json({success: false, message: 'Unauthenticated'}, { status: 401 });
    }
}