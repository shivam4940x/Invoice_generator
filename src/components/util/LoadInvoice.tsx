import { useState } from "react";
import Btn from "./Btn";
import { AnimatedInput } from "./Input";
import { getInvoice } from "../../lib/getInvoices";
import type { InvoiceData } from "../../types";

interface Props {
  onLoad: (invoice: InvoiceData) => void;
}

const LoadInvoice = ({ onLoad }: Props) => {
  const [invoiceId, setInvoiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const invoice = await getInvoice(invoiceId.trim());

    setLoading(false);

    if (!invoice) {
      setError("Invoice not found.");
    } else {
      onLoad(invoice);
      setSuccess(true);

      setTimeout(() => setInvoiceId(""), 3000); // reset after 3s
      setTimeout(() => setSuccess(false), 3000); // reset after 3s
    }
  };

  const statusText = () => {
    if (loading) return "Loading...";
    if (success) return "Invoice loaded";
    return "Load Invoice";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 flex items-center gap-4">
      <div className="relative">
        <AnimatedInput
          label="Invoice ID"
          name="getInvoice"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
        />
        <div className="absolute top-full left-0">
          {error && <p className="text-red-400/80 text-sm">{error}</p>}
        </div>
      </div>

      <Btn type="submit" disabled={loading || !invoiceId.trim()}>
        <div className={`center gap-3 ${success ? "text-[#198f19]" : ""}`}>
          {statusText()}{" "}
          {success ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={4}
              >
                <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path>
                <path strokeLinecap="round" d="m16 24l6 6l12-12"></path>
              </g>
            </svg>
          ) : (
            ""
          )}
        </div>
      </Btn>
    </form>
  );
};

export default LoadInvoice;
