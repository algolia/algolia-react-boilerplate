import { useEffect, useState } from 'react';

import { useTrendingFacets } from '@algolia/recommend-react';
import { useRefinementList } from 'react-instantsearch-hooks-web';

import { useRecoilValue } from 'recoil';

import { mainIndex, recommendClient } from '@/config/algoliaEnvConfig';
import '@algolia/ui-components-horizontal-slider-theme';

import { trendingConfig } from '@/config/trendingConfig';
import CustomSkeleton from '@/components/skeletons/CustomSkeleton';
import TrendingFacetsItem from '@/components/recommend/trending/TrendingFacetsItem';

function WrappedTrendingFacetValues(props) {
  const { items, refine } = useRefinementList(props);
  const [recommendationsLoaded, setRecommendationsLoaded] = useState(false);

  const index = useRecoilValue(mainIndex);
  const {
    facetValuesAttribute,
    facetValuesTitle,
    maxFacetValuesRecommendations,
  } = trendingConfig;

  const { recommendations } = useTrendingFacets({
    recommendClient,
    indexName: index,
    facetName: facetValuesAttribute,
    maxRecommendations: maxFacetValuesRecommendations,
  });

  useEffect(() => {
    setRecommendationsLoaded(recommendations.length > 0);
  }, [recommendations]);

  return (
    <div className="trending-facet-container">
      {recommendations.length > 0 && (
        <div className="filters-container">
          {recommendationsLoaded && (
            <div className="filters-container__title">
              <h3>{facetValuesTitle}</h3>
            </div>
          )}
          <div className="filters-container__list"></div>
          <ul className="filters-container__content">
            {recommendations.map((trendingFacetValue, i) => {
              return recommendationsLoaded ? (
                <TrendingFacetsItem
                  trendingFacetValue={trendingFacetValue}
                  key={`${i}${trendingFacetValue}`}
                  {...{items, refine}}
                />
              ) : (
                <div key={i + 'facetItem'}>
                  <CustomSkeleton type="facet" />
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WrappedTrendingFacetValues;