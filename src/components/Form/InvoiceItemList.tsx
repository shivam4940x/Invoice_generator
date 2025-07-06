import React from "react";
import { AnimatedInput } from "../util/Input";
import type { InvoiceItem, InvoiceData } from "../../types";
import getCurrencySymbol from "../../util/getCurrencySymbo";
import formatCurrency from "../../util/CurrencyFormatter";

interface Props {
  items: InvoiceItem[];
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
  tax: string;
  currency: "INR" | "USD";
}

type EditableItemField = keyof Pick<
  InvoiceItem,
  "description" | "quantity" | "price"
>;

const isEditableField = (field: string): field is EditableItemField =>
  ["description", "quantity", "price"].includes(field);

export const InvoiceItemList: React.FC<Props> = ({
  items,
  setInvoiceData,
  tax,
  currency,
}) => {
  const calculateTaxAndTotal = (quantity: number, price: number) => {
    const globalTax = parseFloat(tax || "0");
    const subtotal = quantity * price;
    const taxAmount = subtotal * (globalTax / 100);
    const total = subtotal + taxAmount;
    return {
      tax: taxAmount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const path = name.split(".");

    if (path[0] !== "items" || path.length < 3) return;

    const index = Number(path[1]);
    const field = path[2];

    setInvoiceData((prev) => {
      const items = [...prev.items];
      const updatedItem = { ...items[index] };

      if (isEditableField(field)) {
        updatedItem[field] = value;
      }

      const quantity = parseInt(updatedItem.quantity || "1");
      const price = parseFloat(updatedItem.price || "0");
      const { tax: taxAmount, total } = calculateTaxAndTotal(quantity, price);
      updatedItem.tax = taxAmount;
      updatedItem.total = total;
      items[index] = updatedItem;
      return { ...prev, items };
    });
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const path = name.split(".");

    if (path[0] !== "items" || path.length < 3) return;

    const index = Number(path[1]);
    const field = path[2];
    if (isEditableField(field) && value.trim() === "") {
      setInvoiceData((prev) => {
        const items = [...prev.items];
        const updatedItem = { ...items[index] };

        updatedItem[field] = "0";

        const quantity = parseFloat(updatedItem.quantity || "0");
        const price = parseFloat(updatedItem.price || "0");
        const { tax: taxAmount, total } = calculateTaxAndTotal(quantity, price);

        updatedItem.tax = taxAmount;
        updatedItem.total = total;

        items[index] = updatedItem;

        return { ...prev, items };
      });
    }
  };

  const removeItem = (indexToRemove: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== indexToRemove),
    }));
  };

  const addItem = () => {
    setInvoiceData((prev) => {
      return {
        ...prev,
        items: [
          ...prev.items,
          {
            description: "",
            quantity: "1",
            price: "0",
            tax: "0",
            total: "0",
          },
        ],
      };
    });
  };

  return (
    <div className="invoice-items mt-8 space-y-6">
      <div className="mb-4 border-b border-forground/60 px-2 flex justify-between items-end">
        <h4 className="text-lg font-semibold">Items</h4>
        <div className="w-40">
          <AnimatedInput
            label="Tax (%)"
            name="tax"
            value={tax}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                tax: e.target.value,
                items: prev.items.map((item) => {
                  const quantity = parseFloat(item.quantity || "0");
                  const price = parseFloat(item.price || "0");
                  const subtotal = quantity * price;
                  const taxAmount =
                    subtotal * (parseFloat(e.target.value || "0") / 100);
                  return {
                    ...item,
                    tax: taxAmount.toFixed(2),
                    total: (subtotal + taxAmount).toFixed(2),
                  };
                }),
              }))
            }
            onBlur={handleFieldBlur}
            type="text"
          />
        </div>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="relative border border-white/10 rounded-lg px-4 py-6 group hover:border-white/20 transition"
        >
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute -top-2 -right-2 text-xs bg-background border border-red-600/20 rounded-full overflow-hidden"
          >
            <div className="center text-red-500 transition-colors duration-200 hover:bg-red-600/10 px-2 py-1">
              ✕
            </div>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedInput
              label="Price"
              name={`items.${index}.price`}
              value={item.price}
              onChange={handleItemChange}
              onBlur={handleFieldBlur}
              type="text"
            />

            <AnimatedInput
              label="Quantity"
              name={`items.${index}.quantity`}
              value={item.quantity}
              onChange={handleItemChange}
              onBlur={handleFieldBlur}
              type="text"
            />

            <AnimatedInput
              label="Description"
              className="col-span-2"
              name={`items.${index}.description`}
              value={item.description}
              onChange={handleItemChange}
            />

            {[
              { label: "Tax", value: item.tax },
              { label: "Total", value: item.total },
            ].map(({ label, value }) => (
              <AnimatedInput
                key={label}
                label={label}
                name=""
                value={`${getCurrencySymbol(currency)} ${formatCurrency(
                  value,
                  currency
                )}`}
                onChange={() => {}}
                type="text"
                className="pointer-events-none opacity-60"
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6">
        <button
          type="button"
          onClick={addItem}
          className="text-sm px-5 py-2 border border-white/20 rounded hover:bg-white/10 transition"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
};
