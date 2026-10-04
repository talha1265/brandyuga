import { NextResponse } from 'next/server';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const authenticated = await checkAdminSession();
  return NextResponse.json({ authenticated, email: authenticated ? (process.env.ADMIN_EMAIL || 'admin@brandyuga.in') : null });
}
