import { useEffect, useState } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import { TrendingFacets } from '@algolia/recommend-react';
import { useRecoilValue } from 'recoil';

import '@algolia/ui-components-horizontal-slider-theme';
import { recommendClient, mainIndex } from '@/config/algoliaEnvConfig';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';

import { trendingConfig } from '@/config/trendingConfig';

const TrendingFacetValues = ({ items, refine }) => {

  const index = useRecoilValue(mainIndex);

  const TrendingFacetsItem = ({ item }) => {
    const [isBusy, setBusy] = useState(true)
    const [mergedItem, setMergedItem] = useState()
    // Item comes from Recommend, it is not a refinementList item, but we need a refinementList item to do things like refine.
    // We look up the refinementList item which matches the current Recommend item (they are both facet values) and switch item.
    // Item is now the refinementList item, so we can access all of correct functionality like isRefined etc.
    useEffect(() => {
      if (items.length > 0) {
        let newItems = items.filter(facet => facet.label === item.facetValue)
        setMergedItem(newItems[0])
        setBusy(false)
      }
    }, [items])


    return (
      <>
        {mergedItem && !isBusy && (
          <button
            className={`filters-container__content__list__button-filter ${mergedItem.isRefined ? 'refined-filter' : ''
              }`}
            type="button"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              refine(mergedItem.value);
            }}
          >
            <p>{mergedItem.label}</p>
            <span className="filters-container__content__list__refinement-count">
              {mergedItem.count}
            </span>
          </button>
        )
        }
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

const WrappedTrendingFacetValues = connectRefinementList(TrendingFacetValues);

export default WrappedTrendingFacetValues;
