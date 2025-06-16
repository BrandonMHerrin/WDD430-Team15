import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, avatarUrl, phone, bio } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        image: avatarUrl, 
        phone,
        bio,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ success: false, error: 'Error updating profile' }, { status: 500 });
  }
}
