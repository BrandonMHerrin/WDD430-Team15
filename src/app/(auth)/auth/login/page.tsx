import LoginForm from "@/components/login-form/login-form";
import styles from "./page.module.css";
import Link from "next/link";

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
    </section>
  );
}
