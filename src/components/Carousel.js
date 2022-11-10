/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Image, VStack, HStack, Container } from '@chakra-ui/react';
import { TrendingCoins } from '../configs/api';
import { CoinsContext } from '../contexts/CoinsContext';
import { currencyFormatter, options, positiveNum } from '../utils';
import { responsive } from '../configs/alice-carousel';

import AliceCarousel from 'react-alice-carousel';
import axios from 'axios';

const Carousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const { currency } = useContext(CoinsContext);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrendingCoins(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map(coin => {
    return (
      <Link to={`/coins/${coin.id}`} key={coin.id}>
        <VStack fontFamily="Montserrat">
          <Image
            src={coin.image}
            alt={coin.name}
            boxSize={['65px', '80px']}
            mb="10px"
          />
          <HStack>
            <Text fontWeight="medium">{coin.symbol.toUpperCase()}</Text>
            <Text
              fontWeight="semibold"
              color={
                positiveNum(coin.price_change_percentage_24h)
                  ? 'green.400'
                  : 'red.500'
              }
            >
              {positiveNum(coin.price_change_percentage_24h) && '+'}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </HStack>
          <Text fontSize="22px" fontWeight="semibold" mt={0}>
            {currencyFormatter(coin.current_price, options)}
          </Text>
        </VStack>
      </Link>
    );
  });

  if (!trendingCoins) return <p>Loading...</p>;

  return (
    <Container maxW="100%">
      <Flex h="40%" align="center">
        <AliceCarousel
          infinite
          mouseTracking
          disableButtonsControls
          disableDotsControls
          autoPlay
          autoPlayInterval={1000}
          animationDuration={1500}
          responsive={responsive}
          items={items}
        />
      </Flex>
    </Container>
  );
};

export default Carousel;
