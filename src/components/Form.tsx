import React, { useEffect } from "react";
import type { InvoiceData } from "../types";
import { InvoiceItemList } from "./Form/InvoiceItemList";
import Bill from "./Form/Bill";
import FromInfo from "./Form/Ship";
import InvoiceDetails from "./Form/Invoice";
import InvoiceAmount from "./Form/InvoiceAmount";
import InvoiceSettingsSection from "./Form/InvoiceSettingsSection";
import OthersSection from "./Form/OthersSection";

interface Props {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
  printFn: () => void;
}

const Form: React.FC<Props> = ({ invoiceData, setInvoiceData }) => {
  useEffect(() => {
    const subtotal = invoiceData.items.reduce(
      (acc, item) => acc + parseFloat(item.total || "0"),
      0
    );

    const total = subtotal - invoiceData.amount.discount;
    const pending = total - invoiceData.amount.paid;

    setInvoiceData((prev) => ({
      ...prev,
      amount: {
        ...prev.amount,
        subtotal,
        total,
        pending,
      },
    }));
  }, [
    invoiceData.items,
    invoiceData.amount.discount,
    invoiceData.amount.paid,
    setInvoiceData,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");

      setInvoiceData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof InvoiceData] as object),
          [field]: value,
        },
      }));
    } else {
      // top-level fields like "due", "deliveryExpected"
      setInvoiceData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  return (
    <div className="space-y-6 border border-white/10 p-4">
      <Bill invoiceData={invoiceData} handleChange={handleChange} />
      <FromInfo invoiceData={invoiceData} handleChange={handleChange} />
      <InvoiceSettingsSection
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />
      <InvoiceItemList
        currency={invoiceData.currency}
        items={invoiceData.items}
        tax={invoiceData.tax}
        setInvoiceData={setInvoiceData}
      />
      <InvoiceAmount
        amount={invoiceData.amount}
        currency={invoiceData.currency}
        onChange={(updatedAmount) =>
          setInvoiceData((prev) => ({
            ...prev,
            amount: updatedAmount,
          }))
        }
      />
      <InvoiceDetails invoiceData={invoiceData} handleChange={handleChange} />
      <OthersSection
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />
    </div>
  );
};

export default Form;
