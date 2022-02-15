import React, { useState } from 'react';
// eslint-disable-next-line import/order
import { Pagination, Configure, Index } from 'react-instantsearch-dom';

// React router import
import { useLocation, useSearchParams } from 'react-router-dom';
// Recoil state to directly access results
import { useRecoilState, useRecoilValue } from 'recoil';

// Import other components
import GenericRefinementList from '../components/facets/Facets';
// Import Components
import GiftCard from '../components/hits/GiftCard';
import { Hit } from '../components/hits/Hits';
// Import Components
import InfluencerCard from '../components/hits/InfluencerCard';
import NikeCard from '../components/hits/SalesCard';
import Banner from '../components/searchresultpage/Banner';
import { CustomStats } from '../components/searchresultpage/Stats';
import { InjectedInfiniteHits } from '../components/searchresultpage/injected-hits';
// Import Config File
import { configAtom, indexName, indexInfluencer } from '../config/config';
import { queryAtom } from '../config/searchbox';
import { customDataByType } from '../utils';

import CustomClearRefinements from '../components/facets/ClearRefinement';
import CustomCurrentRefinements from '../components/facets/CurrentRefinement';

const SearchResultPage = () => {
  // Recoil & React states
  const [config] = useRecoilState(configAtom);
  const [injected, setInjected] = useState(false);
  const queryState = useRecoilValue(queryAtom);

  // Define Stat Const
  const stats = config.stats.value;
  const hitsPerPageNotInjected = config.hitsPerPage.numberNotInjected;
  const hitsPerPageInjected = config.hitsPerPage.numberInjected;
  const bannerDisplay = config.bannerSrp.value;

  // Get states of React Router
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('query');

  return (
    <>
      {bannerDisplay && <Banner />}
      <div className="srp-container">
        <div className="srp-container__facets">
          <GenericRefinementList />
        </div>
        <div className="srp-container__hits">
          <div>{stats && <CustomStats />}</div>
          <div className="refinement-container">
            <CustomCurrentRefinements />
            <CustomClearRefinements />
          </div>
          <Configure
            hitsPerPage={
              injected ? hitsPerPageInjected : hitsPerPageNotInjected
            }
            analytics={false}
            enablePersonalization={true}
            filters={state ? state : ''}
            query={queryFromUrl ? queryFromUrl : queryState}
          />
          <Index indexName={indexInfluencer.index}>
            <Configure hitsPerPage={1} page={0} />
          </Index>
          <InjectedInfiniteHits
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
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default SearchResultPage;
