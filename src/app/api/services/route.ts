import { NextRequest, NextResponse } from 'next/server';
import { getServices, updateService } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const services = await getServices();
  return NextResponse.json({ services });
}

export async function PUT(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const service = await req.json();
    if (!service.id || !service.title) {
      return NextResponse.json({ error: 'Invalid service data' }, { status: 400 });
    }
    const updated = await updateService(service);
    return NextResponse.json({ success: updated });
  } catch (error) {
    console.error('Service update error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
