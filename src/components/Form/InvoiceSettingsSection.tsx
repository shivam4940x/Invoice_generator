/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AnimatedInput, AnimatedSelect } from "../util/Input";
import type { InvoiceData } from "../../types";

interface Props {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const InvoiceSettingsSection: React.FC<Props> = ({
  invoiceData,
  setInvoiceData,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [section, field] = e.target.name.split(".");
    const value = e.target.value;

    if (!field) {
      // For flat fields like poNumber
      if (e.target.name === "poNumber") {
        setInvoiceData((prev) => ({
          ...prev,
          poNumber: parseInt(value || "0"),
        }));
      }
      return;
    }

    setInvoiceData((prev) => {
      if (
        section === "from" ||
        section === "to" ||
        section === "invoice" ||
        section === "amount" ||
        section === "BankTransfer"
      ) {
        return {
          ...prev,
          [section]: {
            ...(prev[section] as any),
            [field]: value,
          },
        };
      }

      return prev;
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "status" || name === "currency" || name === "paymentMethod") {
      setInvoiceData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="invoice-settings mt-8">
      <div className="mb-8 border-b border-forground/60 py-1">
        <h4 className="text-lg font-semibold">Invoice Settings</h4>
      </div>

      <div className="grid grid-cols-2 gap-5 p-1">
        <AnimatedInput
          label="PO Number"
          name="poNumber"
          value={invoiceData.poNumber?.toString() || ""}
          onChange={handleInputChange}
        />

        <AnimatedSelect
          label="Status"
          name="status"
          value={invoiceData.status}
          onChange={handleSelectChange}
          options={[
            { label: "Paid", value: "paid" },
            { label: "Pending", value: "pending" },
          ]}
        />

        <AnimatedSelect
          label="Currency"
          name="currency"
          value={invoiceData.currency}
          onChange={handleSelectChange}
          options={[
            { label: "INR (₹)", value: "INR" },
            { label: "USD ($)", value: "USD" },
          ]}
        />

        <AnimatedSelect
          label="Payment Method"
          name="paymentMethod"
          value={invoiceData.paymentMethod}
          onChange={handleSelectChange}
          options={[
            { label: "PayPal", value: "PayPal" },
            { label: "Buy me coffee", value: "Buy me coffee" },
            { label: "UPI", value: "upi" },
            { label: "Bank Transfer", value: "Bank Transfer" },
          ]}
        />

        {invoiceData.paymentMethod === "Bank Transfer" && (
          <>
            <AnimatedInput
              label="IFSC Code"
              name="BankTransfer.IFSC"
              value={invoiceData.BankTransfer?.IFSC || ""}
              onChange={handleInputChange}
            />
            <AnimatedInput
              label="Bank Account Number"
              name="BankTransfer.number"
              value={invoiceData.BankTransfer?.number || ""}
              onChange={handleInputChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceSettingsSection;
