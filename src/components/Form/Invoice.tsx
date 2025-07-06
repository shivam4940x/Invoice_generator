import React from "react";
import { AnimatedInput, AnimatedDateInput } from "../util/Input";
import type { InvoiceData } from "../../types";

interface Props {
  invoiceData: InvoiceData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceDetails: React.FC<Props> = ({ invoiceData, handleChange }) => {
  return (
    <div className="invoice mt-8">
      <div className="mb-8 border-b border-forground/60 py-1">
        <h4 className="text-lg font-semibold">Invoice Details</h4>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 p-1">
        <AnimatedInput
          label="Invoice ID"
          name="invoice.id"
          disabled={true}
          value={invoiceData.invoice.id}
          onChange={handleChange}
        />

        <AnimatedDateInput
          label="Invoice Date"
          name="invoice.date"
          value={invoiceData.invoice.date}
          onChange={handleChange}
        />

        <AnimatedDateInput
          label="Due Date"
          name="due"
          value={invoiceData.due}
          onChange={handleChange}
        />

        {/* <AnimatedDateInput
          label="Delivery Expected"
          name="deliveryExpected"
          value={invoiceData.deliveryExpected}
          onChange={handleChange}
        /> */}
      </div>
    </div>
  );
};

export default InvoiceDetails;
