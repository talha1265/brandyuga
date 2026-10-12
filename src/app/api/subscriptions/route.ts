import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptions, getSubscriptionByTxnId } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const txnid = searchParams.get('txnid');

  // If fetching by specific transaction ID, return subscription details (for customer receipt)
  if (txnid) {
    const subscription = await getSubscriptionByTxnId(txnid);
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }
    return NextResponse.json({ subscription });
  }

  // Otherwise, require admin session to list all subscriptions
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscriptions = await getSubscriptions();
  return NextResponse.json({ subscriptions });
}
