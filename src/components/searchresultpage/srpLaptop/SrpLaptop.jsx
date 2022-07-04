// This is the Search Results Page that you'll see on a normal computer screen
import { lazy, useState, Suspense } from 'react';
import { Pagination, Configure, Index } from 'react-instantsearch-dom';
import { lazily } from 'react-lazily';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// Import Components
import SkeletonLoader from '../../hits/HitsSkeletonLoader';
import { Hit } from '@/components/hits/Hits';
import InfluencerCard from '@/components/hits/InfluencerCard';
import NoCtaCard from '@/components/hits/NoCtaCard';
import SalesCard from '@/components/hits/SalesCard';
import Redirect from '@/components/redirects/Redirect';
import WrappedTrendingFacetValues from '@/components/trending/TrendingFacetValues';
import TrendingProducts from '@/components/trending/TrendingProducts';
import { mainIndex, indexNames } from '@/config/algoliaEnvConfig';
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

const GenericRefinementList = lazy(() => import('@/components/facets/Facets'));
const CustomHitsComponent = lazy(() => import('@/components/hits/CustomHits'));
const CustomSortBy = lazy(() => import('@/components/searchresultpage/SortBy'));
const { CustomStats } = lazily(() =>
  import('@/components/searchresultpage/Stats')
);
const { InjectedHits } = lazily(() =>
  import('@/components/searchresultpage/injected-hits')
);

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
        {shouldHaveTrendingProductsValue && queryState === "" && (
          <TrendingProducts facetName={facetName} facetValue={facetValue} />
        )}
      </div>
      <div
        className='srp-active srp-container'
      >
        <div className="srp-container__facets">
          <Suspense fallback={<SkeletonLoader type={"facet"} />}>

            {/* Render Recommend component - Trending Facets */}
            {/* Change config in /config/trendingConfig.js */}
            {shouldHaveTrendingFacetsValue && (
              <WrappedTrendingFacetValues
                attribute="brand"
                facetName={"brand"}
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


          {false ? (
            <Suspense fallback={<SkeletonLoader type={"hit"} />}>
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
            <Suspense fallback={<SkeletonLoader type={"hit"}/>}>
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
