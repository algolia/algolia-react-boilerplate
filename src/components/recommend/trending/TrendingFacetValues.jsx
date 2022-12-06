import { useEffect, useState } from 'react'

import { useTrendingFacets } from '@algolia/recommend-react'
import { useRefinementList } from 'react-instantsearch-hooks-web'

import { useRecoilState, useRecoilValue } from 'recoil'

import { mainIndex, recommendClient } from '@/config/algoliaEnvConfig'
import '@algolia/ui-components-horizontal-slider-theme'

import TrendingFacetsItem from '@/components/recommend/trending/TrendingFacetsItem'
import CustomSkeleton from '@/components/skeletons/CustomSkeleton'
import WithToolTip from '@/components/algoliaExplain/tooltip/WithTooltip'
import { trendingConfig } from '@/config/trendingConfig'

import { isFacetPanelOpen } from '@/config/refinementsConfig'

//Use Translation
import { useTranslation } from 'react-i18next'

function WrappedTrendingFacetValues(props) {
  const { items, refine } = useRefinementList(props)
  const [recommendationsLoaded, setRecommendationsLoaded] = useState(false)

  const index = useRecoilValue(mainIndex)
  const { facetValuesAttribute, maxFacetValuesRecommendations } = trendingConfig

  // Check if facets are deployed
  const [isFacetsPanelOpen, setIsFacetsPanelOpen] =
    useRecoilState(isFacetPanelOpen)

  // Hook which receives a list of trending facet values
  const { recommendations } = useTrendingFacets({
    recommendClient,
    indexName: index,
    facetName: facetValuesAttribute,
    maxRecommendations: maxFacetValuesRecommendations,
  })

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'srp',
  })

  // Import and use translation
  const { t: explainTranslations } = useTranslation('translation', {
    keyPrefix: 'explain',
  })

  // Control state so we can render the recommend component only when we have received the recommendations
  useEffect(() => {
    setRecommendationsLoaded(recommendations.length > 0)
  }, [recommendations])

  return (
    <div
      className={`${
        isFacetsPanelOpen
          ? 'filters-container__title_deployed'
          : 'filters-container__title'
      }`}
    >
      {recommendations.length > 0 && (
        <div className="filters-container">
          {recommendationsLoaded && (
            <div
              className={`${
                isFacetsPanelOpen
                  ? 'filters-container__title_deployed'
                  : 'filters-container__title'
              }`}
            >
              {/* translation key found in src/config/translation.js */}
              <WithToolTip translationKey="trendingFacets">
                <h3>{t('titleTrendingFacets')}</h3>
              </WithToolTip>
            </div>
          )}
          <div className="filters-container__list"></div>
          <ul className="filters-container__content">
            {recommendations.map((trendingFacetValue, i) => {
              return recommendationsLoaded ? (
                <TrendingFacetsItem
                  trendingFacetValue={trendingFacetValue}
                  key={`${i}${trendingFacetValue}`}
                  {...{ items, refine }}
                />
              ) : (
                <div key={i + 'facetItem'}>
                  <CustomSkeleton type="facet" />
                </div>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default WrappedTrendingFacetValues
