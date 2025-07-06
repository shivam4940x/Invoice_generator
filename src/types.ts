// types.ts

export interface InvoiceItem {
  description: string;
  quantity: string;
  price: string;
  tax: string; // lowercase for consistency
  total: string; // (price * quantity) + tax
}

interface Client {
  name: string;
  billingAddress: string;
  email: string;
  mobile?: string;
}
interface Payable {
  name: string;
  email: string;
  mobile?: string;
  payAt: string;
}
interface InvoiceMetadata {
  id: string;
  date: string; // ISO format recommended (YYYY-MM-DD)
}

export interface InvoiceAmount {
  subtotal: number;
  total: number;
  discount: number;
  paid: number;
  pending: number;
}

interface BankTransfer {
  IFSC: string;
  number: string;
}

export interface InvoiceData {
  from: Payable;
  to: Client;
  invoice: InvoiceMetadata;
  items: InvoiceItem[];
  amount: InvoiceAmount;
  BankTransfer?: BankTransfer;

  due: string;
  deliveryExpected: string;
  tax: string;
  totalTax: number;

  status: "paid" | "pending";
  notes: string;
  note: string;

  terms: string;
  poNumber?: number;

  currency: "INR" | "USD";
  paymentMethod: "PayPal" | "Buy me coffee" | "upi" | "Bank Transfer";
  createdAt: Date;
  uid: string;
}
