// src/lib/getInvoices.ts
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { InvoiceData } from "../types";

export const getInvoices = async () => {
  const snapshot = await getDocs(collection(db, "invoices"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getInvoice = async (id: string): Promise<InvoiceData | null> => {
  try {
    const docRef = doc(db, "invoices", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null; // Not found
    }

    const data = snapshot.data();

    return {
      ...data,
      createdAt: new Date(data.createdAt), // convert back from Firestore timestamp
    } as InvoiceData;
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return null;
  }
};
