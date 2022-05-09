// Component for rendering the Related Products through Recommend

// Import Hit configuration for use with Recoil
import { hitsConfig } from '@/config/hitsConfig';
import { useRecoilValue } from 'recoil';

// Import currency
import {
  currencySymbolAtom,
  shouldDisplayCurrency,
} from '@/config/currencyConfig';

//  Import highlight widget from InstantSearch library
import { Highlight } from 'react-instantsearch-dom';

// Import heart svg
import { Heart } from '@/assets/svg/SvgIndex';

const RelatedItem = ({ item }) => {
  // Get hit attribute from config file
  const { price, image, category, productName } = hitsConfig;
  // Get currency symbol
  const currency = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

  return (
    <div className="relatedItem">
      <div className="relatedItem__imgWrapper">
        <img src={item[image]} alt={item[category]} />
        <div className="relatedItem__imgWrapper__heart">
          <Heart />
        </div>
      </div>
      <div className="relatedItem__infos">
        <h3>
          <Highlight hit={item} attribute={productName} />
        </h3>
        <div className="relatedItem__infos__down">
          <p className="relatedItem__infos__down__price">
            {displayCurrency && currency}
            {item[price]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
