'use server';
const { signOut } = await import('auth');

export async function handleLogout(pathname: string): Promise<void> {
  await signOut({ redirect:  true, redirectTo: pathname });
}