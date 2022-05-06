// This is the Search Results Page that you'll see on a normal computer screen
import { lazy, useState, Suspense } from 'react';
import { lazily } from 'react-lazily';

import Loader from '@/components/loader/Loader';

// eslint-disable-next-line import/order
import { Pagination, Configure, Index } from 'react-instantsearch-dom';

import { useLocation } from 'react-router-dom';

// import framer motion
import { motion } from 'framer-motion';
import { framerMotionPage, framerMotionFacet } from '@/config/animationConfig';

// Recoil state to directly access results
import { useRecoilValue } from 'recoil';

import {
  shouldHaveStats,
  shouldHaveInjectedHits,
  shouldHaveSorts,
} from '@/config/featuresConfig';
import { sortBy } from '@/config/sortByConfig';
import { queryAtom } from '@/config/searchboxConfig';
import { mainIndex, indexNames } from '@/config/algoliaEnvConfig';

// Import Persona State from recoil
import { personaSelectedAtom } from '@/config/personaConfig';

// Import Segment State from recoil
import { segmentSelectedAtom } from '@/config/segmentConfig';

// Import Components
import Redirect from '@/components/redirects/Redirect';
const CustomClearRefinements = lazy(() =>
  import('@/components/facets/ClearRefinement')
);
const CustomCurrentRefinements = lazy(() =>
  import('@/components/facets/CurrentRefinement')
);
const GenericRefinementList = lazy(() => import('@/components/facets/Facets'));
const CustomHitsComponent = lazy(() => import('@/components/hits/CustomHits'));
import NoCtaCard from '@/components/hits/NoCtaCard';
import { Hit } from '@/components/hits/Hits';
import InfluencerCard from '@/components/hits/InfluencerCard';
import SalesCard from '@/components/hits/SalesCard';
const CustomSortBy = lazy(() => import('@/components/searchresultpage/SortBy'));
const { CustomStats } = lazily(() =>
  import('@/components/searchresultpage/Stats')
);
const { InjectedHits } = lazily(() =>
  import('@/components/searchresultpage/injected-hits')
);

// Handle the number of hits per page
import { hitsPerPage } from '@/config/hitsConfig';

// Import Config File
import { customDataByType } from '@/utils';

const SrpLaptop = () => {
  // Recoil & React states

  const stats = useRecoilValue(shouldHaveStats);
  const queryState = useRecoilValue(queryAtom);
  const [injected, setInjected] = useState(false);

  // Should show injected content or not
  // Defined in config file
  const shouldInjectContent = useRecoilValue(shouldHaveInjectedHits);
  //Get indexes Value
  const index = useRecoilValue(mainIndex);
  const { injectedContentIndex } = useRecoilValue(indexNames);

  // Define Stat Const
  const { hitsPerPageNotInjected, hitsPerPageInjected } = hitsPerPage;

  // Define Price Sort By Const
  const { value, labelIndex } = useRecoilValue(sortBy);

  const shouldHaveSortsAtom = useRecoilValue(shouldHaveSorts);

  // Get states of React Router
  const { state } = useLocation();

  // Persona
  const userToken = useRecoilValue(personaSelectedAtom);

  // Segments
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);

  return (
    <div className="srp-container">
      <motion.div
        variants={framerMotionFacet}
        initial={framerMotionFacet.initial}
        animate={framerMotionFacet.animate}
        exit={framerMotionFacet.exit}
        transition={framerMotionFacet.transition}
        className="srp-container__facets"
      >
        <Suspense fallback={<Loader />}>
          <GenericRefinementList />
        </Suspense>
      </motion.div>
      <motion.div
        className="srp-container__hits"
        variants={framerMotionPage}
        initial={framerMotionPage.initial}
        animate={framerMotionPage.animate}
        exit={framerMotionPage.exit}
        transition={framerMotionPage.transition}
      >
        {/* This is above the items and shows the Algolia search speed and the sorting options (eg. price asc) */}
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
        {/* Refinements, to the left of the items, including a list of currently selected refinements */}
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
          query={queryState && queryState}
          getRankingInfo={true}
        />
        {/* This is a big ternary, where it injects a card (eg. Sale card) or renders an item */}
        {shouldInjectContent ? (
          <Suspense fallback={<Loader />}>
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
          <Suspense fallback={<Loader />}>
            <CustomHitsComponent />
          </Suspense>
        )}
        <Pagination />
        <Redirect />
      </motion.div>
    </div>
  );
};

export default SrpLaptop;
