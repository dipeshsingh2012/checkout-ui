import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  PackageCheck,
  Calendar,
} from 'lucide-react';
import {
  ProtonThemeProvider,
  ProtonInput,
  ProtonButton,
  ProtonCard,
  ProtonStatusBadge,
} from '@dipeshsingh2012/proton/react';
import { submitOrder } from '../api';
import { CustomerInfo, OrderReceipt, ShippingAddress } from '../types';

interface CheckoutFragmentProps {
  cartId?: string;
  onOrderComplete?: (receipt: OrderReceipt) => void;
  onReturnToShopping?: () => void;
}

export const CheckoutFragment: React.FC<CheckoutFragmentProps> = ({
  cartId = 'cart_active_session',
  onOrderComplete,
  onReturnToShopping,
}) => {
  const [customer, setCustomer] = useState<CustomerInfo>({
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 234-5678',
  });

  const [address, setAddress] = useState<ShippingAddress>({
    street: '100 North Michigan Ave',
    apartment: 'Apt 4B',
    city: 'Chicago',
    state: 'IL',
    postal_code: '60611',
    country: 'United States',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'white_glove' | 'standard'>('white_glove');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = await submitOrder({
        cart_id: cartId,
        customer,
        shipping_address: address,
        delivery_method: deliveryMethod,
        payment_method: 'card',
      });
      setReceipt(order);
      onOrderComplete?.(order);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Confirmed View
  if (receipt) {
    return (
      <ProtonThemeProvider>
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8">
          <ProtonCard variant="elevated" padding="lg" className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <PackageCheck className="w-8 h-8" />
            </div>

            <div>
              <ProtonStatusBadge status="success" pulse label="Order Confirmed & Placed" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Thank You, {receipt.customer.first_name}!
            </h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your order has been recorded. A confirmation email has been sent to{' '}
              <span className="font-semibold text-slate-700">{receipt.customer.email}</span>.
            </p>

            <div className="inline-block p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 font-bold">
              Order Number: {receipt.order_number}
            </div>

            {/* Delivery estimate & Fitment Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-left">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" /> Estimated Delivery
                </span>
                <span className="font-bold text-sm text-slate-900">{receipt.estimated_delivery}</span>
                <span className="text-[11px] text-slate-500 block">White-Glove Inside Delivery</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Fitment Guarantee Active
                </span>
                <span className="font-bold text-sm text-emerald-900">100% Guaranteed Fit</span>
                <span className="text-[11px] text-emerald-700 block">
                  Free return if verified appliance doesn't fit your counter.
                </span>
              </div>
            </div>

            <div className="pt-6">
              <ProtonButton
                variant="primary"
                onClick={onReturnToShopping}
              >
                Continue Shopping
              </ProtonButton>
            </div>
          </ProtonCard>
        </div>
      </ProtonThemeProvider>
    );
  }

  // Checkout Form View
  return (
    <ProtonThemeProvider>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Encrypted Checkout Session
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Customer Info */}
            <ProtonCard variant="outlined" padding="md">
              <h3 className="text-sm font-bold text-slate-900 mb-4">1. Customer Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ProtonInput
                  label="First Name"
                  value={customer.first_name}
                  onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
                />
                <ProtonInput
                  label="Last Name"
                  value={customer.last_name}
                  onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
                />
                <div className="sm:col-span-2">
                  <ProtonInput
                    label="Email"
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  />
                </div>
              </div>
            </ProtonCard>

            {/* Step 2: Shipping Address */}
            <ProtonCard variant="outlined" padding="md">
              <h3 className="text-sm font-bold text-slate-900 mb-4">2. Delivery Address</h3>
              <div className="space-y-3">
                <ProtonInput
                  label="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />

                <div className="grid grid-cols-3 gap-3">
                  <ProtonInput
                    label="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  <ProtonInput
                    label="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  />
                  <ProtonInput
                    label="Postal Code"
                    value={address.postal_code}
                    onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
                  />
                </div>
              </div>
            </ProtonCard>

            {/* Step 3: Delivery Options */}
            <ProtonCard variant="outlined" padding="md">
              <h3 className="text-sm font-bold text-slate-900 mb-3">3. Appliance Delivery Method</h3>
              <div
                onClick={() => setDeliveryMethod('white_glove')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-colors ${
                  deliveryMethod === 'white_glove'
                    ? 'border-amber-700 bg-amber-50/40'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-amber-700" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">White-Glove Inside Delivery</h4>
                    <p className="text-[11px] text-slate-500">
                      Includes room-of-choice placement and debris removal.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">FREE</span>
              </div>
            </ProtonCard>

            {/* Step 4: Payment */}
            <ProtonCard variant="outlined" padding="md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">4. Payment</h3>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CreditCard className="w-4 h-4" /> Card Payment
                </span>
              </div>

              <div className="space-y-3">
                <ProtonInput
                  label="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <ProtonInput
                    label="Expiration"
                    value="12/28"
                  />
                  <ProtonInput
                    label="CVC"
                    value="842"
                  />
                </div>
              </div>
            </ProtonCard>
          </div>

          {/* Right Column: Order Summary & Submit Button */}
          <div className="lg:col-span-4 space-y-4">
            <ProtonCard variant="outlined" padding="lg" className="sticky top-24">
              <h3 className="text-base font-bold text-slate-900">Order Total</h3>

              <div className="space-y-2.5 text-xs text-slate-600 mt-4">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-800">$999.95</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Delivery</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-slate-800">$79.99</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Grand Total</span>
                  <span className="text-2xl font-black text-slate-900">$1,079.94</span>
                </div>
              </div>

              <div className="mt-5">
                <ProtonButton
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  endIcon={<ArrowRight style={{ width: 16, height: 16 }} />}
                >
                  Authorize & Place Order
                </ProtonButton>
              </div>

              <div className="pt-4 text-[11px] text-slate-500 space-y-1.5 border-t border-slate-100 mt-4">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero-Error Fitment Guarantee Protection</span>
                </div>
              </div>
            </ProtonCard>
          </div>
        </form>
      </div>
    </ProtonThemeProvider>
  );
};
export default CheckoutFragment;
