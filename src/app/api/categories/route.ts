import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        sortOrder: true,
        isActive: true,
        parentCategoryId: true,
        children: {
          select: {
            id: true,
            name: true,
            description: true,
            sortOrder: true,
            isActive: true,
            parentCategoryId: true,
          },
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
      where: { isActive: true, parentCategoryId: null },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}