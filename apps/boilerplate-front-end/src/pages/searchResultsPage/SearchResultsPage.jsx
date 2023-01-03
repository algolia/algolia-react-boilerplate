// This is the Search Results Page that you'll see on a normal computer screen
import { Fragment, lazy, Suspense, useEffect, useState, memo } from 'react'

// eslint-disable-next-line import/order
import {
  Configure,
  Index,
  useInfiniteHits,
  useInstantSearch,
  useHierarchicalMenu,
  useRefinementList,
} from 'react-instantsearch-hooks-web'

//import react router
import { useSearchParams } from 'react-router-dom'

// Custom Hooks
import { windowSize } from '@/hooks/useScreenSize'

// State Manager Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// Import Components
import LandingPageHeader from '@/components/landingPage/LandingPageHeader'
import SkeletonLoader from '@/components/hits/components/HitsSkeletonLoader'
import WrappedTrendingFacetValues from '@/components/recommend/trending/TrendingFacetValues'
import TrendingProducts from '@/components/recommend/trending/TrendingProducts'
import CustomSortBy from '@/components/sortBy/SortBy'
import { CustomStats } from '@/components/stats/Stats'
const CustomClearRefinements = lazy(() =>
  import('@/components/facets/components/ClearRefinement')
)
const CustomCurrentRefinements = lazy(() =>
  import('@/components/facets/components/CurrentRefinement')
)
const GenericRefinementList = lazy(() => import('@/components/facets/Facets'))

// Configuration
import { indexNames, mainIndex } from '@/config/algoliaEnvConfig'
import {
  shouldHaveInjectedHits,
  shouldHaveSorts,
  shouldHaveStats,
  shouldHaveTrendingFacets,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig'
import { setNbHitsAtom } from '@/config/hitsConfig'
import {
  personalizationImpact,
  personaObjectSelectedAtom,
} from '@/config/personaConfig'
import { isFacetPanelOpen } from '@/config/refinementsConfig'

import { segmentObjectSelectedAtom } from '@/config/segmentConfig'
import { sortBy } from '@/config/sortByConfig'

// SVG
import { ChevronLeft, FilterPicto } from '@/assets/svg/SvgIndex'

import CustomHits from '@/components/hits/components/CustomHits'
import InjectedHits from '@/components/hits/components/injected-hits/InjectedHits'

import Banner from '@/components/banners/Banner'

import { shouldHaveInjectedBanners } from '@/config/featuresConfig'

//Import scope SCSS
import '@/pages/searchResultsPage/searchResultsPage.scss'
import { useTranslation } from 'react-i18next'

import {
  categoryPageFilterAttribute,
  isHierarchicalFilterAttribute,
  navigationStateAtom,
} from '@/config/navigationConfig'

const SearchResultsPage = ({ query }) => {
  let [categoryPageId, setCategoryPageId] = useState('')
  const { indexUiState } = useInstantSearch()

  // state to hold any context passed in as a URL param
  const [extraContext, setExtraContext] = useState('')

  const { hits, isLastPage, showMore, sendEvent } = useInfiniteHits()

  const setNbHit = useSetRecoilState(setNbHitsAtom)
  setNbHit(hits.length)

  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(shouldHaveInjectedBanners)

  const [isTrendingItems, setIsTrendingItems] = useState(true)

  // Recoil & React states
  const stats = useRecoilValue(shouldHaveStats)
  const { isDesktop } = useRecoilValue(windowSize)
  const navigationState = useRecoilValue(navigationStateAtom)

  // Should show injected content or not
  const shouldInjectContent = useRecoilValue(shouldHaveInjectedHits)

  // Get indexes Value
  const index = useRecoilValue(mainIndex)
  const { injectedContentIndex } = useRecoilValue(indexNames)

  // Define Price Sort By Const
  const { labelIndex } = useRecoilValue(sortBy)

  const shouldHaveSortsAtom = useRecoilValue(shouldHaveSorts)

  // Persona
  const persona = useRecoilValue(personaObjectSelectedAtom)

  // Segments
  const segment = useRecoilValue(segmentObjectSelectedAtom)

  // Trending
  const shouldHaveTrendingProductsValue = useRecoilValue(
    shouldHaveTrendingProducts
  )

  // Trending
  const shouldHaveTrendingFacetsValue = useRecoilValue(shouldHaveTrendingFacets)

  // Handle the facet panel on mobile
  const [isFacetsPanelOpen, setIsFacetsPanelOpen] =
    useRecoilState(isFacetPanelOpen)

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'srp',
  })

  // Handle URL search parameters through React Router
  let [searchParams, setSearchParams] = useSearchParams()

  // Set the IS state for the category page filter attribute into local state for recommend
  useEffect(() => {
    let hierarchicalWidget = 'hierarchicalMenu'
    let normalWidget = 'refinementList'

    let widgetToUse = isHierarchicalFilterAttribute
      ? hierarchicalWidget
      : normalWidget

    if (
      indexUiState[widgetToUse]?.[categoryPageFilterAttribute] !== undefined
    ) {
      setCategoryPageId(
        indexUiState[widgetToUse][categoryPageFilterAttribute][0]
      )
    } else {
      setCategoryPageId('')
    }
  }, [indexUiState])

  let refine = null

  // Must use different IS widget if category page attribute is hierarchical
  if (isHierarchicalFilterAttribute) {
    const { refine: hierarchicalRefine } = useHierarchicalMenu({
      attributes: [categoryPageFilterAttribute],
    })
    refine = hierarchicalRefine
  } else {
    const { refine: normalRefine } = useRefinementList({
      attribute: categoryPageFilterAttribute,
    })
    refine = normalRefine
  }

  // Extract extra context if passed in from the URL
  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      if (key === 'category') {
        refine(value)
      } else if (key === 'filter') {
        refine('')
      }

      if (key === 'context' && extraContext !== value) {
        setExtraContext(value)
      } else {
        setExtraContext('')
      }
    }
  }, [searchParams])

  // Handle the possible combination of rule contexts
  const buildRuleContexts = () => {
    if (navigationState?.type === 'context' && extraContext === '') {
      return navigationState.action
    } else if (extraContext !== '') {
      return extraContext
    }
  }

  let configureProps = {
    analytics: false,
    clickAnalytics: true,
    enablePersonalization: true,
    userToken: persona.value,
    personalizationImpact: personalizationImpact,
    personalizationFilters: persona.personalizationFilters,
    filters:
      navigationState?.type === 'filter' && navigationState?.value !== null
        ? navigationState.value
        : '',
    optionalFilters: segment.value,
    ruleContexts: buildRuleContexts(),
    getRankingInfo: true,
  }

  return (
    <>
      {/* if context is passed in from the URL, expect to build a landing page header */}
      {extraContext !== '' && <LandingPageHeader />}

      {/* if banners are turned on, and there is no landing page, try to render a banner if an algolia rule requests */}
      {shouldDisplayBanners && extraContext === '' && <Banner />}

      {/* Render Recommend component - Trending Products Slider */}
      {/* Change header and maxRecommendations in /config/trendingConfig.js */}
      <Fragment>
        <div
          className={!isDesktop ? 'recommend recommend-mobile' : 'recommend'}
        >
          {shouldHaveTrendingProductsValue &&
            query === '' &&
            navigationState?.type !== 'context' && (
              <div
                className="recommend__hideTrendingItemBtn"
                onClick={() => {
                  setIsTrendingItems(!isTrendingItems)
                }}
              >
                <ChevronLeft />
                {isTrendingItems ? (
                  <p>{t('hideTrendingItems')}</p>
                ) : (
                  <p>{t('showTrendingItems')}</p>
                )}
              </div>
            )}

          {shouldHaveTrendingProductsValue &&
            isTrendingItems &&
            query === '' &&
            navigationState?.type !== 'context' &&
            navigationState?.type !== 'filter' && (
              <Suspense>
                {categoryPageId !== '' ? (
                  <TrendingProducts
                    facetName={categoryPageFilterAttribute}
                    facetValue={categoryPageId}
                  />
                ) : (
                  <TrendingProducts />
                )}
              </Suspense>
            )}
        </div>

        <div
          className={` ${
            !isDesktop ? 'srp-container-mobile' : ''
          } srp-active srp-container`}
        >
          <div
            className={`${
              !isDesktop
                ? 'srp-container__facets-mobile'
                : 'srp-container__facets'
            } ${
              isFacetsPanelOpen ? 'srp-container__facets-mobile-active' : ''
            }`}
          >
            {/* Render Recommend component - Trending Facets */}
            {/* Change config in /config/trendingConfig.js */}
            {shouldHaveTrendingFacetsValue && (
              <WrappedTrendingFacetValues
                attribute="brand"
                facetName="brand"
                limit={500}
              />
            )}
            <GenericRefinementList />
          </div>

          <div className="srp-container__hits">
            {query && query.trim() !== '' && (
              <div className="srp-container__searchInfos">
                <p>Showing results for: </p>
                <p>"{query}"</p>
              </div>
            )}
            {/* This is above the items and shows the Algolia search speed and the sorting options (eg. price asc) */}
            <div className="srp-container__stats-sort">
              {!isDesktop && (
                <div
                  className={
                    isFacetsPanelOpen
                      ? 'srp-container__filterPicto-active'
                      : 'srp-container__filterPicto'
                  }
                  onClick={() => setIsFacetsPanelOpen(!isFacetsPanelOpen)}
                >
                  <FilterPicto />
                </div>
              )}
              {stats && (
                <Suspense fallback={''}>
                  <CustomStats />
                </Suspense>
              )}
              {shouldHaveSortsAtom && (
                <Suspense fallback={''}>
                  <CustomSortBy items={labelIndex} defaultRefinement={index} />
                </Suspense>
              )}
            </div>
            {/* Refinements, to the left of the items, including a list of currently selected refinements */}
            <div className="refinement-container">
              <Suspense fallback={''}>
                <CustomCurrentRefinements />
                <CustomClearRefinements />
              </Suspense>
            </div>
            <Configure {...configureProps} />
            {/* Render the Injected Hits component or the Standard Hits component */}
            {shouldInjectContent ? (
              <Suspense fallback={<SkeletonLoader type={'hit'} />}>
                <Index indexName={injectedContentIndex}>
                  <Configure hitsPerPage={1} page={0} />
                </Index>
                {/* Injected content*/}
                <InjectedHits
                  hits={hits}
                  isLastPage={isLastPage}
                  showMore={showMore}
                  sendEvent={sendEvent}
                />
              </Suspense>
            ) : (
              <Suspense fallback={<SkeletonLoader type={'hit'} />}>
                <CustomHits
                  hits={hits}
                  isLastPage={isLastPage}
                  showMore={showMore}
                  sendEvent={sendEvent}
                />
              </Suspense>
            )}
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default memo(SearchResultsPage)
