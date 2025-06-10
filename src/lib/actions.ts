"use server";

import { signIn } from "auth";
import { AuthError } from "next-auth";
import prisma from "./prisma-client";
import { z } from "zod";
import { hashPassword } from "./password-utility";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email provided.").toLowerCase().trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password much be at least 6 characters long.")
    .max(255, "Password must be less than 255 characters long."),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long.")
    .max(155, "First name must be less than 155 characters long."),
  lastName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long.")
    .max(155, "First name must be less than 155 characters long."),
});

const CreateUser = UserSchema.omit({ id: true });

export type CreateUserState = {
  errors?: {
    email?: string[],
    password?: string[],
    firstName?: string[],
    lastName?: string[]
  },
  message?: string | null
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: CreateUserState | undefined,
  formData: FormData
) {
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the following errors: ",
    };
  }
  const { email, password, firstName, lastName } = validatedFields.data;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return {
        errors: {
          email: ["User with this email already exists"]
        },
        message: "Account creation failed",
      };
    }

    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
    if (result) {
      revalidatePath("/auth/login");
      redirect("/auth/login");
    }
  } catch (error) {
    console.error(`User creation error: ${error}`);
    return {
      message: "Database error. Please try again."
    }
  }
}
