"use server";

import { signIn } from "auth";
import prisma from "./prisma-client";
import { z } from "zod";
import { hashPassword } from "./password-utility";
import { revalidatePath } from "next/cache";

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

export type AuthenticateState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
}

export async function authenticate(
  prevState: AuthenticateState | undefined,
  formData: FormData
): Promise<AuthenticateState> {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false
    });
    return {
      message: "Authenticated successfully",
      success: true
    }
  } catch (error) {
    console.error(error)
    return {
      message: "Failed to login",
      success: false
    }
  }
}


export type CreateUserState = {
  errors?: {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function createUser(
  prevState: CreateUserState | undefined,
  formData: FormData
): Promise<CreateUserState> {
  console.log(`Creating user.`)
  const validatedFields = CreateUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validatedFields.success) {
    console.error('Failed to validate input data.')
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the following errors: ",
      success: false
    };
  }
  const { email, password, firstName, lastName } = validatedFields.data;
  console.log('Extracted values from params.')
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      console.error('User already exists.')
      return {
        errors: {
          email: ["User with this email already exists"]
        },
        message: "Account creation failed",
        success: false
      };
    }

    const hashedPassword = await hashPassword(password);

    console.log('Creating user record in db.')
    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
    if (!result) {
      return {
        errors: {},
        message: 'Failed to create user.',
        success: false
      }
    }
    console.log('Successfully created user.')
    revalidatePath("/auth/login");
    return {
      errors: {},
      message: 'Successfully created user.',
      success: true
    }
  } catch (error) {
    console.error(`User creation error: ${error}`);
    return {
      errors: {},
      message: "Database error. Please try again.",
      success: false
    }
  }
}
