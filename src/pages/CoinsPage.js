/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import CoinChart from '../components/CoinChart';
import { CoinsContext } from '../contexts/CoinsContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Container,
  Flex,
  Grid,
  Image,
  Progress,
  SkeletonCircle,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import parse from 'html-react-parser';
import { SingleCoin } from '../configs/api';
import { toastOptions } from '../configs/toast';
import { currencyFormatter, options } from '../utils/utils';

const CoinsPage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency, user, watchlist } = useContext(CoinsContext);
  console.log(watchlist);

  const toast = useToast();

  const existsInWatchlist = watchlist.includes(coin.id);

  const addToWatchlist = async () => {
    const coinsRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(coinsRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin.id],
      });

      toastOptions.title = `${coin.name} added to Watchlist!`;
      toastOptions.description = `Click on your avatar to view your profile ☝ 👉`;
      toastOptions.status = 'success';
      toast(toastOptions);
    } catch (error) {
      toastOptions.title = `Oops. An error occurred.`;
      toastOptions.description = error.message;
      toastOptions.status = 'error';
      toast(toastOptions);
    }
  };

  const removeFromWatchlist = async () => {
    const coinsRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(
        coinsRef,
        {
          coins: watchlist.filter(watchedCoins => watchedCoins !== coin.id),
        },
        { merge: 'true' }
      );

      toastOptions.title = `${coin.name} removed from Watchlist.`;
      toastOptions.description = `Click on your avatar to view your profile ☝ 👉`;
      toastOptions.status = 'success';
      toast(toastOptions);
    } catch (error) {
      toastOptions.title = `Oops. An error occurred.`;
      toastOptions.description = error.message;
      toastOptions.status = 'error';
      toast(toastOptions);
    }
  };

  const shortCoinDescription = coin?.description?.en.includes('href=')
    ? coin?.description?.en.split('. ')[0]
    : !coin?.description?.en.length
    ? 'No coin description available'
    : coin?.description?.en.split('.')[0];

  let { id: coinId } = useParams();

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(coinId));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  return (
    <>
      {loading && <Progress isIndeterminate bg="yellow.400" size="xs" />}
      <Grid
        h="calc(100vh - 5rem)"
        templateRows="repeat(1, 1fr)"
        templateColumns={[null, 'repeat(1, 1fr)', null, 'repeat(1, 30% 1fr)']}
        my={8}
        mr={[null, null, null, 16]}
        gap={16}
        fontFamily="Montserrat"
      >
        <VStack
          align={['center', null, null, 'start']}
          borderRight="1px"
          borderColor="whiteAlpha.400"
          p={7}
          pt={2}
        >
          <SkeletonCircle isLoaded={!loading} size={[null, 44, null, 56]}>
            <Image
              src={coin?.image?.large}
              alt={coin?.name}
              boxSize={[null, 44, null, 56]}
              border="none"
            />
          </SkeletonCircle>
          <Text
            as="h1"
            color="rgb(255 255 255/0.92)"
            fontSize={['3xl', '3xl', null, '5xl']}
            fontWeight="bold"
          >
            {coin?.name}
          </Text>
          {shortCoinDescription === undefined ? (
            <CircularProgress
              isIndeterminate
              color="yellow.400"
              size="10px"
              thickness="2px"
            />
          ) : (
            <>
              <Container
                maxW={['sm', 'md', 'lg', 'xl', '2xl']}
                fontSize={[null, 'sm', null, 'md']}
                align={[null, 'center', null, 'start']}
                px={0}
                pb={10}
              >
                <Text
                  color="rgb(255 255 255/0.92)"
                  textAlign={[null, 'center', null, 'left']}
                >
                  {parse(`${shortCoinDescription}.`)}
                </Text>
              </Container>
              <Text
                color="rgb(255 255 255/0.92)"
                fontSize={[null, 'xl', null, '3xl']}
                fontWeight="bold"
              >
                Rank:{' '}
                <Text
                  as="span"
                  color="rgb(255 255 255/0.92)"
                  fontWeight="medium"
                  ml={1}
                >
                  {coin?.market_cap_rank}
                </Text>
              </Text>
              <Text
                color="rgb(255 255 255/0.92)"
                fontSize={[null, 'xl', null, '3xl']}
                fontWeight="bold"
              >
                Current Price:{' '}
                <Text as="span" fontWeight="medium" ml={1}>
                  {currencyFormatter(
                    coin?.market_data?.current_price[currency?.toLowerCase()],
                    options
                  )}
                </Text>
              </Text>
              <Text
                color="rgb(255 255 255/0.92)"
                fontSize={[null, 'xl', null, '3xl']}
                fontWeight="bold"
              >
                Market Cap:{' '}
                <Text
                  as="span"
                  color="rgb(255 255 255/0.92)"
                  fontWeight="medium"
                  ml={1}
                >
                  {currencyFormatter(
                    coin?.market_data?.market_cap[currency?.toLowerCase()],
                    options
                  ).slice(0, -11)}
                  M
                </Text>
              </Text>
              {user && (
                <Flex
                  w={['45%', null, null, 'full']}
                  justifyContent="center"
                  px={0}
                  py={6}
                >
                  <Button
                    w="full"
                    bg={existsInWatchlist ? 'red.600' : 'yellow.400'}
                    color="#000"
                    fontWeight="600"
                    onClick={
                      existsInWatchlist ? removeFromWatchlist : addToWatchlist
                    }
                  >
                    {existsInWatchlist
                      ? 'REMOVE FROM WATCHLIST'
                      : 'ADD TO WATCHLIST'}
                  </Button>
                </Flex>
              )}
            </>
          )}
        </VStack>
        <CoinChart coinId={coinId} currency={currency} />
      </Grid>
    </>
  );
};

export default CoinsPage;
