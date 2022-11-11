import { useContext } from 'react';
import { CoinsContext } from '../contexts/CoinsContext';
const CoinsPage = () => {
  const { currency } = useContext(CoinsContext);
  console.log(currency);
  return <div>CoinsPage</div>;
};

export default CoinsPage;
