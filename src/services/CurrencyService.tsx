import axios from 'axios';

interface Rates {
  [key: string]: number;
}

interface CurrencyData {
  rates: Rates;
  base: string;
  date: string;
}

export const fetchCurrencies = async (): Promise<string[]> => {
  try {
    const response = await axios.get<CurrencyData>('https://open.er-api.com/v6/latest/USD');
    return Object.keys(response.data.rates);
  } catch (error) {
    console.error('Error fetching the currency data:', error);
    throw new Error('Failed to fetch currencies');
  }
};

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    const response = await axios.get<CurrencyData>(
      `https://open.er-api.com/v6/latest/${fromCurrency}`
    );
    return response.data.rates[toCurrency];
  } catch (error) {
    console.error('Error fetching the exchange rate:', error);
    throw new Error('Failed to fetch exchange rate');
  }
};
