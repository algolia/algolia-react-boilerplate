// import algolia recommend
import { TrendingItems } from '@algolia/recommend-react';
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import { useRecoilValue } from 'recoil';

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme';

import RelatedItem from '@/components/recommend/RelatedProducts';
import { recommendClient, mainIndex } from '@/config/algoliaEnvConfig';
import { trendingConfig } from '@/config/trendingConfig';
import { refinementsAtom } from "@/config/refinementsConfig";

// Trending provides a carousel of trending products, filtered if needed by any facet
const TrendingProducts = () => {
  // define the client for using Recommend

  const index = useRecoilValue(mainIndex);
  const refinementsState = useRecoilValue(refinementsAtom);
  let hasBrandRefinement = refinementsState?.brand === '' ? false : true

  return (
    <div>
      <TrendingItems
        recommendClient={recommendClient}
        indexName={index}
        itemComponent={RelatedItem}
        maxRecommendations={trendingConfig.maxRecommendations}
        view={HorizontalSlider}
        headerComponent={() => <h3>{trendingConfig.productsTitle}</h3>}
        threshold={trendingConfig.threshold}
        facetName={hasBrandRefinement ? 'brand' : ''}
        facetValue={hasBrandRefinement ? refinementsState.brand[0] : ''}
      />
    </div>
  );
};

export default TrendingProducts;
