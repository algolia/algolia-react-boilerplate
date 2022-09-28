// Recoil import
import { Garbage, MinusEmptyIcon, PlusEmptyIcon } from '@/assets/svg/SvgIndex';
import { hitsConfig } from '@/config/hitsConfig';
import get from 'lodash/get';

// Import cart from recoil
import { cartState, removedItem } from '@/config/cartFunctions';
import { useRecoilState } from 'recoil';

// ArticlesCard in Cart Modal

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

  // Remove from cart function
  const removeFromCart = (it) => {
    // Define a null const
    let cartItemIndex = null;
    // Iterate on our cart
    cart.map((item, index) => {
      if (item.objectID === it.objectID) {
        // And
        // If we already have the same article have
        // we store the index of this on cartItemIndex
        cartItemIndex = index;
      }
    });
    // So if we already have the same article
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
        // Store in the cart the new array Items
        setCart(items);
        // Store the removed one to decrease all qty
        setRemoved([item.objectID, item.qty - 1]);
      }
      if (items[cartItemIndex].qty === 0) {
        setCart((cart) => cart.filter((item) => item.objectID !== it.objectID));
        if (cart?.length === 1) {
          localStorage.removeItem('myCart');
        }
      }
    }
  };

  // Add to cart function
  const addToCart = (it) => {
    // Define a null const
    let cartItemIndex = null;
    // Iterate on our cart
    cart.map((item, index) => {
      if (item.objectID === it.objectID) {
        // And
        // If we already have the same article have
        // we store the index of this on cartItemIndex
        cartItemIndex = index;
      }
    });
    // So if we already have the same article
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
        // Store in the cart the new array Items
        setCart(items);
        setRemoved([it.objectID, it.qty + 1]);
      }
    } else {
      // If not already the same article
      setCart([...cart, { ...it, qty: 1, totalPrice: it[priceForTotal] }]);
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
                  Size{' '}
                  <span>
                    {
                      get(item, sizeFilter)[
                        Math.floor(Math.random() * get(item, sizeFilter).length)
                      ]
                    }
                  </span>
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
                className="articles-card__infos__qtyprice__plus-minus__icons"
                onClick={() => {
                  removeFromCart(item);
                }}
              >
                <MinusEmptyIcon />
              </div>
              <p>{item.qty}</p>
              <div
                className="articles-card__infos__qtyprice__plus-minus__icons"
                onClick={() => {
                  addToCart(item);
                }}
              >
                <PlusEmptyIcon />
              </div>
            </div>
            <div className="articles-card__infos__qtyprice__price">
              <p>${item.totalPrice.toFixed(2)}</p>
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
            localStorage.removeItem('myCart');
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
