import { NextRequest, NextResponse } from 'next/server';
import { createSubscription } from '@/lib/db';
import { generatePayUHash, getPayUConfig } from '@/lib/payu';
import { SubscriptionPlanId } from '@/types';

const PLANS: Record<
  SubscriptionPlanId,
  { name: string; amount: number; platforms: string[]; durationMonths: number }
> = {
  marketplace_duo_3m: {
    name: '3-Month Marketplace Duo (Amazon + Flipkart)',
    amount: 12000,
    platforms: ['Amazon', 'Flipkart'],
    durationMonths: 3,
  },
  marketplace_trio_3m: {
    name: '3-Month Marketplace Trio (Amazon + Flipkart + Meesho)',
    amount: 18000,
    platforms: ['Amazon', 'Flipkart', 'Meesho'],
    durationMonths: 3,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      planId,
      customerName,
      customerEmail,
      customerPhone,
      brandName,
      gstNumber,
    } = body;

    if (!planId || !PLANS[planId as SubscriptionPlanId]) {
      return NextResponse.json({ error: 'Invalid subscription plan selected.' }, { status: 400 });
    }

    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const plan = PLANS[planId as SubscriptionPlanId];
    const amountStr = plan.amount.toFixed(2);
    const txnid = `BYUGA_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Resolve base URL for callback URLs
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get('origin') ||
      req.nextUrl.origin ||
      'https://brandyuga.in';

    const surl = `${origin}/api/payu/callback`;
    const furl = `${origin}/api/payu/callback`;

    const config = getPayUConfig();

    // Generate PayU SHA-512 Hash
    const hash = generatePayUHash({
      key: config.key,
      txnid,
      amount: amountStr,
      productinfo: plan.name,
      firstname: customerName.trim().split(' ')[0],
      email: customerEmail.trim(),
      udf1: planId,
      udf2: brandName ? brandName.trim() : 'BrandYuga_Client',
      udf3: customerPhone.trim(),
      udf4: 'Marketplace_Subscription_3M',
      udf5: config.mode,
      salt: config.salt,
    });

    // Save subscription in DB
    const subscription = await createSubscription({
      txnid,
      planId: planId as SubscriptionPlanId,
      planName: plan.name,
      platforms: plan.platforms,
      durationMonths: plan.durationMonths,
      amount: plan.amount,
      currency: 'INR',
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      brandName: brandName?.trim() || '',
      gstNumber: gstNumber?.trim() || '',
      status: 'initiated',
      payuMode: config.mode,
    });

    return NextResponse.json({
      success: true,
      txnid,
      subscriptionId: subscription.id,
      payuParams: {
        key: config.key,
        txnid,
        amount: amountStr,
        productinfo: plan.name,
        firstname: customerName.trim().split(' ')[0],
        email: customerEmail.trim(),
        phone: customerPhone.trim(),
        surl,
        furl,
        hash,
        udf1: planId,
        udf2: brandName ? brandName.trim() : 'BrandYuga_Client',
        udf3: customerPhone.trim(),
        udf4: 'Marketplace_Subscription_3M',
        udf5: config.mode,
        service_provider: 'payu_paisa',
      },
      actionUrl: config.actionUrl,
      mode: config.mode,
      isLiveConfigured: config.isLiveConfigured,
    });
  } catch (error) {
    console.error('PayU Initiate error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate PayU payment transaction.' },
      { status: 500 }
    );
  }
}
