// src/hooks/useCurrencyData.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchCurrencies, fetchExchangeRate } from '../services/CurrencyService';

export const useCurrencyData = (fromCurrency: string, toCurrency: string) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadCurrencies = useCallback(async () => {
    try {
      const currencyList = await fetchCurrencies();
      setCurrencies(currencyList);
    } catch (error) {
      setError('Failed to load currencies');
    }
  }, []);

  const loadExchangeRate = useCallback(async () => {
    try {
      const rate = await fetchExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(rate);
    } catch (error) {
      setError('Failed to fetch exchange rate');
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    loadCurrencies();
  }, [loadCurrencies]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      loadExchangeRate();
    }
  }, [fromCurrency, toCurrency, loadExchangeRate]);

  return { currencies, exchangeRate, error };
};
