import React from 'react';

// Import other components
import GenericRefinementList from '../components/facets/Facets';
// Recoil state to directly access results
import { useRecoilState } from 'recoil';
// Import Config File
import { configAtom } from '../config/config';
// Import Components
import GiftCard from '../components/hits/GiftCard';
import { Hit } from '../components/hits/Hits';
// Import Components
import InfluencerCard from '../components/hits/InfluencerCard';
import NikeCard from '../components/hits/SalesCard';
import { CustomStats } from '../components/searchresultpage/Stats';
import { InjectedInfiniteHits } from '../components/searchresultpage/injected-hits';
import { indexName } from '../config/config';
import { customDataByType } from '../utils';

const SearchResultPage = () => {
  const [config] = useRecoilState(configAtom);
  // Define Stat Const
  const stats = config.stats.value;
  return (
    <div className="srp-container">
      <div className="srp-container__facets">
        <GenericRefinementList />
      </div>
      <div className="srp-container__hits">
        <div>{stats && <CustomStats />}</div>
        <InjectedInfiniteHits
          hitComponent={Hit}
          slots={({ resultsByIndex }) => {
            const indexValue = indexName.index;
            const { noCta, nikeCard } = customDataByType(
              resultsByIndex?.[indexValue]?.userData
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
