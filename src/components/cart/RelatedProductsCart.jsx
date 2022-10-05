import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import RelatedItem from '../recommend/relatedItems/RelatedProducts';

import {
  mainIndex,
  recommendClient,
  searchClient,
} from '@/config/algoliaEnvConfig';

import {
  useFrequentlyBoughtTogether,
  useRelatedProducts,
} from '@algolia/recommend-react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { cartState } from '@/config/cartFunctions';
import { useEffect, useState } from 'react';

// Import and use translation
import { useTranslation } from 'react-i18next';

const RelatedProductsCart = () => {
  // access the main index from recoil state
  const indexName = useRecoilValue(mainIndex);
  const cart = useRecoilValue(cartState);
  const [lastObjectId, setLastObjectId] = useState(null);
  let fbtRecommendationsProducts;
  useEffect(() => {
    setLastObjectId(cart[cart.length - 1].objectID.toString());
  }, [cart]);

  useEffect(() => {
    console.log(typeof lastObjectId);
  }, [lastObjectId]);

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  });

  const { recommendations } = useFrequentlyBoughtTogether({
    recommendClient,
    indexName,
    objectIDs: [lastObjectId],
  });
  fbtRecommendationsProducts = recommendations;

  return (
    <>
      {lastObjectId && (
        <div className="recommend-cart">
          <h3 className="title">{t('relatedTitle')}</h3>
          <HorizontalSlider
            itemComponent={RelatedItem}
            items={fbtRecommendationsProducts}
          />
        </div>
      )}
    </>
  );
};

export default RelatedProductsCart;
