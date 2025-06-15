import * as argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,  // 64MB
    timeCost: 3,          // three iterations
    parallelism: 1        // single=threaded
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await argon2.verify(hash, password);
}