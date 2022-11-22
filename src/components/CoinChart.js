/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { HistoricalChart } from '../configs/api';
import { Box, CircularProgress, Flex, HStack } from '@chakra-ui/react';
import { chartDays } from '../configs/chart-days';
import ChartButtons from './ChartButtons';

Chart.register(...registerables);

const CoinChart = ({ coinId, currency }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [timePeriod, setTimePeriod] = useState(1);
  const [flag, setFlag] = useState(false);

  const historicalPrices = historicalData?.prices;

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart(coinId, timePeriod, currency)
    );
    setFlag(true);
    setHistoricalData(data);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [timePeriod]);

  return (
    <>
      {!historicalPrices || flag === false ? (
        <Flex align="center" justify="center">
          <CircularProgress
            isIndeterminate
            color="yellow.400"
            size="150px"
            thickness="2px"
          />
        </Flex>
      ) : (
        <Flex justify="center">
          <Flex direction="column" w={['85%', '90%', null, '100%']} mt={6}>
            {/* TODO: figure out responsiveness on window resize*/}
            <Box position="relative">
              <Line
                data={{
                  labels: historicalPrices.map(historicalPrice => {
                    let date = new Date(historicalPrice[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return timePeriod === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicalPrices.map(
                        historicalPrice => historicalPrice[1]
                      ),
                      label: `Price ( past ${
                        timePeriod === 1 ? 'day' : `${timePeriod} days`
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
                  responsive: true,
                }}
              />
            </Box>
            <HStack justify="space-around" mt={4} mb={12}>
              {chartDays.map(days => (
                <ChartButtons
                  key={days.value}
                  selectedPeriod={days.value === timePeriod}
                  onClick={() => {
                    setTimePeriod(days.value);
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
