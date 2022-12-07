/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Text,
  Input,
  Image,
  Progress,
  Container,
} from '@chakra-ui/react';
import { currencyFormatter, options, positiveNum } from '../utils/utils';
import Pagination from './Pagination';

const CoinsTable = () => {
  const [search, setSearch] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState({ search: 0, default: 0 });
  const [offset, setOffset] = useState({ search: 0, default: 0 });

  const itemsPerPage = 10;
  const isSearch = search.length > 0;
  const startOffset = isSearch ? offset.search : offset.default;
  const endOffset = startOffset + itemsPerPage;
  const { coins, loading } = useContext(CoinsContext);

  const navigate = useNavigate();

  const handleSearch = e => {
    return coins.filter(
      coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  console.log(handleSearch().slice(startOffset, endOffset));
  return (
    <>
      <Container maxW="100%">
        <Text
          as="h2"
          fontSize={['2xl', '4xl']}
          fontFamily="Montserrat"
          align="center"
          my={22}
        >
          Coin Prices by Market Cap
        </Text>
        <Input
          placeholder="Search for a coin..."
          _placeholder={{ opacity: 0.8, color: 'gray.500' }}
          _hover={{ borderColor: 'rgb(255 255 255/0.24)' }}
          _focusVisible={{
            borderColor: 'whiteAlpha.500',
            boxShadow: `0 0 0 0.25px rgba(255, 255, 255, 0.36)`,
          }}
          size="lg"
          mb={2}
          onChange={e => setSearch(e.target.value)}
        />
      </Container>

      <TableContainer m="1.5rem">
        {loading ? (
          <Progress isIndeterminate bg="yellow.400" size="xs" />
        ) : (
          <>
            <Table size={['sm', null, 'md']} fontWeight="medium">
              <Thead bg="yellow.400">
                <Tr>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map(header => (
                    <Th
                      key={header.toLowerCase()}
                      scope="col"
                      color="#000"
                      border="none"
                      textAlign={header === 'Coin' ? 'left' : 'right'}
                    >
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {handleSearch()
                  .slice(startOffset, endOffset)
                  .map(coin => {
                    return (
                      <Tr
                        key={coin.id}
                        display="table-row"
                        fontFamily="Montserrat"
                        cursor="pointer"
                        verticalAlign="middle"
                        _hover={{ bg: 'gray.800' }}
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
                          borderColor="#2d3748"
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
        setPage={setPage}
        page={page}
        isSearch={isSearch}
        search={search}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default CoinsTable;
