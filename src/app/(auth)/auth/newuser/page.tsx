"use client";

import CreateUserForm from "@/components/create-user-form/create-user-form";
import { Suspense } from "react";

export default function NewUserPage() {
  return (
    <>
      <h1>Sign Up</h1>
      <Suspense>
        <CreateUserForm />
      </Suspense>
    </>
  )
}