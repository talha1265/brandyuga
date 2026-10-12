import { NextRequest, NextResponse } from 'next/server';
import { updateSubscriptionStatus, getSubscriptionByTxnId } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { txnid, simulateStatus } = await req.json();

    if (!txnid) {
      return NextResponse.json({ error: 'Transaction ID is required.' }, { status: 400 });
    }

    const sub = await getSubscriptionByTxnId(txnid);
    if (!sub) {
      return NextResponse.json({ error: 'Subscription order not found.' }, { status: 404 });
    }

    const status = simulateStatus === 'failed' ? 'failed' : 'success';
    const fakePayUId = 'PAYU_TEST_' + Math.floor(10000000 + Math.random() * 90000000);

    await updateSubscriptionStatus(txnid, status, fakePayUId, 'simulated');

    return NextResponse.json({
      success: true,
      status,
      txnid,
      payuPaymentId: fakePayUId,
    });
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json({ error: 'Simulation failed' }, { status: 500 });
  }
}
