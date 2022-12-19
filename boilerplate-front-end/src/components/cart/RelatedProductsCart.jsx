import { mainIndex, recommendClient } from '@/config/algoliaEnvConfig'

// Recommend components
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react'
import RelatedItem from '../recommend/relatedItems/RelatedProducts'

import { useRelatedProducts } from '@algolia/recommend-react'

// Recoil
import { useRecoilValue } from 'recoil'

// Import and use translation
import { useTranslation } from 'react-i18next'

const RelatedProductsCart = ({ objectIds }) => {
  // access the main index from recoil state
  const indexName = useRecoilValue(mainIndex)

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  })

  // let relatedRecommendationsProducts;
  const { recommendations } = useRelatedProducts({
    recommendClient,
    indexName,
    maxRecommendations: 3,
    objectIDs: objectIds,
  })

  return (
    <>
      {recommendations.length ? (
        <div className="recommend-cart">
          <h3 className="title">{t('relatedTitle')}</h3>
          <HorizontalSlider
            itemComponent={RelatedItem}
            items={recommendations}
          />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default RelatedProductsCart
