import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      stores: {
        include: {
          products: {
            include: {
              productImages: true,  // <- Aquí se incluyen las imágenes del producto
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user });
}
