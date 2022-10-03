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
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
  hitsInCart,
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
  // Qty state
  const [itemQty, setItemQty] = useState(0);
  // Import Cart State
  const cart = useRecoilValue(cartState);
  const productIncart = useRecoilValue(hitsInCart);
  const setAddToCartAtom = useSetRecoilState(addToCartSelector);
  const setRemoveToCartAtom = useSetRecoilState(removeToCartSelector);
  const showPersona = useRecoilValue(shouldHavePersona);
  const showRankingIcons = useRecoilValue(shouldDisplayRankingIcons);
  const personaFilters = useRecoilValue(personaSelectedFiltersAtom);

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

  // Update the qty for a product on SRP each time Cart is modified or set qty to 0
  const updateQty = (article) => {
    if (!productIncart.length) setItemQty(0);
    const productAddedInCart = cart.find(
      (element) => element.objectID === article.objectID
    );
    productAddedInCart ? setItemQty(productAddedInCart.qty) : setItemQty(0);
  };

  // Update the qty for a product on SRP each time Cart is modified
  useEffect(() => {
    updateQty(hit);
  }, [cart]);

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
                }}
              >
                <MinusPicto />
              </div>
              <p>{itemQty}</p>
              <div
                onClick={() => {
                  setAddToCartAtom(hit);
                  // Send event conversion to Algolia API
                  useSendAlgoliaEvent({
                    type: 'conversion',
                    userToken: userToken,
                    index: index,
                    hit: hit,
                    name: 'add-to-cart',
                  });
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
