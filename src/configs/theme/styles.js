import { extendTheme } from '@chakra-ui/react';

const styles = {
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
    },
  },
};

const theme = extendTheme({ styles });

export default theme;
