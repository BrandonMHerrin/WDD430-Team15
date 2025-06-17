import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('📦 Data Received en /api/product/create:', body);

    const { storeId, name, description, price, categoryId, imageUrl } = body;

    if (!storeId || !name || price === undefined || !categoryId) {
      return NextResponse.json(
        { success: false, error: 'storeId, name, price y categoryId son requeridos' },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'imageUrl es requerido' },
        { status: 400 }
      );
    }

    // Crear producto con imagen asociada
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || '',
        price: Number(price),
        store: {
          connect: { id: storeId },
        },
        category: {
          connect: { id: categoryId },
        },
        productImages: {
          create: [
            {
              imageUrl,
              fileType: 'jpeg', // valor por defecto, cámbialo si sabes el tipo real
              sortOrder: 0,           // valor por defecto
            },
          ],
        },
      },
      include: {
        productImages: true, // incluir imágenes en la respuesta
      },
    });

    const createdImage = newProduct.productImages[0];

    return NextResponse.json({ success: true, product: newProduct, image: createdImage });
  } catch (err) {
    console.error('Error en /api/product/create:', err);
    return NextResponse.json(
      { success: false, error: 'Error creating product' },
      { status: 500 }
    );
  }
}
