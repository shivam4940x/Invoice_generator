import React from "react";
import { AnimatedInput } from "../util/Input";
import type { InvoiceData } from "../../types";

interface Props {
  invoiceData: InvoiceData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Bill: React.FC<Props> = ({ invoiceData, handleChange }) => {
  return (
    <div className="to">
      <div className="mb-8 border-b border-forground/60 py-1">
        <h4 className="text-lg font-semibold">Client Info</h4>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 p-1">
        <AnimatedInput
          label="Client Name"
          name="to.name"
          value={invoiceData.to.name}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Billing Address"
          name="to.billingAddress"
          value={invoiceData.to.billingAddress}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Email"
          name="to.email"
          value={invoiceData.to.email}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Mobile (optional)"
          name="to.mobile"
          value={invoiceData.to.mobile || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Bill;
