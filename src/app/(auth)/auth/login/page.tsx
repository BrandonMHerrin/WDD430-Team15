import LoginForm from "@/app/(auth)/auth/login/components/login-form/login-form";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <section className={styles.container}>
      <h1>Login</h1>
      <LoginForm />
      <br />
      <hr />
      <br />
      <p>No account? Create one now.</p>
      <Link className={styles.link} href="/auth/newuser">
        Create Account
      </Link>
      <br />
      <br />
      <hr />
      <br />
      <p>Want to return to the home page? Click <Link href={'/'} className={styles.link}>here</Link>.</p>
    </section>
  );
}
