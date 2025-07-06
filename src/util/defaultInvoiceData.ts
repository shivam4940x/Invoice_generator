// src/data/defaultInvoiceData.ts
import type { InvoiceData } from "../types";
import { DefaultValues, prefix } from "../Default.json";
const generateInvoiceId = (): string => {
  return prefix + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const defaultInvoiceData: InvoiceData = {
  ...DefaultValues,
  invoice: {
    ...DefaultValues.invoice,
    id: generateInvoiceId(),
  },
  uid:'',
  status: DefaultValues.status as "pending" | "paid",
  currency: DefaultValues.currency as "INR" | "USD",
  paymentMethod: DefaultValues.paymentMethod as
    | "PayPal"
    | "Buy me coffee"
    | "upi"
    | "Bank Transfer",
  createdAt: new Date(DefaultValues.createdAt),
  poNumber: DefaultValues.poNumber ?? undefined,
};

export default defaultInvoiceData;
