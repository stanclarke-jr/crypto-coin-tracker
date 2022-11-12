/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
  Image,
  Text,
  Progress,
  Box,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import { SingleCoin } from '../configs/api';
import { CoinsContext } from '../contexts/CoinsContext';
import { currencyFormatter, options } from '../utils';

const CoinsPage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = useContext(CoinsContext);

  const shortCoinDescription = coin?.description?.en.split('. ')[0];
  console.log(shortCoinDescription);

  let { id: coinId } = useParams();

  console.log('Coin data: ', coin);

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
        templateColumns={[
          null,
          'repeat(1, 1fr)',
          null,
          'repeat(1, 30% 1fr 1fr)',
        ]}
        mt={8}
        fontFamily="Montserrat"
      >
        <VStack align={[null, 'center', null, 'start']} p={7} pt={2}>
          <Box alignSelf="center">
            <Image src={coin?.image?.large} alt={coin?.name} boxSize={56} />
            <Text as="h1" fontSize="5xl" fontWeight="bold">
              {coin?.name}
            </Text>
          </Box>
          {shortCoinDescription === undefined ? (
            <CircularProgress
              isIndeterminate
              color="yellow.400"
              size="10px"
              thickness="2px"
            />
          ) : (
            <>
              <Text align={[null, 'center', null, 'start']} pb={10}>
                {parse(`${shortCoinDescription}.`)}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Rank:{' '}
                <Text as="span" fontWeight="medium" ml={1}>
                  {coin?.market_cap_rank}
                </Text>
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Current Price:{' '}
                <Text as="span" fontWeight="medium" ml={1}>
                  {currencyFormatter(
                    coin?.market_data?.current_price[currency?.toLowerCase()],
                    options
                  )}
                </Text>
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                Market Cap:{' '}
                <Text as="span" fontWeight="medium" ml={1}>
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
        {!loading ? (
          <VStack colSpan={2}>Chart goes here.</VStack>
        ) : (
          <Flex colSpan={2} align="center" justify="center">
            <CircularProgress
              isIndeterminate
              color="yellow.400"
              size="200px"
              thickness="2px"
            />
          </Flex>
        )}
      </Grid>
    </>
  );
};

export default CoinsPage;
