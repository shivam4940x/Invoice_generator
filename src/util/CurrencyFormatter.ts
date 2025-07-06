const formatCurrency = (amount: number | string, code: "INR" | "USD") => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  const locale = code === "INR" ? "en-IN" : "en-US";
  const hasFraction = value % 1 !== 0;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(value);
};

export default formatCurrency;
