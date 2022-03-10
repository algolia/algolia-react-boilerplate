// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

// Import Pages and static components
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';

export const Main = () => {
  // hook to help describe the current location for routing
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence initial={true} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* objectID is the unique identifier for an algolia record */}
          <Route path="/search/:objectID" element={<ProductDetails />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};
