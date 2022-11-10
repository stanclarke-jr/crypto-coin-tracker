import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CoinsPage from '../pages/CoinsPage';
import HomePage from '../pages/HomePage';
import '../styles/App.css';
import theme from '../configs/theme';

console.log(window.innerWidth);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinsPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
