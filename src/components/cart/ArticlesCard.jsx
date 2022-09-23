// Recoil import
import { hitAtom, hitsConfig } from '@/config/hitsConfig';
import get from 'lodash/get';

const ArticlesCard = ({ item }) => {
  // Get hit attribute from config file
  const {
    objectID,
    image,
    imageAlt,
    category,
    productName,
    brand,
    price: priceForTotal,
  } = hitsConfig;
  return (
    <div className="articles-card">
      <img src={get(item, image)} alt="" />
      <div className='articles-card__infos'>
        <h3>Test</h3>
      </div>
    </div>
  );
};

export default ArticlesCard;
