// src/lib/saveInvoice.ts
import { db } from "../firebase";
import type { InvoiceData } from "../types";

import { setDoc, doc } from "firebase/firestore";

// use setDoc instead of addDoc
export const saveInvoice = async (invoice: InvoiceData) => {
  try {
    const docId = invoice.invoice.id; 
    await setDoc(doc(db, "invoices", docId), {
      ...invoice,
      uid: invoice.uid,
      createdAt: new Date().toISOString(),
    });
    console.log("Saved with ID:", docId);
    return docId;
  } catch (err) {
    console.error("Save failed:", err);
    return null;
  }
};
