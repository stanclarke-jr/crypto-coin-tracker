/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { CoinList } from '../configs/api';
import { CoinsContext } from '../contexts/CoinsContext';
import {
  HStack,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Input,
  Image,
  Link,
  Progress,
  Flex,
} from '@chakra-ui/react';
import { currencyFormatter, options, positiveNum } from '../utils';
import Pagination from './Pagination';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);

  const itemsPerPage = 10;
  const endOffset = offset + itemsPerPage;

  const { currency } = useContext(CoinsContext);

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = e => {
    return coins.filter(
      coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  console.log(coins);

  return (
    <>
      <TableContainer m="1.5rem">
        {loading ? (
          <Progress isIndeterminate bg="yellow.400" size="xs" />
        ) : (
          <>
            <Text
              as="h2"
              fontSize="4xl"
              fontFamily="Montserrat"
              align="center"
              my={22}
            >
              Coin Prices by Market Cap
            </Text>
            <Input
              placeholder="Search for a coin..."
              _placeholder={{ opcity: 0.8, color: 'gray.500' }}
              _focusVisible={{
                borderColor: 'whiteAlpha.500',
                boxShadow: `0 0 0 0.25px RGBA(255, 255, 255, 0.36)`,
              }}
              size="lg"
              mb={10}
              onChange={e => setSearch(e.target.value)}
            />
            <Table size={['sm', null, 'md']} fontWeight="medium">
              <Thead bg="yellow.400">
                <Tr>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map(header => (
                    <Th
                      scope="col"
                      color="#000"
                      textAlign={header === 'Coin' ? 'left' : 'right'}
                    >
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {handleSearch()
                  .slice(offset, endOffset)
                  .map(coin => {
                    return (
                      <Tr
                        key={coin.id}
                        display="table-row"
                        fontFamily="Montserrat"
                        cursor="pointer"
                        verticalAlign="middle"
                        _hover={{ bg: 'gray.900' }}
                        onClick={() => navigate(`/coins/${coin.id}`)}
                      >
                        <Th scope="row" pl={4} fontWeight="medium">
                          <HStack gap={2}>
                            <Image
                              src={coin.image}
                              alt={coin.name}
                              boxSize={50}
                            />
                            <VStack align="flex-start">
                              <Text
                                color="#fff"
                                fontSize="xl"
                                textTransform="uppercase"
                              >
                                {coin.symbol}
                              </Text>
                              <Text
                                fontSize="sm"
                                color="gray.400"
                                textTransform="capitalize"
                              >
                                {coin.name}
                              </Text>
                            </VStack>
                          </HStack>
                        </Th>
                        <Td textAlign="right">
                          {currencyFormatter(coin.current_price, options)}
                        </Td>
                        <Td
                          textAlign="right"
                          color={
                            positiveNum(coin.price_change_percentage_24h)
                              ? 'green.400'
                              : 'red.500'
                          }
                        >
                          {positiveNum(coin.price_change_percentage_24h) && '+'}
                          {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                        </Td>
                        <Td textAlign="right">
                          {currencyFormatter(coin.market_cap, options).slice(
                            0,
                            -3
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </>
        )}
      </TableContainer>
      <Pagination
        coins={coins}
        itemsPerPage={itemsPerPage}
        offset={offset}
        setOffset={setOffset}
        endOffset={endOffset}
      />
    </>
  );
};

export default CoinsTable;
