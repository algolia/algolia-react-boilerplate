import React, { useState } from 'react';
// eslint-disable-next-line import/order
import { Pagination, Configure, Index } from 'react-instantsearch-dom';

import { useLocation } from 'react-router-dom';

// import framer motion
import { motion } from 'framer-motion';
import { framerMotionPage, framerMotionFacet } from '../../../config/config';

// Recoil state to directly access results
import { useRecoilState, useRecoilValue } from 'recoil';

import { configAtom } from '../../../config/config';
import { queryAtom } from '../../../config/searchbox';

// Import Persona State from recoil
import { personaSelectedAtom } from '../../../config/header';

// Import Components
import CustomClearRefinements from '../../../components/facets/ClearRefinement';
import CustomCurrentRefinements from '../../../components/facets/CurrentRefinement';
import GenericRefinementList from '../../../components/facets/Facets';
import CustomHitsComponent from '../../../components/hits/CustomHits';
import GiftCard from '../../../components/hits/GiftCard';
import { Hit } from '../../../components/hits/Hits';
import InfluencerCard from '../../../components/hits/InfluencerCard';
import NikeCard from '../../../components/hits/SalesCard';
import CustomSortBy from '../../../components/searchresultpage/SortBy';
import { CustomStats } from '../../../components/searchresultpage/Stats';
import { InjectedHits } from '../../../components/searchresultpage/injected-hits';

import { indexName, indexInfluencer } from '../../../config/appConfig';

// Import Config File
import { customDataByType } from '../../../utils';

const SrpLaptop = () => {
  // Recoil & React states
  const [config] = useRecoilState(configAtom);
  const [injected, setInjected] = useState(false);
  const queryState = useRecoilValue(queryAtom);

  // Define Stat Const
  const stats = config.stats.value;
  const hitsPerPageNotInjected = config.hitsPerPage.numberNotInjected;
  const hitsPerPageInjected = config.hitsPerPage.numberInjected;
  const bannerDisplay = config.bannerSrp.value;
  const injectedValue = config.injectedHits.value;

  // Define Price Sort By Const
  const priceSortBy = config.sortBy.value;
  const labelItems = config.sortBy.labelIndex;

  // Get states of React Router
  const { state } = useLocation();
  const personaSelect = useRecoilValue(personaSelectedAtom);
  // Persona
  const userToken = personaSelect;
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
        <GenericRefinementList />
      </motion.div>
      <motion.div
        className="srp-container__hits"
        variants={framerMotionPage}
        initial={framerMotionPage.initial}
        animate={framerMotionPage.animate}
        exit={framerMotionPage.exit}
        transition={framerMotionPage.transition}
      >
        <div className="srp-container__stats-sort">
          {stats && <CustomStats />}
          {priceSortBy && (
            <CustomSortBy
              items={labelItems}
              defaultRefinement={indexName.index}
            />
          )}
        </div>

        <div className="refinement-container">
          <CustomCurrentRefinements />
          <CustomClearRefinements />
        </div>
        <Configure
          hitsPerPage={injected ? hitsPerPageInjected : hitsPerPageNotInjected}
          analytics={false}
          userToken={userToken}
          enablePersonalization={true}
          filters={state ? state : ''}
          query={queryState && queryState}
        />
        <Index indexName={indexInfluencer.index}>
          <Configure hitsPerPage={1} page={0} />
        </Index>
        {injectedValue ? (
          <InjectedHits
            hitComponent={Hit}
            slots={({ resultsByIndex }) => {
              const indexValue = indexName.index;
              const indexInfluencerValue = indexInfluencer.index;
              const { noCta, nikeCard } = customDataByType(
                resultsByIndex?.[indexValue]?.userData
              );
              // eslint-disable-next-line no-lone-blocks
              {
                // eslint-disable-next-line no-unused-expressions
                nikeCard && setInjected(true);
              }
              return [
                {
                  getHits: () => [noCta],
                  injectAt: noCta ? noCta.position : null,
                  slotComponent: GiftCard,
                },
                {
                  getHits: () => [nikeCard],
                  injectAt: nikeCard ? nikeCard.position : null,
                  slotComponent: NikeCard,
                },
                {
                  injectAt: ({ position }) => position === 2,
                  // eslint-disable-next-line no-shadow
                  getHits: ({ resultsByIndex }) => {
                    setInjected(true);
                    return resultsByIndex[indexInfluencerValue]
                      ? resultsByIndex[indexInfluencerValue].hits || []
                      : [];
                  },
                  slotComponent: InfluencerCard,
                },
              ];
            }}
          />
        ) : (
          <CustomHitsComponent />
        )}
        <Pagination />
      </motion.div>
    </div>
  );
};

export default SrpLaptop;
