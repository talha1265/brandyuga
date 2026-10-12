import crypto from 'crypto';

export interface PayUInitiateParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  service_provider?: string;
}

export function getPayUConfig() {
  const mode: 'live' | 'test' =
    process.env.PAYU_MODE === 'prod' || process.env.PAYU_MODE === 'live' ? 'live' : 'test';
  // Use user's key/salt if provided; otherwise fallback to PayU standard official test credentials
  const key = process.env.PAYU_MERCHANT_KEY || 'gtKFFx';
  const salt = process.env.PAYU_MERCHANT_SALT || 'eCwWELxi';
  const actionUrl =
    mode === 'live'
      ? 'https://secure.payu.in/_payment'
      : 'https://test.payu.in/_payment';

  const isLiveConfigured =
    Boolean(process.env.PAYU_MERCHANT_KEY) &&
    process.env.PAYU_MERCHANT_KEY !== 'gtKFFx' &&
    Boolean(process.env.PAYU_MERCHANT_SALT);

  return {
    mode,
    key,
    salt,
    actionUrl,
    isLiveConfigured,
  };
}

/**
 * Generate SHA-512 Hash for PayU hosted checkout request
 * Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 */
export function generatePayUHash(params: {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  salt: string;
}): string {
  const udf1 = params.udf1 || '';
  const udf2 = params.udf2 || '';
  const udf3 = params.udf3 || '';
  const udf4 = params.udf4 || '';
  const udf5 = params.udf5 || '';

  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${params.salt}`;

  return crypto.createHash('sha512').update(hashString).digest('hex').toLowerCase();
}

/**
 * Verify PayU response callback reverse hash
 * If additionalCharges: sha512(additionalCharges|salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 * Else: sha512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyPayUResponseHash(
  formData: Record<string, string>,
  salt: string
): { isValid: boolean; calculatedHash: string; receivedHash: string } {
  const status = formData.status || '';
  const firstname = formData.firstname || '';
  const amount = formData.amount || '';
  const txnid = formData.txnid || '';
  const key = formData.key || '';
  const productinfo = formData.productinfo || '';
  const email = formData.email || '';
  const udf1 = formData.udf1 || '';
  const udf2 = formData.udf2 || '';
  const udf3 = formData.udf3 || '';
  const udf4 = formData.udf4 || '';
  const udf5 = formData.udf5 || '';
  const receivedHash = (formData.hash || '').toLowerCase();
  const additionalCharges = formData.additionalCharges;

  let hashSequence = '';
  if (additionalCharges) {
    hashSequence = `${additionalCharges}|${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  } else {
    hashSequence = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  }

  const calculatedHash = crypto
    .createHash('sha512')
    .update(hashSequence)
    .digest('hex')
    .toLowerCase();

  return {
    isValid: calculatedHash === receivedHash,
    calculatedHash,
    receivedHash,
  };
}
