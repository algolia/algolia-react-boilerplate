// Recoil import
import { Garbage, MinusEmptyIcon, PlusEmptyIcon } from '@/assets/svg/SvgIndex';
import { hitsConfig } from '@/config/hitsConfig';
import get from 'lodash/get';

// Import cart from recoil
import { cartState, removedItem } from '@/config/cartFunctions';
import { useRecoilState } from 'recoil';
import { cartOpen } from '@/config/cartFunctions';

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

  const removeFromCart = (it) => {
    let cartItemIndex = null;
    const cartItem = cart.map((item, index) => {
      if (item.objectID === it.objectID) {
        cartItemIndex = index;
      }
    });
    if (cartItemIndex !== null) {
      let items = [...cart];
      if (items[cartItemIndex].qty !== 0) {
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: items[cartItemIndex].qty - 1,
          totalPrice:
            (items[cartItemIndex].qty - 1) *
            items[cartItemIndex][priceForTotal],
        };
        setCart(items);
        setRemoved([item.objectID, item.qty - 1]);
      }
      if (items[cartItemIndex].qty === 0) {
        setCart((cart) => cart.filter((item) => item.objectID !== it.objectID));
        setProductQty(0);
      }
    }
  };

  const addToCart = (it) => {
    let cartItemIndex = null;
    const cartItem = cart.map((item, index) => {
      if (item.objectID === it.objectID) {
        cartItemIndex = index;
      }
    });
    if (cartItemIndex !== null) {
      let items = [...cart];
      if (items[cartItemIndex].qty !== 0) {
        items[cartItemIndex] = {
          ...items[cartItemIndex],
          qty: items[cartItemIndex].qty + 1,
          totalPrice:
            (items[cartItemIndex].qty + 1) *
            items[cartItemIndex][priceForTotal],
        };
        setCart(items);
        setRemoved([item.objectID, item.qty + 1]);
      }
      if (items[cartItemIndex].qty === 0) {
        setCart((cart) => cart.filter((item) => item.objectID !== it.objectID));
        setProductQty(0);
      }
    }
  };

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
              <div
                onClick={() => {
                  removeFromCart(item);
                }}
              >
                <MinusEmptyIcon />
              </div>
              <p>{item.qty}</p>
              <div
                onClick={() => {
                  addToCart(item);
                }}
              >
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
            setRemoved([item.objectID, 0]);
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
