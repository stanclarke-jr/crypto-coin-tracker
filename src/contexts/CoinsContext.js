import { createContext, useState } from 'react';

export const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [currency, setCurrency] = useState('CAD');
  const [symbol, setSymbol] = useState('$');

  return (
    <CoinsContext.Provider value={{ currency, setCurrency, symbol, setSymbol }}>
      {children}
    </CoinsContext.Provider>
  );
};
