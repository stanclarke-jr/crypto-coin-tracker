import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
    },
  },
};

const theme = extendTheme({ config });

export default theme;
