/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { HistoricalChart } from '../configs/api';
import { Button, CircularProgress, Flex, HStack } from '@chakra-ui/react';
import { chartDays } from '../configs/chart-days';
import { chartButtonStyles } from '../styles/chartButtonStyles';
import ChartButtons from './ChartButtons';

Chart.register(...registerables);

const CoinChart = ({ coinId, currency }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);

  const historicalPrices = historicalData?.prices;

  const fetchHistoricalPrices = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(coinId, days, currency));
    console.log(data);
    setHistoricalData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricalPrices();
  }, [currency, days]);

  console.log('Coin ID: ', coinId);
  console.log('Historical Data: ', historicalData);
  console.log('Currency: ', currency);
  console.log('Historical prices: ', historicalPrices);
  console.log('Selected chart days: ', days);

  return (
    <>
      {loading || !historicalData || !historicalPrices ? (
        <Flex align="center" justify="center">
          <CircularProgress
            isIndeterminate
            color="yellow.400"
            size="200px"
            thickness="2px"
          />
        </Flex>
      ) : (
        <Flex justify="center" mt={6}>
          <Flex direction="column" w={['75%', '85%', null, '100%']}>
            <Line
              data={{
                labels: historicalPrices.map(historicalPrice => {
                  let date = new Date(historicalPrice[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalPrices.map(
                      historicalPrice => historicalPrice[1]
                    ),
                    label: `Price ( past ${
                      days === 1 ? 'day' : `${days} days`
                    } ) in ${currency}`,
                    borderColor: '#ecc94b',
                    backgroundColor: '#ecc94b',
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            {/* <ButtonGroup variant="outline"> */}
            <HStack justify="space-around" mt={4} mb={12}>
              {chartDays.map(days => (
                <ChartButtons
                  // {...chartButtonStyles}
                  key={days.value}
                  selected={days.value === days}
                  onClick={() => {
                    setDays(days.value);
                  }}
                >
                  {days.label}
                </ChartButtons>
              ))}
            </HStack>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CoinChart;
