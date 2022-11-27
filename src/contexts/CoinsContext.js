/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from '../configs/api.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('CAD');
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  console.log('Watchlist is loaded: ', isLoaded);
  console.log(watchlist);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      user ? setUser(user) : setUser(null);
    });
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    if (user) {
      const coinsRef = doc(db, 'watchlist', user.uid);
      const unsubscribe = onSnapshot(
        coinsRef,
        watchlist => {
          if (watchlist.exists()) {
            setWatchlist(watchlist.data().coins);
          } else console.log('There are no coins in the watchlist.');
          setIsLoaded(true);
        },
        error => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <CoinsContext.Provider
      value={{
        coins,
        currency,
        isLoaded,
        setIsLoaded,
        loading,
        setCurrency,
        setLoading,
        setUser,
        user,
        watchlist,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
