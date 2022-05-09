// TODO: why is this NOT export default?

import { useState } from 'react';

// Import framer-motion for animation on hits
import { motion, AnimatePresence } from 'framer-motion';
import { framerMotionTransition } from '@/config/animationConfig';

import { Highlight } from 'react-instantsearch-dom';

import { Heart } from '@/assets/svg/SvgIndex';

import { badgeCriteria } from '@/config/badgeConfig';

// In case of img loading error
import { logoUrl as placeHolderError } from '@/config/headerConfig';

import get from 'lodash/get';

import { framerMotionHits } from '@/config/animationConfig';

// Recoil import
import { hitAtom } from '@/config/hitsConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';
import {
  currencySymbolAtom,
  shouldDisplayCurrency,
} from '@/config/currencyConfig';

// React-router import
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';

//Import hook for store ID into local storage
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage';

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const [isHovered, setIsHovered] = useState(false);

  // Get currency symbol
  const currency = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

  // Get hit attribute from config file
  const { price, objectID, image, imageAlt, category, productName } =
    hitsConfig;

  const [shouldShowRankingInfo, setShouldShowRankingInfo] = useState(false);

  const RankingFormulaOverlay = ({ hit }) => {
    return (
      <motion.div
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
      </motion.div>
    );
  };

  const promoted = hit?._rankingInfo?.promoted;

  return (
    <motion.li
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
        <button className="ranking-formula-button"></button>
        <p>Click to see Ranking</p>
      </div>
      <AnimatePresence>
        {shouldShowRankingInfo && <RankingFormulaOverlay hit={hit} />}
      </AnimatePresence>
      <>
        <motion.div
          className="srpItem__imgWrapper"
          onMouseLeave={(e) => {
            setIsHovered(false);
          }}
          onMouseOver={(e) => {
            !shouldShowRankingInfo && setIsHovered(true);
          }}
          onClick={() => {
            hitState(hit);
            navigate(`/search/${hit[objectID]}`);
            useStoreIdToLocalStorage(hit[objectID]);
          }}
        >
          {isHovered && get(hit, imageAlt) !== undefined ? (
            <img
              key={1}
              className={
                shouldShowRankingInfo ? 'secondImage-opacity' : 'secondImage'
              }
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
        </motion.div>
        <div className="srpItem__infos">
          <h3>
            <Highlight hit={hit} attribute={productName} />
          </h3>
          <div className="srpItem__infos__down">
            <p className="srpItem__infos__down__price">
              {get(hit, price)}
              {displayCurrency && currency}
            </p>
          </div>
        </div>
      </>
    </motion.li>
  );
};

export { Hit };
