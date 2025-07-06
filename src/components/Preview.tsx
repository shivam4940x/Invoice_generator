import React, { type RefObject } from "react";
import type { InvoiceData } from "../types";
import getCurrencySymbol from "../util/getCurrencySymbo";
import formatCurrency from "../util/CurrencyFormatter";

interface PreviewProps {
  invoiceData: InvoiceData;
  ref: RefObject<HTMLDivElement | null>;
}

const Preview: React.FC<PreviewProps> = ({ invoiceData, ref }) => {
  const {
    from,
    to,
    invoice,
    due,
    items,
    amount,
    totalTax,
    currency,
    notes,
    BankTransfer,
    paymentMethod,
    note,
  } = invoiceData;

  const currencySymbol = getCurrencySymbol(currency);

  const cellClass = "px-4 py-2 border-r last:border-0";
  const rightAlign = `${cellClass} text-right`;
  const centerAlign = `${cellClass} text-center`;

  return (
    <div
      ref={ref}
      id="preview"
      className="border print:p-10 p-6 text-[0.69rem] print:text-base flex justify-between flex-col gap-4 h-full overflow-scroll"
    >
      <div>
        <div className="flex border-b border-forground justify-between items-end">
          <h1>Invoice</h1>
          <div className="my-2 print:text-sm">
            <div>
              <span className="capitalize">date:&nbsp;</span>
              <span>{invoice.date}</span>
            </div>
            <div>
              <span className="capitalize">invoice ID:&nbsp;</span>
              <span>{invoice.id}</span>
            </div>
          </div>
        </div>

        <div className="my-4 text-background grid grid-cols-2 gap-4 h-max">
          <div className="max-w-full p-4 space-y-1 print:space-y-2 bg-forground rounded-lg">
            <div>Bill To:</div>
            <h3>
              <span className="text-background">{to.name}</span>
            </h3>
            <address className="not-italic text-background">
              <div>
                <span>{to.email}</span>
              </div>
              {to.mobile && (
                <div>
                  <span>{to.mobile}</span>
                </div>
              )}
              <div>
                <span>{to.billingAddress}</span>
              </div>
            </address>
          </div>

          <div className="max-w-full p-4 space-y-1 print:space-y-2 bg-forground rounded-lg">
            <div className="font-semibold uppercase">Payable to</div>
            <h3>
              <span className="text-background">{from.name}</span>
            </h3>
            <address className="not-italic text-background">
              <div>{from.email}</div>
              <div>
                <strong className="capitalize">pay to: &nbsp;</strong>
                {paymentMethod === "Bank Transfer" ? (
                  <div className="print:text-sm leading-tight space-y-1">
                    <div>
                      Account No:{" "}
                      <span className="font-medium">
                        {BankTransfer?.number}
                      </span>
                    </div>
                    <div>
                      IFSC Code:{" "}
                      <span className="font-medium">{BankTransfer?.IFSC}</span>
                    </div>
                  </div>
                ) : (
                  <span>{from.payAt}</span>
                )}
              </div>
              {from.mobile && <div>{from.mobile}</div>}
            </address>
          </div>
        </div>

        <h2 className="border-b mb-6 border-forground">Items</h2>

        <table className="min-w-full border-collapse">
          <thead className="bg-forground">
            <tr>
              <th
                className={`${cellClass} text-background border-background text-left`}
              >
                Description
              </th>
              <th
                className={`${centerAlign} text-background border-background`}
              >
                Qty
              </th>
              <th className={`${rightAlign} text-background border-background`}>
                price
              </th>
              <th className={`${rightAlign} text-background border-background`}>
                Tax
              </th>
              <th className={`${rightAlign} text-background border-background`}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="even:bg-forground even:text-background"
              >
                <td className={cellClass}>{item.description}</td>

                <td className={centerAlign}>
                  {isNaN(parseFloat(item.quantity))
                    ? "0"
                    : parseFloat(item.quantity)}
                </td>

                <td className={rightAlign}>
                  {currencySymbol}
                  {isNaN(parseFloat(item.price))
                    ? "0"
                    : formatCurrency(parseFloat(item.price), currency)}
                </td>

                <td className={rightAlign}>
                  {isNaN(parseFloat(invoiceData.tax))
                    ? "0"
                    : parseFloat(invoiceData.tax)}
                  %
                </td>

                <td className={rightAlign}>
                  {currencySymbol}
                  {isNaN(parseFloat(item.total))
                    ? "0"
                    : formatCurrency(parseFloat(item.total), currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm space-y-1 ">
            <div className="px-2 flex justify-between border-t border-black/10 pt-2">
              <span>Subtotal</span>
              <span>
                {currencySymbol}
                {!isNaN(Number(amount.subtotal))
                  ? formatCurrency(amount.subtotal, currency)
                  : "0"}
              </span>
            </div>
            <div className="px-2 flex justify-between">
              <span>Discount</span>
              <span>
                - {currencySymbol}
                {!isNaN(Number(amount.discount))
                  ? formatCurrency(amount.discount, currency)
                  : "0"}
              </span>
            </div>
            <div className="px-2 flex justify-between">
              <span>Tax</span>
              <span>
                {currencySymbol}
                {!isNaN(Number(totalTax))
                  ? formatCurrency(totalTax, currency)
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between font-semibold bg-forground text-background p-2">
              <span>Total</span>
              <span>
                {currencySymbol}
                {!isNaN(Number(amount.total))
                  ? formatCurrency(amount.total, currency)
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between font-semibold bg-background text-forground p-2">
              <span>Paid</span>
              <span>
                {currencySymbol}
                {!isNaN(Number(amount.paid))
                  ? formatCurrency(amount.paid, currency)
                  : "0"}
              </span>
            </div>
            <div className="flex justify-between font-semibold bg-forground text-background p-2">
              <span>Pending</span>
              <span>
                {currencySymbol}
                {!isNaN(Number(amount.pending))
                  ? formatCurrency(amount.pending, currency)
                  : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end gap-5">
        <div className="space-y-2 grow">
          {(notes || note) && (
            <div className="mt-6 space-y-2">
              {notes && (
                <p>
                  <strong>Notes:</strong> {notes}
                </p>
              )}
              {note && (
                <p>
                  <strong>Additional Note:</strong> {note}
                </p>
              )}
              {invoiceData.terms && (
                <p>
                  <strong>Terms & conditions</strong> {invoiceData.terms}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex gap-1 text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
            <div className="capitalize font-semibold">Paid via:</div>
            <div className="capitalize text-white">{paymentMethod}</div>
          </div>
          <div className="flex gap-1 text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
            <div className="capitalize font-semibold">Due date:</div>
            <div className="text-white">{due}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
