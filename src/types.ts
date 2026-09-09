export interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export interface ShippingAddress {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  brand?: string;
  quantity: number;
  price_cents: number;
  total_cents: number;
  dimensions_summary?: string;
  fitment_verified: boolean;
}

export interface OrderReceipt {
  order_id: string;
  order_number: string;
  status: string;
  created_at: string;
  estimated_delivery: string;
  customer: CustomerInfo;
  shipping_address: ShippingAddress;
  delivery_method: string;
  items: OrderItem[];
  subtotal_cents: int;
  tax_cents: int;
  shipping_cents: int;
  grand_total_cents: int;
  currency: string;
  fitment_guarantee_active: boolean;
}

type int = number;
