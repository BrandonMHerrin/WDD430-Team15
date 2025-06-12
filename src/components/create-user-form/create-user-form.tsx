"use client";

import { createUser, CreateUserState } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import styles from "./create-user-form.module.css";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const router = useRouter();
  const initialState: CreateUserState = {
    errors: {},
    message: null,
    success: false,
  };
  const [state, formAction] = useActionState(createUser, initialState);
  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    }
  }, [state?.success, router]);

  return (
    <>
      {state?.success && (
        <p>{state?.message}</p>
        )}
      <form action={formAction}>
        <label>
          First Name
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="Enter your first name"
            className={styles.inputItem}
          />
        </label>
        <div>
          {state?.errors?.firstName &&
            state.errors.firstName.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
        </div>
        <label>
          Last Name
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Enter your last name"
            className={styles.inputItem}
          />
        </label>
        <div>
          {state?.errors?.lastName &&
            state.errors.lastName.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
        </div>
        <label>
          Email
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            className={styles.inputItem}
          />
        </label>
        <div>
          {state?.errors?.email &&
            state.errors.email.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
        </div>
        <label>
          Password
          <input
            id="password"
            name="password"
            type="password"
            required
            min={6}
            placeholder="Enter your password"
            className={styles.inputItem}
          />
        </label>
        <div>
          {state?.errors?.password &&
            state.errors.password.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
        </div>
        <input className={styles.submitButton} type="submit" />
        <div>
          {!state.success && (
            <>
              <p>{state.message}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}
