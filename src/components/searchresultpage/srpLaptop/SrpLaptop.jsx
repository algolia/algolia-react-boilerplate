// This is the Search Results Page that you'll see on a normal computer screen
import { lazy, Suspense, useState } from 'react';
import { Configure, Index, Pagination } from 'react-instantsearch-dom';
import { lazily } from 'react-lazily';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// Import Components
import FacetsSkeletonLoader from '@/components/facets/components/FacetsSkeletonLoader';
import InfluencerCard from '@/components/hits/components/InfluencerCard';
import NoCtaCard from '@/components/hits/components/NoCtaCard';
import SalesCard from '@/components/hits/components/SalesCard';
import { Hit } from '@/components/hits/Hits';
import WrappedTrendingFacetValues from '@/components/recommend/trending/TrendingFacetValues';
import TrendingProducts from '@/components/recommend/trending/TrendingProducts';
import Redirect from '@/components/redirects/Redirect';
import { indexNames, mainIndex } from '@/config/algoliaEnvConfig';
import {
  shouldHaveInjectedHits,
  shouldHaveSorts,
  shouldHaveStats,
  shouldHaveTrendingFacets,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig';
import { hitsPerPage } from '@/config/hitsConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { queryAtom } from '@/config/searchboxConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { sortBy } from '@/config/sortByConfig';
import { customDataByType } from '@/utils';
import SkeletonLoader from '../../hits/components/HitsSkeletonLoader';

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
const CustomSortBy = lazy(() => import('@/components/sortBy/SortBy'));
const { CustomStats } = lazily(() => import('@/components/stats/Stats'));
const { InjectedHits } = lazily(() =>
  import('@/components/hits/components/injected-hits')
);

//Import scope SCSS
import '../SCSS/searchresultspage.scss';

const SrpLaptop = () => {
  // Recoil & React states
  const stats = useRecoilValue(shouldHaveStats);
  const queryState = useRecoilValue(queryAtom);
  const [injected, setInjected] = useState(false);

  // Should show injected content or not
  // Defined in config file
  const shouldInjectContent = useRecoilValue(shouldHaveInjectedHits);

  // Get indexes Value
  const index = useRecoilValue(mainIndex);
  const { injectedContentIndex } = useRecoilValue(indexNames);

  // Define Stat Const
  const { hitsPerPageNotInjected, hitsPerPageInjected } = hitsPerPage;

  // Define Price Sort By Const
  const { labelIndex } = useRecoilValue(sortBy);

  const shouldHaveSortsAtom = useRecoilValue(shouldHaveSorts);

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
    <>
      {/* Render Recommend component - Trending Products Slider */}
      {/* Change header and maxRecommendations in /config/trendingConfig.js */}
      <div className="recommend">
        {shouldHaveTrendingProductsValue &&
          queryState === '' &&
          state?.type !== 'context' && (
            <TrendingProducts facetName={facetName} facetValue={facetValue} />
          )}
      </div>
      <div className="srp-active srp-container">
        <div className="srp-container__facets">
          <Suspense fallback={<FacetsSkeletonLoader />}>
            {/* Render Recommend component - Trending Facets */}
            {/* Change config in /config/trendingConfig.js */}
            <div className="">
              {shouldHaveTrendingFacetsValue && (
                <WrappedTrendingFacetValues
                  attribute="brand"
                  facetName={'brand'}
                  limit={500}
                  facetValue={facetValue}
                />
              )}
            </div>
            <GenericRefinementList />
          </Suspense>
        </div>
        <div className="srp-container__hits">
          {/* This is above the items and shows the Algolia search speed and the sorting options (eg. price asc) */}
          <div className="srp-container__stats-sort">
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
            hitsPerPage={
              injected ? hitsPerPageInjected : hitsPerPageNotInjected
            }
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
            query={queryState && queryState}
            getRankingInfo={true}
          />
          {/* This is a big ternary, where it injects a card (eg. Sale card) or renders an item */}

          {shouldInjectContent ? (
            <Suspense fallback={<SkeletonLoader />}>
              <Index indexName={injectedContentIndex}>
                <Configure hitsPerPage={1} page={0} />
              </Index>
              <InjectedHits
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
            <Suspense fallback={<SkeletonLoader />}>
              <CustomHitsComponent />
            </Suspense>
          )}
          <Pagination />
          <Redirect />
        </div>
      </div>
    </>
  );
};

export default SrpLaptop;
