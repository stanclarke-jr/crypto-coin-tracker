/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../configs/api.js';

export const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [currency, setCurrency] = useState('CAD');
  const [symbol, setSymbol] = useState('$');
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <CoinsContext.Provider
      value={{ coins, loading, currency, setCurrency, symbol, setSymbol }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
