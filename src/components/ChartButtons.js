import { Button } from '@chakra-ui/react';

const ChartButtons = ({ children }) => {
  return (
    <Button
      w="23%"
      py="2"
      px="6"
      border="1px"
      borderColor="yellow.400"
      fontWeight="normal"
      bg="transparent"
      // color={selected ? '#000' : 'whiteAlpha.800'}
      // bg={selected ? 'yellow.400' : 'transparent'}
      // fontWeight={selected ? 'semibold' : 'normal'}
      cursor="pointer"
      _hover={{
        background: 'yellow.400',
        color: '#000',
        fontWeight: 'semibold',
      }}
    >
      {children}
    </Button>
  );
};

export default ChartButtons;
