import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import Preview from "../components/Preview";
import type { InvoiceData } from "../types";
import { useReactToPrint } from "react-to-print";
import defaultInvoiceData from "../util/defaultInvoiceData";
import Btn from "../components/util/Btn";
import { saveInvoice } from "../lib/saveInvoice";
import LoadInvoice from "../components/util/LoadInvoice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  authUid: string | null;
}

function Home({ authUid }: Props) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(defaultInvoiceData);
  const contentRef = useRef<HTMLDivElement>(null);

  // 🔒 If on /:userId route, enforce auth match

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      totalTax: prev.items.reduce(
        (sum, item) => sum + Number(item.tax || 0),
        0
      ),
    }));
  }, [invoiceData.items]);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: invoiceData.invoice.id,
    onAfterPrint: () => {
      // Only save if authenticated
      if (authUid) {
        saveInvoice({ ...invoiceData, uid: authUid });
      } else {
        console.log("Invoice not saved (guest mode)");
      }
    },
  });
  if (userId && userId !== authUid) {
    return authUid ? <Navigate to={`/${authUid}`} /> : <Navigate to="/login" />;
  }
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Sign-out failed", err);
    }
  };
  return (
    <div className="min-h-screen flex">
      <main className="grow space-y-2 px-8 py-4 max-h-full">
        <div className="overscroll-y-contain h-full relative">
          {!authUid && (
            <div className="px-2 ml-auto w-max text-sm py-2">
              <div>
                Your data is not being saved. If you want to store your invoices
                then <Link to="/login">login</Link>
              </div>
            </div>
          )}
          {authUid && (
            <div className="absolute top-0 right-0">
              <Btn onClick={handleSignOut}>signout</Btn>
            </div>
          )}
          <Form
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            printFn={reactToPrintFn}
          />
          <div className="my-6 flex justify-between items-center">
            {authUid && <LoadInvoice onLoad={(data) => setInvoiceData(data)} />}
            <div className="ml-auto">
              <Btn onClick={reactToPrintFn}>Print</Btn>
            </div>
          </div>
        </div>
      </main>
      <div className="h-screen sticky top-0 p-4 max-w-[46rem]">
        <Preview ref={contentRef} invoiceData={invoiceData} />
      </div>
    </div>
  );
}

export default Home;
