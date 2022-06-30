import { InstantSearch } from 'react-instantsearch-hooks-web';

// application state from config file
import { searchClient } from './config/algoliaEnvConfig';

// Framer-Motion
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// React router
import { Route, Routes, useLocation } from 'react-router-dom';

//Recoil states & values
import { useRecoilState, useRecoilValue } from 'recoil';

// Import help navigation state & config

import { isRulesSwitchToggle } from './config/appliedRulesConfig';

import { mainIndex } from './config/algoliaEnvConfig';

// // Allows logging and manipulation of algolia results etc.

// Import Pages and static components
import AlertNavigation from '@/components/demoGuide/AlertNavigation';
import DemoGuide from '@/components/demoGuide/DemoGuide';
import Header from '@/components/header/Header';
import CustomAppliedRules from './components/appliedRules/AppliedRules';
import Footer from './components/footer/Footer';
import { DemoGuideOpener } from './components/header/components/DemoGuideOpener';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import SearchResultsPage from './pages/SearchResultsPage';

// Custom hook to prevent body from scrolling
import {
  isDemoGuideOpen, shouldShowAlert, shouldShowDemoGuide
} from '@/config/demoGuideConfig';
import usePreventScrolling from './hooks/usePreventScrolling';

export const Main = () => {
  const index = useRecoilValue(mainIndex);
  const [isMounted, setIsMounted] = useState(false);
  // const [index, setIndex] = useState(mainIndex);
  const location = useLocation();

  // Should the alert badges for the demo guide be shown
  const shouldShowAlertAtom = useRecoilValue(shouldShowAlert);

  // Show rules applied panel when switch on in the demo guide panel
  const isRulesSwitchToggleChecked = useRecoilValue(isRulesSwitchToggle);

  // Should the feature of guided panel for SE should be in this app
  const shouldShowNavigation = useRecoilValue(shouldShowDemoGuide);
  // State that show/hide the panel if click on the guide btn
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen);
  // Prevent body from scrolling when panel is open
  usePreventScrolling(showDemoGuide);

  return (
    <InstantSearch searchClient={searchClient} indexName={index}>
      <div className="visible">
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
          {isMounted && <Footer />}
        </AnimatePresence>
        {shouldShowAlertAtom && <AlertNavigation />}
        {isRulesSwitchToggleChecked && <CustomAppliedRules />}
      </div>
    </InstantSearch>
  );
};
