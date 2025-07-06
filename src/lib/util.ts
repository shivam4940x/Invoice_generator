import { auth } from "../firebase"; // adjust path if needed

/**
 * Checks if the current Firebase user is authorized to access the given invoice.
 * @param invoiceUserId - The id of invoice owner
 * @returns boolean - true if authorized, false otherwise
 */
export function isAuthorizedUser(invoiceUserId: string): boolean {
  const currentUser = auth.currentUser;
  if (!currentUser) return false;

  return currentUser.uid === invoiceUserId;
}
