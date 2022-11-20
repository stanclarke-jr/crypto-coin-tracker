/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../configs/api.js';

export const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('CAD');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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
      value={{
        alert,
        coins,
        currency,
        setCurrency,
        loading,
        setUser,
        user,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
