"use client";

import { authenticate } from "@/lib/actions";
import { useActionState } from "react";
import styles from './login-form.module.css'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form className={styles.form} action={formAction}>
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
      <input className={styles.submitButton} type="submit" disabled={isPending} aria-disabled={isPending} />
      <div>
        {errorMessage && (
          <>
            <p>{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
