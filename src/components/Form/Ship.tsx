import React from "react";
import { AnimatedInput } from "../util/Input";
import type { InvoiceData } from "../../types";

interface Props {
  invoiceData: InvoiceData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FromInfo: React.FC<Props> = ({ invoiceData, handleChange }) => {
  return (
    <div className="from mt-8">
      <div className="mb-8 border-b border-forground/60 py-1">
        <h4 className="text-lg font-semibold">Ship to</h4>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 p-1">
        <AnimatedInput
          label="Your Name"
          name="from.name"
          value={invoiceData.from.name}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Email"
          name="from.email"
          value={invoiceData.from.email}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Mobile (optional)"
          name="from.mobile"
          value={invoiceData.from.mobile || ""}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Payable At"
          name="from.payAt"
          value={invoiceData.from.payAt}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FromInfo;
