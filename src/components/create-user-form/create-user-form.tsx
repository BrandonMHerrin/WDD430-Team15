import { createUser } from "@/lib/actions";
import { useActionState } from "react";
import styles from './create-user-form.module.css'

export default function CreateUserForm() {
    const [errorMessage, formAction, isPending] = useActionState(
      createUser,
      undefined
    );

    return (
      <form action={formAction}>
        <label>
          First Name
          <input
            id="fname"
            name="fname"
            type="text"
            required
            placeholder="Enter your first name"
            className={styles.inputItem}
          />
        </label>
        <label>
          Last Name
          <input
            id="lname"
            name="lname"
            type="text"
            required
            placeholder="Enter your last name"
            className={styles.inputItem}
          />
        </label>
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
        <input
          className={styles.submitButton}
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
        />
        <div>
          {errorMessage && (
            <>
              <p>{errorMessage.message}</p>
            </>
          )}
        </div>
      </form>
    );
}