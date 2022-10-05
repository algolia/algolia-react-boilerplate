import { useState } from 'react';
import get from 'lodash/get';
import useSendAlgoliaEvent from '@/hooks/useSendAlgoliaEvent';

import { hitAtom, hitsConfig } from '@/config/hitsConfig';
import Price from '../hits/components/Price';
import { CartPicto } from '@/assets/svg/SvgIndex';
import { cartState, removedItem } from '@/config/cartFunctions';

// Display or not cart icons
import { shouldHaveCartFunctionality } from '@/config/featuresConfig';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

// Used to send insights event on add to cart
import { personaSelectedAtom } from '@/config/personaConfig';

// Import cart from recoil(Cart state and the event if it's removed)
import { addToCartSelector } from '@/config/cartFunctions';

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
  const [cartLogoClicked, setCartLogoClicked] = useState(false);
  const setAddToCartAtom = useSetRecoilState(addToCartSelector);

  // Navigate is used by React Router
  const navigate = useNavigate();

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom);

  // display or not the cart icons
  const shouldShowCartIcons = useRecoilValue(shouldHaveCartFunctionality);

  // personalisation user token
  const userToken = useRecoilValue(personaSelectedAtom);
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
      <div className="item__infos">
        <div
          className="item__infos-up"
          onClick={() => {
            hitState(hit);
            // navigate to the product show page
            navigate(`/search/product/${hit[objectID]}`);
          }}
        >
          <p className="brand">{get(hit, brand)}</p>
          <p className="name">{get(hit, productName)}</p>
        </div>
        <div className="item__infos-down">
          <p className="price">
            <Price hit={hit} />
          </p>
          {shouldShowCartIcons && (
            <div
              className={cartLogoClicked ? 'cart cart-active' : 'cart'}
              onClick={() => {
                setCartLogoClicked(true);
                setTimeout(() => setCartLogoClicked(false), 300);
                setAddToCartAtom(hit);
                // Send event conversion to Algolia API
                useSendAlgoliaEvent({
                  type: 'conversion',
                  userToken: userToken,
                  index: index,
                  hit: hit,
                  name: 'Homepage: Add to cart',
                });
              }}
            >
              <CartPicto />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HitsCarousel;
