import { TrendingFacets } from '@algolia/recommend-react';
import recommend from '@algolia/recommend';

// import algolia recommend
import { useRecoilValue } from 'recoil';

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme';

import { recommendClient, mainIndex } from '@/config/algoliaEnvConfig';
import { trendingConfig } from '@/config/trendingConfig';

const TrendingFacetValues = ({ facetName }) => {
  const index = useRecoilValue(mainIndex);

  const TrendingFacetsItem = ({ item }) => (
    <pre>
      <code>{JSON.stringify(item)}</code>
    </pre>
  );

  return (
    <TrendingFacets
      recommendClient={recommendClient}
      indexName={index}
      itemComponent={TrendingFacetsItem}
      facetName={facetName}
    />
  );
};

export default TrendingFacetValues;
