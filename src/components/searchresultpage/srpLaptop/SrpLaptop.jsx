// This is the Search Results Page that you'll see on a normal computer screen
import { lazy, Suspense } from 'react';

// eslint-disable-next-line import/order
import { Configure, Index } from 'react-instantsearch-hooks-web';

import { windowSize } from '@/hooks/useScreenSize';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

// Import Components
import SkeletonLoader from '@/components/hits/components/HitsSkeletonLoader';
import { Hit } from '@/components/hits/Hits';
import WrappedTrendingFacetValues from '@/components/recommend/trending/TrendingFacetValues';
import TrendingProducts from '@/components/recommend/trending/TrendingProducts';
import Redirect from '@/components/redirects/Redirect';
import CustomSortBy from '@/components/sortBy/SortBy';
import { CustomStats } from '@/components/stats/Stats';

import { indexNames, mainIndex } from '@/config/algoliaEnvConfig';
import { isFacetPanelOpen } from '@/config/refinementsConfig';
import {
  shouldHaveInjectedHits,
  shouldHaveSorts,
  shouldHaveStats,
  shouldHaveTrendingFacets,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig';
import { hitsPerPage } from '@/config/hitsConfig';
import { cartOpen } from '@/config/cartFunctions';
import {
  personalizationImpact,
  personaSelectedAtom,
  personaSelectedFiltersAtom,
} from '@/config/personaConfig';
import { queryAtom } from '@/config/searchboxConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { sortBy } from '@/config/sortByConfig';

const CustomClearRefinements = lazy(() =>
  import('@/components/facets/components/ClearRefinement')
);
const CustomCurrentRefinements = lazy(() =>
  import('@/components/facets/components/CurrentRefinement')
);

const GenericRefinementList = lazy(() => import('@/components/facets/Facets'));
const CustomHitsComponent = lazy(() =>
  import('@/components/hits/components/CustomHits')
);

import InjectedHits from '@/components/hits/components/injected-hits/InjectedHits';

//Import scope SCSS
import '../SCSS/searchResultsPage.scss';
import { FilterPicto } from '@/assets/svg/SvgIndex';

import { navigationStateAtom } from '@/config/navigationConfig';
import Modal from '@/components/cart/Modal';

const SrpLaptop = () => {
  // Recoil & React states
  const stats = useRecoilValue(shouldHaveStats);
  const queryState = useRecoilValue(queryAtom);
  const { isDesktop, mobile } = useRecoilValue(windowSize);
  const navigationState = useRecoilValue(navigationStateAtom);
  const showCart = useRecoilValue(cartOpen);

  // Should show injected content or not
  // Defined in config file
  const shouldInjectContent = useRecoilValue(shouldHaveInjectedHits);

  // Get indexes Value
  const index = useRecoilValue(mainIndex);
  const { injectedContentIndex } = useRecoilValue(indexNames);

  // Define Stat Const
  const { hitsPerPageNotInjected } = hitsPerPage;

  // Define Price Sort By Const
  const { labelIndex } = useRecoilValue(sortBy);

  const shouldHaveSortsAtom = useRecoilValue(shouldHaveSorts);

  // Get states of React Router
  const { state } = useLocation();

  // Persona
  const userToken = useRecoilValue(personaSelectedAtom);
  const personalizationFilters = useRecoilValue(personaSelectedFiltersAtom);

  // Segments
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);

  // Trending
  const shouldHaveTrendingProductsValue = useRecoilValue(
    shouldHaveTrendingProducts
  );

  // Trending
  const shouldHaveTrendingFacetsValue = useRecoilValue(
    shouldHaveTrendingFacets
  );

  // Handle the facet panel on mobile
  const [isFacetsPanelOpen, setIsFacetsPanelOpen] =
    useRecoilState(isFacetPanelOpen);

  // Related to next conditional
  let facetName;
  let facetValue;

  // Trending needs to know if you are on category page
  if (navigationState?.type === 'filter' && navigationState?.action !== null) {
    facetName = navigationState.action.split(':')[0];
    facetValue = navigationState.action.split(':')[1].replace(/['"]+/g, '');
  }
  return (
    <>
      {showCart && <Modal isDesktop={isDesktop} mobile={mobile} />}
      {/* Render Recommend component - Trending Products Slider */}
      {/* Change header and maxRecommendations in /config/trendingConfig.js */}
      <div className="recommend">
        {shouldHaveTrendingProductsValue &&
          queryState === '' &&
          navigationState?.type !== 'context' && (
            <TrendingProducts facetName={facetName} facetValue={facetValue} />
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
          } ${isFacetsPanelOpen ? 'srp-container__facets-mobile-active' : ''}`}
        >
          <Suspense fallback={<SkeletonLoader type={'facet'} />}>
            {/* Render Recommend component - Trending Facets */}
            {/* Change config in /config/trendingConfig.js */}
            {shouldHaveTrendingFacetsValue && (
              <WrappedTrendingFacetValues
                attribute="brand"
                facetName={'brand'}
                limit={500}
                facetValue={facetValue}
              />
            )}
            <GenericRefinementList />
          </Suspense>
        </div>

        <div className="srp-container__hits">
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
          <Configure
            hitsPerPage={hitsPerPageNotInjected}
            analytics={false}
            enablePersonalization={true}
            userToken={userToken}
            personalizationImpact={personalizationImpact}
            personalizationFilters={personalizationFilters}
            filters={
              (navigationState?.type === 'filter' ||
                navigationState?.type === 'rawFilter') &&
              navigationState?.action !== null
                ? navigationState.action
                : ''
            }
            optionalFilters={segmentOptionalFilters}
            ruleContexts={
              navigationState?.type === 'context' ? navigationState.action : ''
            }
            query={queryState}
            getRankingInfo={true}
          />

          {/* This is a big ternary, where it injects a card (eg. Sale card) or renders an item */}
          {shouldInjectContent ? (
            <Suspense fallback={<SkeletonLoader type={'hit'} />}>
              <Index indexName={injectedContentIndex}>
                <Configure hitsPerPage={1} page={0} />
              </Index>
              {/* Injected content*/}
              <InjectedHits hitComponent={Hit} />
            </Suspense>
          ) : (
            <Suspense fallback={<SkeletonLoader type={'hit'} />}>
              <CustomHitsComponent />
            </Suspense>
          )}
          <Redirect />
        </div>
      </div>
    </>
  );
};

export default SrpLaptop;
