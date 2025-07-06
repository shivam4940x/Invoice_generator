
import { AnimatedInput } from "../util/Input";
import type { InvoiceData } from "../../types";

interface Props {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const OthersSection: React.FC<Props> = ({ invoiceData, setInvoiceData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="others-section mt-8">
      <div className="mb-8 border-b border-forground/60 py-1">
        <h4 className="text-lg font-semibold">Other Information</h4>
      </div>

      <div className="grid gap-5 p-1 grid-cols-2 grid-rows-2">
        <AnimatedInput
          label="Terms & Conditions"
          name="terms"
          className="col-span-2"
          value={invoiceData.terms}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Client Notes"
          name="notes"
          value={invoiceData.notes}
          onChange={handleChange}
        />

        <AnimatedInput
          label="Internal Note"
          name="note"
          value={invoiceData.note}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default OthersSection;
