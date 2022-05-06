import { useEffect, useState } from 'react';

import { InstantSearch } from 'react-instantsearch-dom';

// application state from config file
import { searchClient } from './config/algoliaEnvConfig';

// Framer-Motion
import { AnimatePresence } from 'framer-motion';

// React router
import { Routes, Route, useLocation } from 'react-router-dom';

//Recoil states & values
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

//Import help navigation state & config
import {
  isDemoGuideOpen,
  shouldShowDemoGuide,
  shouldShowAlert,
} from '@/config/demoGuideConfig';

import { isRulesSwitchToggle } from './config/appliedRulesConfig';

import { mainIndex } from './config/algoliaEnvConfig';

// // Allows logging and manipulation of algolia results etc.
import CustomStateResults from './components/stateResults/stateResults';

// Import Pages and static components
import Header from '@/components/header/Header';
import DemoGuide from '@/components/demoGuide/DemoGuide';
import { DemoGuideOpener } from './components/header/components/DemoGuideOpener';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AlertNavigation from '@/components/demoGuide/AlertNavigation';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/footer/Footer';
import CustomAppliedRules from './components/appliedRules/AppliedRules';

// Custom hook to prevent body from scrolling
import usePreventScrolling from './hooks/usePreventScrolling';

export const Main = ({ isLoaded }) => {
  const index = useRecoilValue(mainIndex);
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
      <CustomStateResults />
      <div className={`${isLoaded ? 'visible' : 'hidden'}`}>
        <Header />
        <DemoGuideOpener />
        <AnimatePresence>
          {showDemoGuide && shouldShowNavigation && (
            <DemoGuide setshowDemoGuide={setshowDemoGuide} />
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
        {shouldShowAlertAtom && <AlertNavigation />}
        <Footer />
        {isRulesSwitchToggleChecked && <CustomAppliedRules />}
      </div>
    </InstantSearch>
  );
};
