const getCurrencySymbol = (code: "INR" | "USD") => {
  switch (code) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    default:
      return code + " ";
  }
};
export default getCurrencySymbol;
