// Component for rendering the Related Products through Recommend

// Import Hit configuration for use with Recoil
import { hitsConfig } from '@/config/hitsConfig';

//  Import highlight widget from InstantSearch library
import { Highlight } from 'react-instantsearch-dom';

// Import heart svg
import { Heart } from '@/assets/svg/SvgIndex';

// import Price component
import Price from '@/components/price/price.jsx';

const RelatedItem = ({ item }) => {
  // Get hit attribute from config file
  const { image, category, productName } = hitsConfig;

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
            <Price hit={item} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
