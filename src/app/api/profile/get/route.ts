// Import the Next.js response utility and the Prisma client
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// Handle POST requests to fetch a user's profile data by email
export async function POST(req: Request) {
  // Parse the request body to get the email
  const body = await req.json();
  const { email } = body;

  // Look for the user in the database by email, including their related data:
  // - stores owned by the user
  // - products within each store
  // - and for each product: id, name, description, price, category, and productImages
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      stores: {
        include: {
          products: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              category: true,
              productImages: true,
            },
          },
        },
      },
    },
  });

  // If the user was not found, return a 404 response
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    );
  }

  // If user was found, return success response with user data
  return NextResponse.json({ success: true, user });
}
