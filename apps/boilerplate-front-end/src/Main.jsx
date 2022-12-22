import { lazy, Suspense, useEffect, useState } from 'react'

// Algolia Instantsearch components
import { useInstantSearch, useSearchBox } from 'react-instantsearch-hooks-web'

// Algolia Insights
import { InsightsMiddleware } from './config/algoliaInsightEvents'

// Framer-Motion
import { AnimatePresence } from 'framer-motion'

// React router
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'

//Recoil states & values
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// Import help navigation state & config
import {
  isDemoGuideOpen,
  shouldShowAlert,
  showNetworkErorrs,
} from '@/config/demoGuideConfig'
import {
  shouldHaveCartFunctionality,
  shouldHaveDemoGuide,
  shouldHaveQRCode,
} from '@/config/featuresConfig'

// Import Algolia Explain config
import { algoliaExplainToggle } from '@/config/algoliaExplainConfig'

// Import Carousel config
import { isCarouselLoaded } from '@/config/carouselConfig'

// Import Pages and static components
import AlertNavigation from '@/components/demoGuide/AlertNavigation'
import DemoGuide from '@/components/demoGuide/DemoGuide'
import Header from '@/components/header/Header'
import Redirect from '@/components/redirects/Redirect'
import CustomAppliedRules from './components/algoliaExplain/appliedRules/AppliedRules'

import Footer from './components/footer/Footer'
import { DemoGuideOpener } from './components/header/components/DemoGuideOpener'
const HomePage = lazy(() => import('./pages/homepage/HomePage'))
const ProductDetails = lazy(() =>
  import('./pages/productDetailsPage/ProductDetails')
)

import SearchResultsPage from './pages/searchResultsPage/SearchResultsPage'

const CartModal = lazy(() => import('./components/cart/CartModal'))

// Custom hook to prevent body from scrolling
import usePreventScrolling from './hooks/usePreventScrolling'

// Error handler for network errors
import Loader from './components/loader/Loader'
import SearchErrorToast from './utils/ErrorHandler'

import NoResults from './components/noResults/noResults'
import { cartOpen } from './config/cartFunctions'

// QR code functionality
import QRModal from '@/components/qrCode/QRModal'
import { openQR } from '@/config/qrCodeConfig'
import { showRedirectModal } from './config/redirectConfig'

import { navigationStateAtom } from '@/config/navigationConfig'
import {
  segmentConfig,
  segmentObjectSelectedAtom,
} from '@/config/segmentConfig'
import {
  personaConfig,
  personaObjectSelectedAtom,
} from '@/config/personaConfig'

const Main = () => {
  const { results } = useInstantSearch()
  const { query, refine } = useSearchBox()

  // Handle URL search parameters through React Router
  let [searchParams, setSearchParams] = useSearchParams()

  // Remove extra context from URl when a query is present
  useEffect(() => {
    if (query !== '' && searchParams.has('context')) {
      searchParams.delete('context')
      setSearchParams(searchParams)
    }
  }, [searchParams])

  // Current location from react Router
  const location = useLocation()

  // Check if Carousels are ready & loaded on the homepage
  const carouselLoaded = useRecoilValue(isCarouselLoaded)

  // Should the alert badges for the demo guide be shown
  const shouldShowAlertAtom = useRecoilValue(shouldShowAlert)

  // Should the currently applied Algolia rules be shown
  const isAlgoliaExplainActive = useRecoilValue(algoliaExplainToggle)

  // Should the demo guide panel be shown
  const shouldHaveDemoGuideAtom = useRecoilValue(shouldHaveDemoGuide)

  // Should the alert badges for the demo guide be shown
  const shouldDisplayQRCodeGenerator = useRecoilValue(shouldHaveQRCode)
  const qrOpen = useRecoilValue(openQR)

  // State to control the Showing/hiding of the demo guide panel
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen)
  // Value that shows Network Errors to Guide you to the correct Configuration
  const shouldShowNetworkErrors = useRecoilValue(showNetworkErorrs)

  const shouldShowCartIcon = useRecoilValue(shouldHaveCartFunctionality)
  const showCart = useRecoilValue(cartOpen)

  // Handle results routing when no results are found
  const [hasResults, setHasResults] = useState(true)

  // info for reading from URL into state
  const setPersona = useSetRecoilState(personaObjectSelectedAtom)
  const setSegment = useSetRecoilState(segmentObjectSelectedAtom)

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  useEffect(() => {
    const personaFromUrl = searchParams.get('persona')
    if (personaFromUrl !== null) {
      let personaToApply = personaConfig.filter((persona) => {
        return persona.value === personaFromUrl
      })

      if (personaToApply.length > 0) {
        setPersona(personaToApply[0])
      }
    }

    const segmentFromUrl = searchParams.get('segment')
    if (segmentFromUrl !== null) {
      let segmentToApply = segmentConfig.filter((segment) => {
        return segment.label === segmentFromUrl
      })
      if (segmentToApply.length > 0) {
        setSegment(segmentToApply[0])
      }
    }

    const context = searchParams.get('context')
    if (context !== null) {
      setNavigationState({
        type: 'context',
        name: context,
        value: context,
      })
    }
  }, [])

  useEffect(() => {
    // no results, query not empty, and app thinks it has results
    if (results.nbHits === 0 && query !== '' && hasResults) {
      setHasResults(false)
      // has results, query not empty, and app thinks it has no results
    } else if (results.nbHits > 0 && query !== '' && !hasResults) {
      setHasResults(true)
      // query empty and app thinks it has no results
      // in this case there will always be results
    } else if (query === '' && !hasResults) {
      setHasResults(true)
    }
  }, [results, query])

  // Prevent body from scrolling when panel is open
  usePreventScrolling(showDemoGuide)
  return (
    <>
      <InsightsMiddleware />
      {shouldShowNetworkErrors && <SearchErrorToast />}
      <Header />
      {shouldHaveDemoGuideAtom && <DemoGuideOpener />}

      {shouldDisplayQRCodeGenerator && qrOpen && <QRModal />}
      <div className="mainWrapper">
        <Redirect />
        <AnimatePresence>
          {showDemoGuide && (
            <div className="demoGuide-wp">
              <DemoGuide refine={refine} setshowDemoGuide={setshowDemoGuide} />
            </div>
          )}
          {shouldShowCartIcon && showCart && (
            <Suspense fallback={''}>
              <div className="cartModal-wp">
                <CartModal />
              </div>
            </Suspense>
          )}
        </AnimatePresence>
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage query={query} refine={refine} />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              hasResults ? (
                <Suspense fallback={<Loader />}>
                  <SearchResultsPage query={query} />
                </Suspense>
              ) : (
                <Suspense fallback={<Loader />}>
                  <NoResults query={query} />
                </Suspense>
              )
            }
          />
          <Route
            path="/search/:categories"
            element={
              <Suspense fallback={<Loader />}>
                <SearchResultsPage query={query} />
              </Suspense>
            }
            replace={false}
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
        {carouselLoaded && <Footer />}
        {shouldShowAlertAtom && (
          <Suspense fallback={''}>
            <AlertNavigation />
          </Suspense>
        )}
        {isAlgoliaExplainActive && (
          <Suspense fallback={''}>
            <CustomAppliedRules />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default Main
