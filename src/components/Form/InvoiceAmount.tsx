import React from "react";
import { AnimatedInput } from "../util/Input";
import type { InvoiceAmount as InvoiceAmountType } from "../../types";
import getCurrencySymbol from "../../util/getCurrencySymbo";

interface Props {
  amount: InvoiceAmountType;
  currency: "INR" | "USD";
  onChange: (updated: InvoiceAmountType) => void;
}

const InvoiceAmount: React.FC<Props> = ({ amount, currency, onChange }) => {
  const symbol = getCurrencySymbol(currency);

  const handleNumericInput = (name: keyof InvoiceAmountType, value: string) => {
    const parsed = parseFloat(value || "0");

    const updated = {
      ...amount,
      [name]: parsed,
    };

    updated.total = updated.subtotal - updated.discount;
    updated.pending = updated.total - updated.paid;

    onChange(updated);
  };

  return (
    <div className="invoice-amount mt-8">
      <div className="mb-8 border-b border-forground/60 py-1">
        <h4 className="text-lg font-semibold">Invoice Summary</h4>
      </div>
      <div className="grid grid-cols-2 gap-5 p-1">
        <AnimatedInput
          label="Subtotal"
          name="amount.subtotal"
          value={`${symbol}${amount.subtotal.toLocaleString(
            currency === "INR" ? "en-IN" : "en-US"
          )}`}
          onChange={() => {}}
          className="pointer-events-none opacity-60"
          type="text"
        />

        <AnimatedInput
          label="Discount"
          name="amount.discount"
          value={amount.discount.toString()}
          onChange={(e) => handleNumericInput("discount", e.target.value)}
          type="text"
        />

        <AnimatedInput
          label="Total"
          name="amount.total"
          value={`${symbol}${amount.total.toLocaleString(
            currency === "INR" ? "en-IN" : "en-US"
          )}`}
          onChange={() => {}}
          className="pointer-events-none opacity-60"
          type="text"
        />

        <AnimatedInput
          label="Paid"
          name="amount.paid"
          value={amount.paid.toString()}
          onChange={(e) => handleNumericInput("paid", e.target.value)}
          type="text"
        />

        <AnimatedInput
          label="Pending"
          name="amount.pending"
          value={`${amount.pending.toFixed(2)}`}
          onChange={() => {}}
          className="pointer-events-none opacity-60"
          type="text"
        />
      </div>
    </div>
  );
};

export default InvoiceAmount;
