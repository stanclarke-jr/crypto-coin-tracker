/* eslint-disable react/jsx-no-duplicate-props */
import { Button } from '@chakra-ui/react';

const ChartButtons = ({ children, onClick, selectedPeriod }) => {
  return (
    <Button
      cursor="pointer"
      w="23%"
      py="2"
      px="6"
      border="1px"
      borderColor="yellow.400"
      _active={{ bg: 'yellow.400' }}
      _hover={{ bg: 'yellow.400', color: '#000', fontWeight: 'semibold' }}
      color={selectedPeriod ? '#000' : 'whiteAlpha.800'}
      bg={selectedPeriod ? 'yellow.400' : 'transparent'}
      fontWeight={selectedPeriod ? 'semibold' : 'normal'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ChartButtons;
