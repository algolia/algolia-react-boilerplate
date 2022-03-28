import React from 'react';
// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

// Import Pages
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';

export const Main = ({ isLoaded }) => {
  const location = useLocation();
  return (
    <div className={`${isLoaded ? 'visible' : 'hidden'}`}>
      <Header />
      <AnimatePresence initial={true} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/search/:objectID" element={<ProductDetails />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};
