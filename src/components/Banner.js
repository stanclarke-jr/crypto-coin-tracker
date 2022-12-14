import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <Box bgImage="url(./banner.jpg)">
      <VStack h={400} justify="space-around">
        <hgroup>
          <Heading
            as="h1"
            fontSize={['5xl', '7xl']}
            fontFamily="Montserrat"
            fontWeight="bold"
          >
            Koin Tracker
          </Heading>
          <Text
            as="p"
            color="gray.400"
            textTransform="capitalize"
            align="center"
          >
            Track your favourite coins.
          </Text>
        </hgroup>
        <Carousel />
      </VStack>
    </Box>
  );
};

export default Banner;
