// This is the Search Results Page that you'll see on a phone screen
import { motion } from 'framer-motion';
import { lazy, Suspense, useState } from 'react';
import { lazily } from 'react-lazily';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ChevronRight, ChevronLeft } from '@/assets/svg/SvgIndex';
import { Hit } from '@/components/hits/Hits';
import InfluencerCard from '@/components/hits/components/InfluencerCard';
import NoCtaCard from '@/components/hits/components/NoCtaCard';
import SalesCard from '@/components/hits/components/SalesCard';
import Loader from '@/components/loader/Loader';

// eslint-disable-next-line import/order
import { Index, Configure } from 'react-instantsearch-hooks-web';

// import framer motion

import Redirect from '@/components/redirects/Redirect';
import TrendingFacetValues from '@/components/recommend/trending/TrendingFacetValues';
import TrendingProducts from '@/components/recommend/trending/TrendingProducts';
import { indexNames, mainIndex } from '@/config/algoliaEnvConfig';
import { framerMotionPage } from '@/config/animationConfig';

import {
  shouldHaveStats,
  shouldHaveInjectedHits,
  shouldHaveSorts,
  shouldHaveTrendingProducts,
  shouldHaveTrendingFacets,
} from '@/config/featuresConfig';
import { hitsPerPage } from '@/config/hitsConfig';
import { personalizationImpact, personaSelectedAtom, personaSelectedFiltersAtom } from '@/config/personaConfig';
import { queryAtom } from '@/config/searchboxConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { sortBy } from '@/config/sortByConfig';

const CustomClearRefinements = lazy(() =>
  import('@/components/facets/components/ClearRefinement')
);
const CustomCurrentRefinements = lazy(() =>
  import('@/components/facets/components/CurrentRefinement')
);
const CustomHitsComponent = lazy(() =>
  import('@/components/hits/components/CustomHits')
);
const CustomSortBy = lazy(() => import('@/components/sortBy/SortBy'));
const { CustomStats } = lazily(() => import('@/components/stats/Stats'));
const { InjectedHits } = lazily(() =>
  import('@/components/hits/components/injected-hits')
);
const FacetsMobile = lazy(() =>
  import('@/components/facets/facetsMobile/FacetsMobile')
);

//Import scope SCSS
import '../SCSS/searchresultspage.scss';

const SrpMobile = () => {
  // Recoil & React states
  const [injected, setInjected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryState = useRecoilValue(queryAtom);

  // Define Stat Const
  const stats = useRecoilValue(shouldHaveStats);
  const shouldHaveSortsAtom = useRecoilValue(shouldHaveSorts);

  const hitsPerPageNotInjected = hitsPerPage.numberNotInjected;
  const hitsPerPageInjected = hitsPerPage.numberInjected;

  // Should show injected content or not
  // Defined in config file
  const shouldInjectContent = useRecoilValue(shouldHaveInjectedHits);

  // Get indexes Value
  const index = useRecoilValue(mainIndex);
  const { injectedContentIndex } = useRecoilValue(indexNames);

  // Define Price Sort By
  const { labelIndex } = useRecoilValue(sortBy);

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

  // Related to next conditional
  let facetName;
  let facetValue;

  // Trending needs to know if you are on category page
  if (state?.type === 'filter' && state?.action !== null) {
    facetName = state.action.split(':')[0];
    facetValue = state.action.split(':')[1].replace(/['"]+/g, '');
  }

  return (
    <div className={'srp-active srp-container-mobile'}>
      <div
        role="menu"
        tabIndex={0}
        className={`${isMenuOpen ? 'facets-slider-active' : 'facets-slider-inactive'
          } facets-slider`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? <ChevronLeft /> : <ChevronRight />}
        <p>Filters</p>
      </div>
      <Suspense fallback={<Loader />}>
        <FacetsMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </Suspense>
      <div
        className="srp-container__hits"
        variants={framerMotionPage}
        initial={framerMotionPage.initial}
        animate={framerMotionPage.animate}
        exit={framerMotionPage.exit}
        transition={framerMotionPage.transition}
      >
        <div className="srp-container__stats-sort">
          {stats && (
            <Suspense fallback={<Loader />}>
              <CustomStats />
            </Suspense>
          )}
          {shouldHaveSortsAtom && (
            <Suspense fallback={<Loader />}>
              <CustomSortBy items={labelIndex} defaultRefinement={index} />
            </Suspense>
          )}
        </div>

        <div className="refinement-container">
          <Suspense fallback={<Loader />}>
            <CustomCurrentRefinements />
            {/* <CustomClearRefinements /> */}
          </Suspense>
        </div>
        <Configure
          hitsPerPage={injected ? hitsPerPageInjected : hitsPerPageNotInjected}
          analytics={false}
          enablePersonalization={true}
          userToken={userToken}
          personalizationImpact={personalizationImpact}
          personalizationFilters={personalizationFilters}
          filters={
            state?.type === 'filter' && state?.action !== null
              ? state.action
              : ''
          }
          optionalFilters={segmentOptionalFilters}
          ruleContexts={state?.type === 'context' ? state.action : ''}
          query={queryState}
          getRankingInfo={true}
        />

        {/* Render Recommend component - Trending Facets */}
        {/* Change config in /config/trendingConfig.js */}
        <div className="recommend">
          {shouldHaveTrendingFacetsValue && (
            <TrendingFacetValues
              facetName={facetName}
              facetValue={facetValue}
              attribute="brand"
            />
          )}
        </div>

        {/* Render Recommend component - Trending Products Slider */}
        {/* Change header and maxRecommendations in /config/trendingConfig.js */}
        <div className="recommend">
          {shouldHaveTrendingProductsValue && (
            <TrendingProducts facetName={facetName} facetValue={facetValue} />
          )}
        </div>

        {shouldInjectContent ? (
          <Suspense fallback={<Loader />}>
            <Index indexName={injectedContentIndex}>
              <Configure hitsPerPage={1} page={0} />
            </Index>
            <InjectedHits hitComponent={Hit} />
          </Suspense>
        ) : (
          <Suspense fallback={<Loader />}>
            <CustomHitsComponent />
          </Suspense>
        )}

        <Redirect />
      </div>
    </div>
  );
};

export default SrpMobile;
