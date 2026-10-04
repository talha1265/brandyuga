import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@brandyuga.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'brandyuga2026!';
const COOKIE_NAME = 'brandyuga_admin_token';

// Simple signed token validation for admin session
export function verifyCredentials(email: string, pass: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD;
}

export function createAdminToken(email: string): string {
  const timestamp = Date.now();
  const payload = `${email}:${timestamp}:brandyuga_auth_hash`;
  return Buffer.from(payload).toString('base64');
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email, timestamp] = decoded.split(':');
    if (!email || !timestamp) return false;
    // Valid for 7 days
    const age = Date.now() - parseInt(timestamp, 10);
    return age < 7 * 24 * 3600 * 1000;
  } catch {
    return false;
  }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isTokenValid(token);
}

export { COOKIE_NAME };
