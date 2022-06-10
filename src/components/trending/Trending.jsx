// import algolia recommend
import algoliarecommend from '@algolia/recommend';
import { TrendingItems } from '@algolia/recommend-react';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import { useRecoilValue } from 'recoil';

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme';

import RelatedItem from '@/components/recommend/RelatedProducts';
import { searchClientCreds, mainIndex } from '@/config/algoliaEnvConfig';
import { trendingConfig } from '@/config/trendingConfig';

// Trending provides a carousel of trending products, filtered if needed by any facet
const Trending = ({ facetName, facetValue }) => {
  // define the client for using Recommend
  const recommendClient = algoliarecommend(
    searchClientCreds.appID,
    searchClientCreds.APIKey
  );

  const index = useRecoilValue(mainIndex);

  return (
    <div>
      <TrendingItems
        recommendClient={recommendClient}
        indexName={index}
        itemComponent={RelatedItem}
        maxRecommendations={trendingConfig.maxRecommendations}
        view={HorizontalSlider}
        headerComponent={() => <h3>{trendingConfig.title}</h3>}
        threshold={trendingConfig.threshold}
        facetName={facetName}
        facetValue={facetValue}
      />
    </div>
  );
};

export default Trending;
