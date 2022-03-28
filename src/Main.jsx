import React, { useEffect } from 'react';
// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

//Import custom Hook
import useIsMounted from './hooks/useIsMounted';

// Import Pages
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';

export const Main = ({ setIsLoaded }) => {
  const location = useLocation();

  //check is component is mounted
  const isMounted = useIsMounted();
  if (isMounted()) {
    setIsLoaded(true);
  }

  return (
    <>
      <Header />
      <AnimatePresence initial={true} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/search/:objectID" element={<ProductDetails />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};
