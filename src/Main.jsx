// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

//Import help navigation state & config
import {
  isDemoGuideOpen,
  shouldShowDemoGuide,
} from './config/helpedNavigation';

// Import Pages and static components
import Header from './components/header/Header';
import HelpNavigation from './components/helpNavigation/HelpNavigation';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AlertNavigation from './components/helpNavigation/AlertNavigation';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';
import { useRecoilValue } from 'recoil';

export const Main = ({ isLoaded }) => {
  const location = useLocation();
  const shouldShowNavigation = useRecoilValue(shouldShowDemoGuide);
  const showHelpNavigation = useRecoilValue(isDemoGuideOpen);

  return (
    <div className={`${isLoaded ? 'visible' : 'hidden'}`}>
      <Header />
      <AnimatePresence>
        {showHelpNavigation && shouldShowNavigation && <HelpNavigation />}
      </AnimatePresence>
      <AnimatePresence initial={true} exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* objectID is the unique identifier for an algolia record */}
          <Route path="/search/:objectID" element={<ProductDetails />} />
        </Routes>
      </AnimatePresence>
      <AlertNavigation />
      <Footer />
    </div>
  );
};
