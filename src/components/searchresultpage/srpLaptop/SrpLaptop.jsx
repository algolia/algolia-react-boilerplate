// This is the Search Results Page that you'll see on a normal computer screen
import {lazy, useState, Suspense } from 'react';
import { lazily } from 'react-lazily';

// eslint-disable-next-line import/order
import { Pagination, Configure, Index } from 'react-instantsearch-dom';

import { useLocation } from 'react-router-dom';

// import framer motion
import { motion } from 'framer-motion';
import { framerMotionPage, framerMotionFacet } from '@/config/animationConfig';

// Recoil state to directly access results
import { useRecoilValue } from 'recoil';

import { shouldHaveStats, shouldHaveInjectedHits } from '@/config/featuresConfig';
import { sortBy } from '@/config/sortByConfig';
import { queryAtom } from '@/config/searchboxConfig';

// Import Persona State from recoil
import { personaSelectedAtom } from '@/config/personaConfig';

// Import Components
const CustomClearRefinements = lazy(() => import('@/components/facets/ClearRefinement'));
const CustomCurrentRefinements = lazy(() => import('@/components/facets/CurrentRefinement'));
const GenericRefinementList = lazy(() => import('@/components/facets/Facets'));
const CustomHitsComponent = lazy(() => import('@/components/hits/CustomHits'));
import NoCtaCard from '@/components/hits/NoCtaCard';
import { Hit } from '@/components/hits/Hits';
import InfluencerCard from '@/components/hits/InfluencerCard';
import SalesCard from '@/components/hits/SalesCard';
const CustomSortBy = lazy(() => import('@/components/searchresultpage/SortBy'));
const { CustomStats } = lazily(() => import('@/components/searchresultpage/Stats'));
const { InjectedHits } = lazily(() => import('@/components/searchresultpage/injected-hits'));

import {
  indexNames
} from '@/config/algoliaEnvConfig';

// Handle the number of hits per page
import { hitsPerPage } from '@/config/hitsConfig';

// Import Config File
import { customDataByType } from '@/utils';

const SrpLaptop = () => {
  // Recoil & React states

  const stats = useRecoilValue(shouldHaveStats);
  const shouldInjectContent = useRecoilValue(shouldHaveInjectedHits);
  const queryState = useRecoilValue(queryAtom);
  const [injected, setInjected] = useState(false);

  // Define Stat Const
  const { hitsPerPageNotInjected, hitsPerPageInjected } = hitsPerPage;

  // Define Price Sort By Const
  const { value: priceSortBy, labelIndex: labelItems } = sortBy;

  // Get states of React Router
  const { state } = useLocation();

  // Persona
  const userToken = useRecoilValue(personaSelectedAtom);

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
      <Suspense fallback={<div>Loading...</div>}>
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
            <Suspense fallback={<div>Loading...</div>}>
              <CustomStats />
            </Suspense>
          )}
          {priceSortBy && (
            <Suspense fallback={<div>Loading...</div>}>
              <CustomSortBy
                items={labelItems}
                defaultRefinement={indexNames.mainIndex}
              />
            </Suspense>
          )}
        </div>
        {/* Refinements, to the left of the items, including a list of currently selected refinements */}
        <div className="refinement-container">
        <Suspense fallback={<div>Loading...</div>}>
            <CustomCurrentRefinements />
            <CustomClearRefinements />
          </Suspense>
        </div>
        <Configure
          hitsPerPage={injected ? hitsPerPageInjected : hitsPerPageNotInjected}
          analytics={false}
          userToken={userToken}
          enablePersonalization={true}
          filters={state ? state : ''}
          query={queryState && queryState}
        />
        <Index indexName={indexNames.injectedContentIndex}>
          <Configure hitsPerPage={1} page={0} />
        </Index>
        {/* This is a big ternary, where it injects a card (eg. Sale card) or renders an item */}
        {shouldInjectContent ? (
          <Suspense fallback={<div>Loading...</div>}>
            <InjectedHits
              hitComponent={Hit}
              slots={({ resultsByIndex }) => {
                const indexValue = indexNames.mainIndex;
                const { noCta, salesCard } = customDataByType(
                  resultsByIndex?.[indexValue]?.userData
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
                      return resultsByIndex[indexNames.injectedContentIndex]
                        ? resultsByIndex[indexNames.injectedContentIndex].hits || []
                        : [];
                    },
                    slotComponent: InfluencerCard,
                  },
                ];
              }}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
          <CustomHitsComponent />
          </Suspense>
        )}
        <Pagination />
      </motion.div>
    </div>
  );
};

export default SrpLaptop;
