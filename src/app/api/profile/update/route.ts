// Import Next.js response utility and the Prisma client instance
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// Handle POST request to update a user's profile
export async function POST(req: Request) {
  try {
    // Parse the request body to extract required fields
    const body = await req.json();
    const { email, avatarUrl, phone, bio } = body;

    // Validate that the email is provided
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Update the user in the database based on their email
    // Set the new avatar image URL, phone number, and bio
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        image: avatarUrl, 
        phone,
        bio,
      },
    });

    // Return a success response with the updated user data
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    // Log the error and return an internal server error response
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, error: 'Error updating profile' },
      { status: 500 }
    );
  }
}
