import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function POST(req: Request) {
  try {
    const { productId, imageUrl } = await req.json();

    if (!productId || !imageUrl) {
      return NextResponse.json({ success: false, error: 'productId and imageUrl required' }, { status: 400 });
    }

    const newImg = await prisma.productImage.create({
      data: {
        productId,
        imageUrl,
        sortOrder: 0,
        fileType: 'JPEG', // puedes parametrizarlo si necesitas
      },
    });

    return NextResponse.json({ success: true, image: newImg });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Error uploading image' }, { status: 500 });
  }
}
