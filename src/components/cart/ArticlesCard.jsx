// Recoil import
import { Garbage, MinusEmptyIcon, PlusEmptyIcon } from '@/assets/svg/SvgIndex';
import { hitsConfig } from '@/config/hitsConfig';
import get from 'lodash/get';

// Import cart from recoil
import { cartState, removedItem } from '@/config/cartFunctions';
import { useRecoilState } from 'recoil';

const ArticlesCard = ({ item }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const [removed, setRemoved] = useRecoilState(removedItem);
  // Get hit attribute from config file
  const {
    objectID,
    image,
    imageAlt,
    category,
    productName,
    brand,
    price: priceForTotal,
    sizeFilter,
    colour,
  } = hitsConfig;

  return (
    <div>
      <div className="articles-card">
        <img src={get(item, image)} alt="" />
        <div className="articles-card__infos">
          <h3>{get(item, category)}</h3>
          <p>{get(item, productName)}</p>
          <div className="articles-card__infos__details">
            {get(item, sizeFilter) && (
              <div className="articles-card__infos__details__size">
                <p>
                  Size <span>{get(item, sizeFilter)}</span>
                </p>
              </div>
            )}
            {get(item, colour) && (
              <div className="articles-card__infos__details__size">
                <p>
                  Colour <span>{get(item, colour)}</span>
                </p>
              </div>
            )}
          </div>
          <div className="articles-card__infos__qtyprice">
            <div className="articles-card__infos__qtyprice__plus-minus">
              <div>
                <MinusEmptyIcon />
              </div>
              <p>{item.qty}</p>
              <div>
                <PlusEmptyIcon />
              </div>
            </div>
            <div className="articles-card__infos__qtyprice__price">
              <p>${item.totalPrice}</p>
            </div>
          </div>
        </div>
        <div
          className="articles-card__remove"
          onClick={() => {
            setCart((cart) =>
              cart.filter((it) => it.objectID !== item.objectID)
            );
            setRemoved(item.objectID);
          }}
        >
          <Garbage />
        </div>
      </div>
      <div className="articles-card__line"></div>
    </div>
  );
};

export default ArticlesCard;
