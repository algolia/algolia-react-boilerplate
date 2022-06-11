// This is the Search Results Page that you'll see on a phone screen
import { motion } from 'framer-motion';
import { lazy, Suspense, useState } from 'react';
import { lazily } from 'react-lazily';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ChevronRight, ChevronLeft } from '@/assets/svg/SvgIndex';
import { Hit } from '@/components/hits/Hits';
import InfluencerCard from '@/components/hits/InfluencerCard';
import NoCtaCard from '@/components/hits/NoCtaCard';
import SalesCard from '@/components/hits/SalesCard';
import Loader from '@/components/loader/Loader';

// eslint-disable-next-line import/order
import { Configure, Index } from 'react-instantsearch-dom';

// import framer motion

import Redirect from '@/components/redirects/Redirect';
import TrendingFacetValues from '@/components/trending/TrendingFacetValues';
import TrendingProducts from '@/components/trending/TrendingProducts';
import { indexNames, mainIndex } from '@/config/algoliaEnvConfig';
import { framerMotionPage } from '@/config/animationConfig';

// Recoil state to directly access results

// Import Persona State from recoil
import {
  shouldHaveStats,
  shouldHaveInjectedHits,
  shouldHaveSorts,
  shouldHaveTrendingProducts,
  shouldHaveTrendingFacets,
} from '@/config/featuresConfig';
import { hitsPerPage } from '@/config/hitsConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { queryAtom } from '@/config/searchboxConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { sortBy } from '@/config/sortByConfig';
import { customDataByType } from '@/utils';

const CustomClearRefinements = lazy(() =>
  import('@/components/facets/ClearRefinement')
);
const CustomCurrentRefinements = lazy(() =>
  import('@/components/facets/CurrentRefinement')
);
const CustomHitsComponent = lazy(() => import('@/components/hits/CustomHits'));
const CustomSortBy = lazy(() => import('@/components/searchresultpage/SortBy'));
const { CustomStats } = lazily(() =>
  import('@/components/searchresultpage/Stats')
);
const { InjectedHits } = lazily(() =>
  import('@/components/searchresultpage/injected-hits')
);
const FacetsMobile = lazy(() =>
  import('@/components/facets/facetsMobile/FacetsMobile')
);

const SrpMobile = ({ setSrpIsLoaded, srpIsLoaded }) => {
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
  const { value, labelIndex } = useRecoilValue(sortBy);

  // Get states of React Router
  const { state } = useLocation();

  // Persona
  const userToken = useRecoilValue(personaSelectedAtom);

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
    <div
      className={`${
        srpIsLoaded === false ? 'srp-hidden' : 'srp-active'
      } srp-container-mobile`}
    >
      <div
        className={`${
          isMenuOpen ? 'facets-slider-active' : 'facets-slider-inactive'
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
      <motion.div
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
            <CustomClearRefinements />
          </Suspense>
        </div>
        <Configure
          hitsPerPage={injected ? hitsPerPageInjected : hitsPerPageNotInjected}
          analytics={false}
          userToken={userToken}
          enablePersonalization={true}
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
            <InjectedHits
              setSrpIsLoaded={setSrpIsLoaded}
              hitComponent={Hit}
              slots={({ resultsByIndex }) => {
                const { noCta, salesCard } = customDataByType(
                  resultsByIndex?.[index]?.userData
                );
                // eslint-disable-next-line no-lone-blocks
                {
                  // eslint-disable-next-line no-unused-expressions
                  salesCard && setInjected(true);
                }
                return [
                  {
                    getHits: () => [noCta],
                    injectAt: noCta ? noCta.position : null,
                    slotComponent: NoCtaCard,
                  },
                  {
                    getHits: () => [salesCard],
                    injectAt: salesCard ? salesCard.position : null,
                    slotComponent: SalesCard,
                  },
                  {
                    injectAt: ({ position }) => position === 2,
                    // eslint-disable-next-line no-shadow
                    getHits: ({ resultsByIndex }) => {
                      setInjected(true);
                      return resultsByIndex[injectedContentIndex]
                        ? resultsByIndex[injectedContentIndex].hits || []
                        : [];
                    },
                    slotComponent: InfluencerCard,
                  },
                ];
              }}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<Loader />}>
            <CustomHitsComponent setSrpIsLoaded={setSrpIsLoaded} />
          </Suspense>
        )}
        <Redirect />
      </motion.div>
    </div>
  );
};

export default SrpMobile;
