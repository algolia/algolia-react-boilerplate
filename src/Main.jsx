import { lazy, Suspense } from 'react';

// Algolia Instantsearch components
import { Configure, InstantSearch } from 'react-instantsearch-hooks-web';

// Algolia API client
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
  showNetworkErorrs,
} from '@/config/demoGuideConfig';
import { shouldHaveDemoGuide } from '@/config/featuresConfig';
import { isCarouselLoaded } from './config/carouselConfig';

// Import Pages and static components
import AlertNavigation from '@/components/demoGuide/AlertNavigation';

import DemoGuide from '@/components/demoGuide/DemoGuide';
import Header from '@/components/header/Header';
import CustomAppliedRules from './components/appliedRules/AppliedRules';

import Footer from './components/footer/NewFooter';
import { DemoGuideOpener } from './components/header/components/DemoGuideOpener';
const HomePage = lazy(() => import('./pages/homepage/HomePage'));
// import HomePage from './pages/homepage/HomePage';
// import ProductDetails from './pages/productDetailsPage/ProductDetails';
const ProductDetails = lazy(() =>
  import('./pages/productDetailsPage/ProductDetails')
);
const SearchResultsPage = lazy(() =>
  import('./pages/searchResultPage/SearchResultsPage')
);
// import SearchResultsPage from './pages/searchResultPage/SearchResultsPage';

// Custom hook to prevent body from scrolling
import usePreventScrolling from './hooks/usePreventScrolling';

// Error handler for network errors
import SearchErrorToast from './utils/ErrorHandler';
import Loader from './components/loader/Loader';

import clamp from './utils/clampCalcFunction';

export const Main = () => {
  // Index to make the main search queries to
  const index = useRecoilValue(mainIndex);

  // Current location from react Router
  const location = useLocation();

  // Current query from config atom
  const queryState = useRecoilValue(queryAtom);

  // Check if Carousels are ready & loaded on the homepage
  const carouselLoaded = useRecoilValue(isCarouselLoaded);

  // Should the alert badges for the demo guide be shown
  const shouldShowAlertAtom = useRecoilValue(shouldShowAlert);

  // Should the currently applied Algolia rules be shown
  const shouldShowAppliedRules = useRecoilValue(isRulesSwitchToggle);

  // Should the demo guide panel be shown
  const shouldHaveDemoGuideAtom = useRecoilValue(shouldHaveDemoGuide);

  // State to control the Showing/hiding of the demo guide panel
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen);

  // Value that shows Network Errors to Guide you to the correct Configuration
  const shouldShowNetworkErrors = useRecoilValue(showNetworkErorrs);

  // Prevent body from scrolling when panel is open
  usePreventScrolling(showDemoGuide);

  clamp(1, 2, 820, 1440);

  return (
    <InstantSearch searchClient={searchClient} indexName={index}>
      {shouldShowNetworkErrors && <SearchErrorToast />}

      <div className="mainWrapper">
        {/* TODO: Check if this configure is used for anything */}
        <Configure query={queryState} />
        <Header />
        {shouldHaveDemoGuideAtom && <DemoGuideOpener />}
        <AnimatePresence>
          {showDemoGuide && <DemoGuide setshowDemoGuide={setshowDemoGuide} />}
        </AnimatePresence>
        <AnimatePresence initial={true}>
          <Routes key={location.pathname} location={location}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/search"
              element={
                <Suspense fallback={<Loader />}>
                  <SearchResultsPage />
                </Suspense>
              }
            />
            <Route
              path="/search/:categories"
              element={
                <Suspense fallback={<Loader />}>
                  <SearchResultsPage />
                </Suspense>
              }
            />
            {/* objectID is the unique identifier for an algolia record */}
            <Route
              path="/search/product/:objectID"
              element={
                <Suspense fallback={<Loader />}>
                  <ProductDetails />
                </Suspense>
              }
            />
          </Routes>
          {/* NB disabled logic to render footer */}
          {/* To avoid CLS, load in the footer after the carousels render */}
          {/* {carouselLoaded && <Footer />} */}
          <Footer />
        </AnimatePresence>
        {shouldShowAlertAtom && (
          <Suspense fallback={''}>
            <AlertNavigation />
          </Suspense>
        )}
        {shouldShowAppliedRules && (
          <Suspense fallback={''}>
            <CustomAppliedRules />
          </Suspense>
        )}
      </div>
    </InstantSearch>
  );
};
