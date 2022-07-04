// import algolia recommend
import { TrendingItems } from '@algolia/recommend-react';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import { useRecoilValue } from 'recoil';

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme';

import RelatedItem from '../relatedItems/RelatedProducts';

import { mainIndex, recommendClient } from '@/config/algoliaEnvConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { trendingConfig } from '@/config/trendingConfig';

// Trending provides a carousel of trending products, filtered if needed by any facet
const TrendingProducts = ({ facetName, facetValue }) => {
  // define the client for using Recommend

  const index = useRecoilValue(mainIndex);
  const { threshold, productsTitle, maxProductsRecommendations } =
    trendingConfig;
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);

  return (
    <div>
      <TrendingItems
        recommendClient={recommendClient}
        indexName={index}
        itemComponent={RelatedItem}
        maxRecommendations={maxProductsRecommendations}
        view={HorizontalSlider}
        headerComponent={() => <h3 className="title">{productsTitle}</h3>}
        threshold={threshold}
        facetName={facetName}
        facetValue={facetValue}
        queryParameters={{ optionalFilters: segmentOptionalFilters }}
      />
    </div>
  );
};

export default TrendingProducts;
