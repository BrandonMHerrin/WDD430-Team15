"use client";

import { authenticate } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import styles from "./login-form.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => router.push("/"), 1000);
    }
  }, [state?.success, router]);

  return (
    <>
      {state?.success && (<p>Successfully logged in!</p>)}
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
        <input className={styles.submitButton} type="submit" />
        <div>
          {!state?.success && (
            <>
              <p>{state?.message}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}
