import React from 'react';

// Import other components
import GenericRefinementList from '../components/facets/Facets';
// Import Components
import GiftCard from '../components/hits/GiftCard';
import { Hit } from '../components/hits/Hits';
import InfluencerCard from '../components/hits/InfluencerCard';
import NikeCard from '../components/hits/SalesCard';
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
            const { noCta, nikeCard } = customDataByType(
              resultsByIndex?.flagship_fashion?.userData
            );
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
