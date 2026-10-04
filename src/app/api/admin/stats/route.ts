import { NextResponse } from 'next/server';
import { getAdminStats } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = await getAdminStats();
  return NextResponse.json({ stats });
}
