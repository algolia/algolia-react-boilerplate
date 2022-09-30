// Component for displaying hits in teh

import { useEffect, useState } from 'react';

// Import framer-motion for animation on hits
import { AnimatePresence, motion } from 'framer-motion';

import { Highlight } from 'react-instantsearch-hooks-web';
// Import SVGs
import { Heart, MinusPicto, PlusPicto } from '@/assets/svg/SvgIndex';
import RankingIcon from './components/RankingIcon';
// Import Badge config
import { badgeCriteria } from '@/config/badgeConfig';

// In case of img loading error
import * as placeHolderError from '@/assets/logo/logo.webp';

// Lodash function to acces to precise attribute
import get from 'lodash/get';
// Animations
import { framerMotionHits } from '@/config/animationConfig';

// Recoil import
import { hitAtom, hitsConfig } from '@/config/hitsConfig';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// React-router import
import { useNavigate } from 'react-router-dom';
import Badge from './components/Badge';

//Import hook for store ID into local storage
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage';

// import Price component
import Price from '@/components/hits/components/Price.jsx';

// Import cart from recoil(Cart state and the event if it's removed)
import {
  addToCartSelector,
  removeToCartSelector,
  cartState,
  removedItem,
  order,
  productQtyState,
} from '@/config/cartFunctions';
// Import Persona if there is
import { shouldHavePersona } from '@/config/featuresConfig';
import {
  personaSelectedFiltersAtom,
  shouldDisplayRankingIcons,
} from '@/config/personaConfig';

//Import scope SCSS
import './SCSS/hits.scss';

// Used to send insights event on add to cart
import { mainIndex } from '@/config/algoliaEnvConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import useSendAlgoliaEvent from '@/hooks/useSendAlgoliaEvent';

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const [isHovered, setIsHovered] = useState(false);
  // Import Cart State
  const [cart, setCart] = useRecoilState(cartState);
  const setAddToCartAtom = useSetRecoilState(addToCartSelector);
  const setRemoveToCartAtom = useSetRecoilState(removeToCartSelector);
  const showPersona = useRecoilValue(shouldHavePersona);
  const showRankingIcons = useRecoilValue(shouldDisplayRankingIcons);
  const personaFilters = useRecoilValue(personaSelectedFiltersAtom);
  const [productQty, setProductQty] = useRecoilState(productQtyState);

  const [removed, setRemoved] = useRecoilState(removedItem);

  // personalisation user token
  const userToken = useRecoilValue(personaSelectedAtom);

  // Get the main index
  const index = useRecoilValue(mainIndex);

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

  const [shouldShowRankingInfo, setShouldShowRankingInfo] = useState(false);

  const RankingFormulaOverlay = ({ hit }) => {
    return (
      <div
        layout
        variants={framerMotionHits}
        initial={framerMotionHits.initial}
        exit={framerMotionHits.exit}
        animate={framerMotionHits.animate}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="ranking-formula"
      >
        {Object.entries(hit._rankingInfo).map((entry) => (
          <p>
            {entry[0]} {JSON.stringify(entry[1])}
          </p>
        ))}
      </div>
    );
  };

  const promoted = hit?._rankingInfo?.promoted;

  useEffect(() => {
    // This useEffect is for update the Cart
    let cartItemIndex = null;
    cart.map((item, index) => {
      if (item.objectID === hit.objectID) {
        cartItemIndex = index;
      }
    });
    if (cartItemIndex !== null) {
      let items = [...cart];
      setProductQty(items[cartItemIndex].qty);
    }
  }, [cart]);

  useEffect(() => {
    // This useEffect is here for update the qty in
    // SRP between + and -
    if (removed?.length === 0) {
      setProductQty(0);
    }
  }, [removed]);

  // Function on click on plus button to add hit in the cart
  const removeFromCart = (product, productQty) => {
    if (cart.length < 1) {
      setCart([{ ...product, qty: 1, totalPrice: product[priceForTotal] }]);
      setProductQty(1);
    } else {
      let cartItemIndex = null;
      const cartItem = cart.map((item, index) => {
        if (item.objectID === product.objectID) {
          cartItemIndex = index;
        }
      });
      if (cartItemIndex !== null) {
        let items = [...cart];
        if (items[cartItemIndex].qty !== 0) {
          items[cartItemIndex] = {
            ...items[cartItemIndex],
            qty: productQty - 1,
            totalPrice: (productQty - 1) * items[cartItemIndex][priceForTotal],
          };
          setCart(items);
          setProductQty(items[cartItemIndex].qty);
        }
        if (items[cartItemIndex].qty === 0) {
          setCart((cart) =>
            cart.filter((item) => item.objectID !== product.objectID)
          );
          setProductQty(0);
          localStorage.removeItem('myCart');
        }
      } else {
      }
    }
  };

  // Function to have a link between the fact I removed an item in my cart
  useEffect(() => {
    if (removed !== null) {
      if (removed[0] === hit.objectID) {
        if (removed[1] !== 0) {
          setProductQty(removed[1]);
          setRemoved(null);
        } else {
          setProductQty(0);
          setRemoved(null);
        }
      }
    }
  }, [removed, productQty]);

  // useEffect(() => {
  //   addToCartS;
  // }, []);

  return (
    <motion.div
      layout
      variants={framerMotionHits}
      initial={framerMotionHits.initial}
      exit={framerMotionHits.exit}
      animate={framerMotionHits.animate}
      transition={framerMotionHits.transition}
      className={`${promoted ? 'promotedItems' : ''} srpItem`}
    >
      {showPersona && showRankingIcons && <RankingIcon {...{ hit }} />}
      <div
        className="button-ranking-container"
        onClick={() => setShouldShowRankingInfo(!shouldShowRankingInfo)}
      >
        <button
          className="ranking-formula-button"
          aria-label="show ranking"
        ></button>
        <p>Click to see Ranking</p>
      </div>
      <AnimatePresence>
        {shouldShowRankingInfo && <RankingFormulaOverlay hit={hit} />}
      </AnimatePresence>
      <>
        <div
          className="srpItem__imgWrapper"
          onMouseLeave={(e) => {
            setIsHovered(false);
          }}
          onMouseOver={(e) => {
            !shouldShowRankingInfo && setIsHovered(true);
          }}
          onClick={() => {
            hitState(hit);
            navigate(`/search/product/${hit[objectID]}`);
            useStoreIdToLocalStorage(hit[objectID]);
          }}
        >
          <img
            className={
              shouldShowRankingInfo ? 'mainImage-opacity' : 'mainImage-visible'
            }
            loading="lazy"
            src={
              isHovered && get(hit, imageAlt) !== undefined
                ? get(hit, imageAlt)
                : get(hit, image)
            }
            key={2}
            alt={get(hit, category)}
            onError={(e) => (e.currentTarget.src = placeHolderError)}
          />
          {/* )} */}
          {badgeCriteria(hit) !== null && !shouldShowRankingInfo && (
            <Badge title={badgeCriteria(hit)} />
          )}
          <div className="srpItem__imgWrapper__heart">
            {(personaFilters.length < 1 ||
              !showPersona ||
              !showRankingIcons) && <Heart />}
          </div>
        </div>
        <div className="srpItem__infos">
          <div className="srpItem__infosUp">
            <p className="brand">{get(hit, brand)}</p>
            <h3 className="productName">
              <Highlight hit={hit} attribute={productName} />
            </h3>
          </div>
          <div className="srpItem__infosDown">
            <p className="price">
              <Price hit={hit} />
            </p>
            <div className="srpItem__infosDown__cart">
              <div
                onClick={() => {
                  setRemoveToCartAtom(hit);
                  // removeFromCart(hit, productQty);
                }}
              >
                <MinusPicto />
              </div>
              <p>{productQty}</p>
              {/* <p>{addToCartAtom}</p> */}
              <div
                onClick={() => {
                  setAddToCartAtom(hit);
                  // addToCart(hit, productQty);
                  // useSendAlgoliaEvent({
                  //   type: 'conversion',
                  //   userToken: userToken,
                  //   index: index,
                  //   hit: hit,
                  //   name: 'add-to-cart',
                  // });
                }}
              >
                <PlusPicto />
              </div>
            </div>
          </div>
        </div>
      </>
    </motion.div>
  );
};

export { Hit };
