"use client";

import styles from "./page.module.css";

import CreateUserForm from "@/app/(auth)/auth/newuser/components/create-user-form/create-user-form";
import Link from "next/link";

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