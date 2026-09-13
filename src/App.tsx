import React, { useState } from 'react';
import { CheckoutFragment } from './components/CheckoutFragment';
import { OrderReceipt } from './types';
import { ShieldCheck, RotateCcw, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);
  const [lastReceipt, setLastReceipt] = useState<OrderReceipt | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    setLastReceipt(null);
    showToast('Reset checkout form to default state');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur bg-white/95">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-2">
              Checkout UI Fragment
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                Standalone Mode
              </span>
            </span>
            <p className="text-[11px] text-slate-500">MFE Development Harness</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastReceipt && (
            <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-lg font-bold">
              Last Order: {lastReceipt.order_number}
            </span>
          )}
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full font-semibold">
            Port 5178
          </span>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        <CheckoutFragment
          key={resetKey}
          cartId="cart_active_session"
          onOrderComplete={(receipt) => {
            setLastReceipt(receipt);
            showToast(`Order ${receipt.order_number} confirmed!`);
          }}
          onReturnToShopping={() => {
            handleReset();
            showToast('Return to shopping initiated');
          }}
        />
      </main>
    </div>
  );
};

export default App;

