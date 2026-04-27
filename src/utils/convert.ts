export const convertCurrency = (
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): number => {
  if (!rates[from] || !rates[to]) return 0;

  // Convert FROM → USD → TO
  const amountInUSD = from === "USD" ? amount : amount / rates[from];
  return amountInUSD * rates[to];
};