'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import { SubscriptionOrder } from '@/types';

function StatusContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid') || '';
  const initialStatus = searchParams.get('status') || '';
  const payuid = searchParams.get('payuid') || '';

  const [order, setOrder] = useState<SubscriptionOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    if (!txnid) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/subscriptions?txnid=${txnid}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.subscription);
          if (data.subscription?.status === 'success' || initialStatus === 'success') {
            triggerConfetti();
          }
        }
      } catch (e) {
        console.error('Failed to fetch subscription order:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [txnid, initialStatus]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti not supported
    }
  };

  const handleSimulatePayment = async (status: 'success' | 'failed') => {
    if (!txnid) return;
    setSimulating(true);
    try {
      const res = await fetch('/api/payu/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txnid, simulateStatus: status }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status: data.status,
                payuPaymentId: data.payuPaymentId,
                paymentDate: new Date().toISOString(),
              }
            : null
        );
        if (status === 'success') triggerConfetti();
      }
    } catch (e) {
      console.error('Simulation error:', e);
    } finally {
      setSimulating(false);
    }
  };

  const isSuccess =
    (order && order.status === 'success') || initialStatus.toLowerCase() === 'success';

  const isFailed =
    (order && order.status === 'failed') ||
    initialStatus.toLowerCase() === 'failed' ||
    initialStatus.toLowerCase() === 'failure';

  const isPending = !isSuccess && !isFailed;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Verifying transaction details with PayU...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Status Header Card */}
      <div
        className={`rounded-3xl border p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center ${
          isSuccess
            ? 'bg-gradient-to-b from-emerald-950/20 to-[#070b1a] border-emerald-500/30'
            : isFailed
            ? 'bg-gradient-to-b from-red-950/20 to-[#070b1a] border-red-500/30'
            : 'bg-[#070b1a] border-white/10'
        }`}
      >
        {/* Glow */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
            isSuccess ? 'bg-emerald-500/15' : isFailed ? 'bg-red-500/15' : 'bg-purple-500/15'
          }`}
        />

        {/* Icon */}
        <div className="mx-auto mb-5">
          {isSuccess ? (
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          ) : isFailed ? (
            <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center text-red-400 mx-auto shadow-[0_0_30px_rgba(239,68,68,0.4)]">
              <XCircle className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500/40 flex items-center justify-center text-yellow-400 mx-auto shadow-[0_0_30px_rgba(234,179,8,0.4)]">
              <Clock className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Status Text */}
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {isSuccess
            ? 'Subscription Activated!'
            : isFailed
            ? 'Payment Not Completed'
            : 'Payment Status Pending'}
        </h1>

        <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
          {isSuccess
            ? 'Thank you for choosing BrandYuga! Your 3-Month Marketplace growth sprint is now officially locked in.'
            : isFailed
            ? 'The transaction was declined by the bank or cancelled. No charges were permanently captured.'
            : 'We are awaiting final confirmation from the PayU payment network.'}
        </p>

        {/* Transaction Summary Box */}
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs sm:text-sm space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-slate-400">Transaction ID (TxnID)</span>
            <span className="font-mono font-bold text-white">{txnid || 'N/A'}</span>
          </div>

          {(order?.payuPaymentId || payuid) && (
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400">PayU Payment ID</span>
              <span className="font-mono text-purple-300">{order?.payuPaymentId || payuid}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-slate-400">Selected Plan</span>
            <span className="font-bold text-white">
              {order?.planName || '3-Month Marketplace Management Plan'}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-slate-400">Platforms</span>
            <span className="font-semibold text-emerald-400">
              {order?.platforms?.join(' + ') || 'Amazon India + Flipkart (+ Meesho)'}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-slate-400">Customer Name</span>
            <span className="text-white">{order?.customerName || 'Brand Partner'}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400">Total Amount</span>
            <span className="text-lg font-black text-white">
              ₹{(order?.amount || (txnid.includes('TRIO') ? 18000 : 12000)).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Developer / Sandbox Simulation Widget (if order is in test/initiated state) */}
        {isPending && (
          <div className="mt-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300">Sandbox Testing Actions:</span>
              <span className="text-[10px] text-slate-400">Developer Mode</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Test the end-to-end receipt flow right now:
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleSimulatePayment('success')}
                disabled={simulating}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Simulate Successful Payment
              </button>
              <button
                onClick={() => handleSimulatePayment('failed')}
                disabled={simulating}
                className="px-3 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-200 text-xs font-medium border border-red-500/30 transition-colors"
              >
                Simulate Failure
              </button>
            </div>
          </div>
        )}

        {/* Next Steps for Success */}
        {isSuccess && (
          <div className="mt-8 text-left space-y-3 p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              What Happens Next? (Immediate Onboarding)
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <strong className="text-white">Account Manager Introduction:</strong> Your designated Senior Growth Manager will reach out via WhatsApp within 2 hours.
              </li>
              <li>
                <strong className="text-white">Child Delegated Permissions:</strong> We will provide step-by-step instructions to add our secure specialist email to your Amazon, Flipkart, and Meesho panels (Zero master passwords needed).
              </li>
              <li>
                <strong className="text-white">Catalog Audit &amp; Kick-off:</strong> Comprehensive keyword harvest and listing optimization will begin within 24 hours.
              </li>
            </ol>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {isSuccess ? (
            <>
              <a
                href={`https://wa.me/918853066278?text=${encodeURIComponent(
                  `Hi BrandYuga Team! I have completed my 3-Month Subscription payment (TxnID: ${txnid}). Please connect me with my growth specialist.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect with Growth Desk on WhatsApp</span>
              </a>

              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-purple-400" />
                <span>Print / Save Receipt</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/subscription"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again / Choose Plan</span>
              </Link>

              <a
                href="https://wa.me/918853066278"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Need Help? Chat on WhatsApp</span>
              </a>
            </>
          )}

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionStatusPage() {
  return (
    <div className="pt-28 pb-20">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-sm">
            Loading receipt...
          </div>
        }
      >
        <StatusContent />
      </Suspense>
    </div>
  );
}
