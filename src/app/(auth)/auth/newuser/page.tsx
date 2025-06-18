import styles from "./page.module.css";

import CreateUserForm from "@/app/(auth)/auth/newuser/components/create-user-form/create-user-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account to start exploring our products",
}

export default function NewUserPage() {
  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <CreateUserForm />
      <br />
      <hr />
      <br />
      <p>Already have an account? Log in now.</p>
      <Link className={styles.link} href="/auth/login">
        Log In
      </Link>
      <br />
    </>
  )
}