import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutFragment } from '../components/CheckoutFragment';

const meta: Meta<typeof CheckoutFragment> = {
  title: 'Fragments/CheckoutFragment',
  component: CheckoutFragment,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    cartId: { control: 'text' },
    onOrderComplete: { action: 'orderCompleted' },
    onReturnToShopping: { action: 'returnToShoppingClicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutFragment>;

export const DefaultCheckout: Story = {
  args: {
    cartId: 'cart_active_session',
    onOrderComplete: (receipt) => console.log('Order complete callback received:', receipt),
    onReturnToShopping: () => console.log('Return to shopping clicked'),
  },
};

export const CustomCartSession: Story = {
  args: {
    cartId: 'cart_premium_dual_boiler_bundle',
    onOrderComplete: (receipt) => console.log('Order complete:', receipt),
    onReturnToShopping: () => console.log('Return to shopping clicked'),
  },
};
