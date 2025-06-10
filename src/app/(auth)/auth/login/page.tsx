
import LoginForm from '@/components/login-form/login-form';
import styles from './page.module.css';
import { Suspense } from 'react';
import Link from 'next/link';

export default function LoginPage () {
  return (
    <section className={styles.container}>
      <h1>Login</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
      <br />
      <hr />
      <br />
      <p>
        No account? Create one now.
      </p>
      <Link href="/auth/newuser">Create Account</Link>

    </section>
  )
}