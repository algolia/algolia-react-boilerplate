import { useState } from 'react';

import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';

// application state from config file
import { searchClient } from './config/algoliaEnvConfig';

// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Route, Routes, useLocation } from 'react-router-dom';

//Recoil states & values
import { useRecoilState, useRecoilValue } from 'recoil';

// Import help navigation state & config
import { mainIndex } from './config/algoliaEnvConfig';
import { isRulesSwitchToggle } from './config/appliedRulesConfig';
import { queryAtom } from './config/searchboxConfig';
import {
  isDemoGuideOpen,
  shouldShowAlert,
  shouldShowDemoGuide,
  showNetworkErorrs,
} from '@/config/demoGuideConfig';
import { isCarouselLoaded } from './config/carouselConfig';

// Import Pages and static components
import AlertNavigation from '@/components/demoGuide/AlertNavigation';
import DemoGuide from '@/components/demoGuide/DemoGuide';
import Header from '@/components/header/Header';
import CustomAppliedRules from './components/appliedRules/AppliedRules';
import Footer from './components/footer/Footer';
import { DemoGuideOpener } from './components/header/components/DemoGuideOpener';
import HomePage from './pages/homepage/HomePage';
import ProductDetails from './pages/productDetailsPage/ProductDetails';
import SearchResultsPage from './pages/searchResultPage/SearchResultsPage';

// Custom hook to prevent body from scrolling
import usePreventScrolling from './hooks/usePreventScrolling';
import SearchErrorToast from './utils/ErrorHandler';
import CustomSkeleton from './components/skeletons/CustomSkeleton';

export const Main = () => {
  const index = useRecoilValue(mainIndex);

  const [isMounted, setIsMounted] = useState(false);

  const location = useLocation();

  const queryState = useRecoilValue(queryAtom);

  // Check if Carousels are ready & loaded on the homepage
  const carouselLoaded = useRecoilValue(isCarouselLoaded);

  // Should the alert badges for the demo guide be shown
  const shouldShowAlertAtom = useRecoilValue(shouldShowAlert);

  // Show rules applied panel when switch on in the demo guide panel
  const isRulesSwitchToggleChecked = useRecoilValue(isRulesSwitchToggle);

  // Show the feature of guided panel for SE should be in this app
  const shouldShowNavigation = useRecoilValue(shouldShowDemoGuide);

  // State that show/hide the panel if click on the guide btn
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen);

  // Value that shows Network Errors to Guide you to the correct Configuration
  const isNetworkErorrs = useRecoilValue(showNetworkErorrs);

  // Prevent body from scrolling when panel is open
  usePreventScrolling(showDemoGuide);

  return (
    <InstantSearch searchClient={searchClient} indexName={index}>
      {isNetworkErorrs && <SearchErrorToast />}

      <div className="visible">
        <Configure query={queryState} />
        <Header />
        <DemoGuideOpener />
        <AnimatePresence>
          {showDemoGuide && shouldShowNavigation && (
            <DemoGuide setshowDemoGuide={setshowDemoGuide} />
          )}
        </AnimatePresence>
        <AnimatePresence initial={true}>
          <Routes key={location.pathname} location={location}>
            <Route
              path="/"
              element={<HomePage setIsMounted={setIsMounted} />}
            />
            <Route
              path="/search"
              element={<SearchResultsPage setIsMounted={setIsMounted} />}
            />
            {/* objectID is the unique identifier for an algolia record */}
            <Route path="/search/:objectID" element={<ProductDetails />} />
          </Routes>
          {carouselLoaded && <Footer />}
        </AnimatePresence>
        {shouldShowAlertAtom && <AlertNavigation />}
        {isRulesSwitchToggleChecked && <CustomAppliedRules />}
      </div>
    </InstantSearch>
  );
};
