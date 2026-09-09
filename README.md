# Checkout UI Fragment (`checkout-ui`)

> **Micro-Frontend (MFE) Multi-Step Checkout & Order Receipt Fragment**

`checkout-ui` handles customer contact, shipping address, appliance delivery options, payment tokenization, and post-purchase order confirmation receipt.

---

## 🎯 Features

1. **Multi-Step Guided Flow:** Address $\rightarrow$ Delivery $\rightarrow$ Payment $\rightarrow$ Confirmation.
2. **Order Finalization:** Connects to `order-service` (Port 8004) to submit customer orders.
3. **Zero-Error Fitment Badge:** Displays active fitment protection guarantee on confirmed receipts.

---

## 🚀 Development

```bash
npm install
npm run dev     # Runs dev server on port 5178
npm run build   # Compiles standalone MFE bundle
```
