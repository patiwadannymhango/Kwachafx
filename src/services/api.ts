export interface RatesResponse {
  base: string;
  rates: Record<string, number>;
}

const BASE_URL = "https://open.er-api.com/v6/latest/USD";

export const fetchRates = async (): Promise<RatesResponse> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const data = await response.json();
  return data;
};