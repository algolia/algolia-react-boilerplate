import recommend from '@algolia/recommend';
import { TrendingFacets } from '@algolia/recommend-react';
import { useRecoilValue } from 'recoil';

import '@algolia/ui-components-horizontal-slider-theme';
import { recommendClient, mainIndex } from '@/config/algoliaEnvConfig';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';

import { trendingConfig } from '@/config/trendingConfig';

const TrendingFacetValues = () => {
  const index = useRecoilValue(mainIndex);

  const TrendingFacetsItem = ({ item }) => {
    return (
      <>
        <p>{item.facetValue}</p>
      </>
    );
  };

  return (
    <TrendingFacets
      recommendClient={recommendClient}
      indexName={index}
      itemComponent={TrendingFacetsItem}
      facetName={'brand'}
      maxRecommendations={5}
      view={HorizontalSlider}
      headerComponent={() => <h3>{trendingConfig.facetValuesTitle}</h3>}
    />
  );
};

export default TrendingFacetValues;
