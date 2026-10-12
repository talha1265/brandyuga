import { NextRequest, NextResponse } from 'next/server';
import { updateSubscriptionStatus } from '@/lib/db';
import { verifyPayUResponseHash, getPayUConfig } from '@/lib/payu';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const status = data.status || 'failed';
    const txnid = data.txnid || '';
    const mihpayid = data.mihpayid || '';
    const config = getPayUConfig();

    if (!txnid) {
      const origin = req.nextUrl.origin;
      return NextResponse.redirect(`${origin}/subscription/status?error=missing_txnid`, 303);
    }

    // Verify hash integrity
    const verification = verifyPayUResponseHash(data, config.salt);

    let finalStatus: 'success' | 'failed' = 'failed';
    if (status.toLowerCase() === 'success' && verification.isValid) {
      finalStatus = 'success';
    } else if (status.toLowerCase() === 'success' && !config.isLiveConfigured) {
      // In sandbox/test environment with test keys, allow if status is success
      finalStatus = 'success';
    }

    // Update database
    await updateSubscriptionStatus(
      txnid,
      finalStatus,
      mihpayid,
      config.mode
    );

    const origin = req.nextUrl.origin;
    const redirectUrl = new URL(`${origin}/subscription/status`);
    redirectUrl.searchParams.set('txnid', txnid);
    redirectUrl.searchParams.set('status', finalStatus);
    if (mihpayid) redirectUrl.searchParams.set('payuid', mihpayid);
    if (data.bank_ref_num) redirectUrl.searchParams.set('bankref', data.bank_ref_num);

    return NextResponse.redirect(redirectUrl.toString(), 303);
  } catch (error) {
    console.error('PayU callback handling error:', error);
    const origin = req.nextUrl.origin;
    return NextResponse.redirect(`${origin}/subscription/status?status=failed&error=server_error`, 303);
  }
}
