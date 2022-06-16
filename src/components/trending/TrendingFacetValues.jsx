import recommend from '@algolia/recommend';
import { TrendingFacets } from '@algolia/recommend-react';
import { useRecoilValue } from 'recoil';

import '@algolia/ui-components-horizontal-slider-theme';
import { recommendClient, mainIndex } from '@/config/algoliaEnvConfig';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';

import { trendingConfig } from '@/config/trendingConfig';

import { refineFunctionAtom } from '@/config/refinementsConfig';

const TrendingFacetValues = () => {
  const index = useRecoilValue(mainIndex);

  const refineAtom = useRecoilValue(refineFunctionAtom);

  const TrendingFacetsItem = ({ item }) => {
    return (
      <>
        <p
        // onClick={() => {
        //   refine(item.facetValue);
        // }}
        >
          {item.facetValue}
        </p>
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
