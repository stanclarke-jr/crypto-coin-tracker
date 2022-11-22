import { extendTheme } from '@chakra-ui/react';

// Global style overrides
import colorMode from '../colorMode';
import styles from './styles';

// Foundational style overrides

// Component style overrides
import Form from './components/form.js';

const overrides = {
  colorMode,
  styles,
  components: {
    Form,
  },
};

export default extendTheme(overrides);
