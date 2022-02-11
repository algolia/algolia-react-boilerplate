import React from 'react';

// Import other components
import GenericRefinementList from '../components/facets/Facets';
// Import Components
import GiftCard from '../components/hits/GiftCard';
import { Hit } from '../components/hits/Hits';
import InfluencerCard from '../components/hits/InfluencerCard';
import SalesCard from '../components/hits/SalesCard';
import { InjectedInfiniteHits } from '../components/searchresultpage/injected-hits';
import { customDataByType } from '../utils';

const SearchResultPage = () => {
  return (
    <div className="srp-container">
      <div className="srp-container__facets">
        <GenericRefinementList />
      </div>
      <div className="srp-container__hits">
        <InjectedInfiniteHits
          hitComponent={Hit}
          slots={({ resultsByIndex }) => {
            const { noCta, salesCard } = customDataByType(
              resultsByIndex?.flagship_fashion?.userData
            );
            return [
              {
                getHits: () => [noCta],
                injectAt: noCta ? noCta.position : null,
                slotComponent: GiftCard,
              },
              {
                getHits: () => [salesCard],
                injectAt: salesCard ? salesCard.position : null,
                slotComponent: SalesCard,
              },
              {
                injectAt: ({ position }) => position === 2,
                getHits: ({ resultsByIndex }) =>
                  resultsByIndex['customDemo_hugoBoss_influencers']
                    ? resultsByIndex['customDemo_hugoBoss_influencers'].hits ||
                      []
                    : [],
                slotComponent: InfluencerCard,
              },
            ];
          }}
        />
      </div>
    </div>
  );
};

export default SearchResultPage;
