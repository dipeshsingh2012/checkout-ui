import React from 'react';
import { CheckoutFragment } from './components/CheckoutFragment';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <span className="font-extrabold text-slate-900">
          Checkout UI Fragment Harness
        </span>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
          Port 5178
        </span>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <CheckoutFragment
          cartId="cart_active_session"
          onOrderComplete={(receipt) => console.log('Order finished:', receipt)}
          onReturnToShopping={() => alert('Return to shopping clicked')}
        />
      </main>
    </div>
  );
};

export default App;
