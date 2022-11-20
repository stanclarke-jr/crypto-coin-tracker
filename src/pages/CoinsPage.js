/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
  Image,
  Text,
  Progress,
  VStack,
  Container,
  SkeletonCircle,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import { SingleCoin } from '../configs/api';
import { CoinsContext } from '../contexts/CoinsContext';
import { currencyFormatter, options } from '../utils/utils';
import CoinChart from '../components/CoinChart';

const CoinsPage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency } = useContext(CoinsContext);

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
            </>
          )}
        </VStack>
        <CoinChart coinId={coinId} currency={currency} />
      </Grid>
    </>
  );
};

export default CoinsPage;
