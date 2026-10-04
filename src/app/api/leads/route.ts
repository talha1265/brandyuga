import { NextRequest, NextResponse } from 'next/server';
import { getLeads, createLead, updateLeadStatus, deleteLead } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  let leads = await getLeads();
  if (type) {
    leads = leads.filter(l => l.type === type);
  }
  if (status) {
    leads = leads.filter(l => l.status === status);
  }

  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, type, service, details, referrer_name, referrer_phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    const lead = await createLead({
      type: type || 'contact',
      name: name.trim(),
      email: email ? email.trim() : '',
      phone: phone.trim(),
      service: service || '',
      details: details || '',
      referrer_name: referrer_name || '',
      referrer_phone: referrer_phone || '',
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to submit lead inquiry.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing lead ID or status' }, { status: 400 });
    }

    const updated = await updateLeadStatus(id, status);
    return NextResponse.json({ success: updated });
  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing lead ID' }, { status: 400 });
  }

  const deleted = await deleteLead(id);
  return NextResponse.json({ success: deleted });
}
