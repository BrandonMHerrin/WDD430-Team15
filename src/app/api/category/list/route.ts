// src/app/api/category/list/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error loading categories' }, { status: 500 });
  }
}
