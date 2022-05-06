// This is the Search Results Page that you'll see on a phone screen
import { lazy, Suspense } from 'react';
import { lazily } from 'react-lazily';

import Loader from '@/components/loader/Loader';

import { useState } from 'react';
// eslint-disable-next-line import/order
import { Configure, Index } from 'react-instantsearch-dom';

import { useLocation } from 'react-router-dom';

// import framer motion
import { motion } from 'framer-motion';

import { framerMotionPage } from '@/config/animationConfig';

// Recoil state to directly access results
import { useRecoilValue } from 'recoil';

// Import Persona State from recoil
import { personaSelectedAtom } from '@/config/personaConfig';

// Import Segment State from recoil
import { segmentSelectedAtom } from '@/config/segmentConfig';

import {
  shouldHaveStats,
  shouldHaveInjectedHits,
  shouldHaveSorts,
} from '@/config/featuresConfig';
import { sortBy } from '@/config/sortByConfig';
import { queryAtom } from '@/config/searchboxConfig';

// Import Components
import Redirect from '@/components/redirects/Redirect';
const CustomClearRefinements = lazy(() =>
  import('@/components/facets/ClearRefinement')
);
const CustomCurrentRefinements = lazy(() =>
  import('@/components/facets/CurrentRefinement')
);
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
const FacetsMobile = lazy(() =>
  import('@/components/facets/facetsMobile/FacetsMobile')
);
import { ChevronRight, ChevronLeft } from '@/assets/svg/SvgIndex';

import { indexNames, mainIndex } from '@/config/algoliaEnvConfig';

import { hitsPerPage } from '@/config/hitsConfig';

// Import Config File
import { customDataByType } from '@/utils';

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

  //Get indexes Value
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

  return (
    <div className="srp-container-mobile">
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
        <Redirect />
      </motion.div>
    </div>
  );
};

export default SrpMobile;
