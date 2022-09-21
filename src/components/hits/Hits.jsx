// Component for displaying hits in teh

import { useEffect, useState } from 'react';

// Import framer-motion for animation on hits
import { motion, AnimatePresence } from 'framer-motion';

import { Highlight } from 'react-instantsearch-hooks-web';

import { Heart, MinusPicto, PlusPicto } from '@/assets/svg/SvgIndex';

import { badgeCriteria } from '@/config/badgeConfig';

// In case of img loading error
import * as placeHolderError from '@/assets/logo/logo.webp';

import get from 'lodash/get';

import { framerMotionHits } from '@/config/animationConfig';

// Recoil import
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig, cartHits, hitAtom } from '@/config/hitsConfig';

// React-router import
import { useNavigate } from 'react-router-dom';
import Badge from './components/Badge';

//Import hook for store ID into local storage
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage';

// import Price component
import Price from '@/components/hits/components/Price.jsx';

//Import scope SCSS
import './SCSS/hits.scss';

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const cartState = useSetRecoilState(cartHits);
  const cartValue = useRecoilValue(cartHits);
  const [isHovered, setIsHovered] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  // Get hit attribute from config file
  const { objectID, image, imageAlt, category, productName, brand } =
    hitsConfig;

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
    console.log(cartValue);
  }, [cartValue]);

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
          {isHovered && get(hit, imageAlt) !== undefined ? (
            <img
              key={1}
              className={
                shouldShowRankingInfo ? 'secondImage-opacity' : 'secondImage'
              }
              loading="lazy"
              src={get(hit, imageAlt)}
              alt={get(hit, category)}
              onError={(e) => (e.currentTarget.src = placeHolderError)}
            />
          ) : (
            <img
              className={
                shouldShowRankingInfo
                  ? 'mainImage-opacity'
                  : 'mainImage-visible'
              }
              loading="lazy"
              src={get(hit, image)}
              key={2}
              alt={get(hit, category)}
              onError={(e) => (e.currentTarget.src = placeHolderError)}
            />
          )}
          {badgeCriteria(hit) !== null && !shouldShowRankingInfo && (
            <Badge title={badgeCriteria(hit)} />
          )}
          <div className="srpItem__imgWrapper__heart">
            <Heart />
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
                  if (cartQty > 0) {
                    setCartQty(cartQty - 1);
                  }
                  if ((cartQty = 0)) {
                    cartState([]);
                  }
                }}
              >
                <MinusPicto />
              </div>
              <p>{cartQty}</p>
              <div
                onClick={() => {
                  if (cartQty >= 0) {
                    setCartQty(cartQty + 1);
                    cartState([hit.name]);
                  }
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
