import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CoinsPage from '../pages/CoinsPage';
import HomePage from '../pages/HomePage';
import '../styles/App.css';
import ScrollToTop from '../utils/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinsPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
