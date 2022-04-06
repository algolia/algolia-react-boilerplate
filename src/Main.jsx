// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

//Recoil states & values
import { useRecoilValue, useRecoilState } from 'recoil';

//Import help navigation state & config
import { isDemoGuideOpen, shouldShowDemoGuide } from './config/demoGuideConfig';

// Import Pages and static components
import Header from './components/header/Header';
import DemoGuide from './components/demoGuide/DemoGuide';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AlertNavigation from './components/helpNavigation/AlertNavigation';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';

// Custom hook to prevent body from scrolling
import usePreventScrolling from './hooks/usePreventScrolling';

export const Main = ({ isLoaded }) => {
  const location = useLocation();
  // Should the feature of guided panel for SE should be in this app
  const shouldShowNavigation = useRecoilValue(shouldShowDemoGuide);
  // State that show/hide the panel if click on the guide btn
  const [showHelpNavigation, setShowHelpNavigation] =
    useRecoilState(isDemoGuideOpen);
  // Prevent body from scrolling when panel is open
  usePreventScrolling(showHelpNavigation);

  return (
    <div className={`${isLoaded ? 'visible' : 'hidden'}`}>
      <Header />
      <AnimatePresence>
        {showHelpNavigation && shouldShowNavigation && (
          <DemoGuide setShowHelpNavigation={setShowHelpNavigation} />
        )}
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
