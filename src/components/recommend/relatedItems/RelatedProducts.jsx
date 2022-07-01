// Component for rendering the Related Products through Recommend

// Import Hit configuration for use with Recoil
import { hitsConfig } from '@/config/hitsConfig';

//  Import highlight widget from InstantSearch library
import { Highlight } from 'react-instantsearch-hooks-web';

// Import heart svg
import { Heart } from '@/assets/svg/SvgIndex';

// import Price component
import Price from '@/components/hits/components/Price.jsx';

import { hitAtom } from '@/config/hitsConfig';
import { useSetRecoilState } from 'recoil';

// React-router import
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage';
import { useNavigate } from 'react-router-dom';

//Import scope SCSS
import '../SCSS/recommend.scss';

const RelatedItem = ({ item }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  // Get hit attribute from config file
  const { image, category, productName, objectID, brand } = hitsConfig;

  return (
    <div className="relatedItem">
      <div
        className="relatedItem__imgWrapper"
        onClick={() => {
          hitState(item);
          navigate(`/search/${item[objectID]}`);
          useStoreIdToLocalStorage(item[objectID]);
        }}
      >
        <img src={item[image]} alt={item[category]} />
        <div className="relatedItem__imgWrapper__heart">
          <Heart />
        </div>
      </div>
      <div className="relatedItem__infos">
        <div className="relatedItem__infosUp">
          <p className="brand">{item[brand]}</p>
          <h3 className="productName">
            <Highlight hit={item} attribute={productName} />
          </h3>
        </div>
        <p className="price">
          <Price hit={item} />
        </p>
      </div>
    </div>
  );
};

export default RelatedItem;
