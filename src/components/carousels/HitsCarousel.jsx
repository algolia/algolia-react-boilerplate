import { useState } from 'react';
import get from 'lodash/get';

import { hitAtom, hitsConfig } from '@/config/hitsConfig';
import Price from '../hits/components/Price';
import { cartState, removedItem } from '@/config/cartFunctions';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSendAlgoliaEvent from '@/hooks/useSendAlgoliaEvent';

// Used to send insights event on add to cart
import { personaSelectedAtom } from '@/config/personaConfig';
const HitsCarousel = ({ hit, index }) => {
  const {
    objectID,
    image,
    productName,
    brand,
    sizeFilter,
    colour,
    colourHexa,
    price: priceForTotal,
  } = hitsConfig;
  const [hovered, setHovered] = useState(false);

  const [cart, setCart] = useRecoilState(cartState);
  const [removed, setRemoved] = useRecoilState(removedItem);

  // personalisation user token
  const userToken = useRecoilValue(personaSelectedAtom);

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
        setRemoved([it.objectID, it.qty + 1]);
      }
    } else {
      setCart([...cart, { ...it, qty: 1, totalPrice: it[priceForTotal] }]);
    }
  };

  return (
    <div
      className="item"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {hovered && (
        <div
          className="item__button"
          onClick={() => {
            addToCart(hit);
            useSendAlgoliaEvent({
              type: 'conversion',
              userToken: userToken,
              index: index,
              hit: hit,
              name: 'add-to-cart',
            });
          }}
        >
          <p>Add to cart</p>
        </div>
      )}
      <div
        className={`${
          hovered ? 'carousel__imageWrapper hovered' : 'carousel__imageWrapper'
        }`}
      >
        <img
          src={get(hit, image)}
          alt={get(hit, productName)}
          onError={(e) => (e.currentTarget.src = placeHolderError)}
        />
      </div>
      <div
        className="item__infos"
        onClick={() => {
          hitState(hit);
          // navigate to the product show page
          navigate(`/search/product/${hit[objectID]}`);
        }}
      >
        <p className="name">{get(hit, productName)}</p>
        <p className="price">
          <Price hit={hit} />
        </p>
      </div>
    </div>
  );
};

export default HitsCarousel;
