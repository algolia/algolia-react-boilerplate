// TODO: why is this NOT export default?

import { useState } from 'react';

// Import framer-motion for animation on hits
import { AnimatePresence, motion } from 'framer-motion';

import { Highlight } from 'react-instantsearch-dom';

import { Heart } from '@/assets/svg/SvgIndex';

// In case of img loading error
import { logoUrl as placeHolderError } from '@/config/headerConfig';

import get from 'lodash/get';

import {
  framerMotionTransition,
  framerMotionHits,
} from '@/config/animationConfig';

// Recoil import
import { hitAtom } from '@/config/hitsConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';
import {
  currencySymbolAtom,
  shouldIdisplayCurrency,
} from '@/config/currencyConfig';

// React-router import
import { useNavigate } from 'react-router-dom';
import Popular from './Popular';

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const [isHovered, setIsHovered] = useState(false);
  const isHitPromoted = hit?._rankingInfo?.promoted;

  // Get currency symbol
  const currency = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldIdisplayCurrency);

  // Get hit attribute from config file
  const { price, objectID, image, imageAlt, category, productName } =
    useRecoilValue(hitsConfig);

  return (
    <motion.li
      layout
      variants={framerMotionHits}
      initial={framerMotionHits.initial}
      exit={framerMotionHits.exit}
      animate={framerMotionHits.animate}
      transition={framerMotionHits.transition}
      className="srpItem"
      onClick={() => {
        hitState(hit);
        navigate(`/search/${hit[objectID]}`);
      }}
    >
      <motion.div
        className="srpItem__imgWrapper"
        onMouseLeave={(e) => {
          setIsHovered(false);
        }}
        onMouseOver={(e) => {
          setIsHovered(true);
        }}
      >
        <AnimatePresence>
          {isHovered && get(hit, imageAlt) !== undefined ? (
            <motion.img
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 0.9 }}
              exit={{ opacity: 0.9 }}
              transition={{
                duration: 0.1,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              key={1}
              className="secondImage"
              src={get(hit, imageAlt)}
              alt={get(hit, category)}
              onError={(e) => (e.currentTarget.src = placeHolderError)}
            />
          ) : (
            <motion.img
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 0.9 }}
              exit={{ opacity: 0.9 }}
              transition={{
                duration: 0.1,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="mainImage"
              src={get(hit, image)}
              key={2}
              alt={get(hit, category)}
              onError={(e) => (e.currentTarget.src = placeHolderError)}
            />
          )}
        </AnimatePresence>
        {isHitPromoted && <Popular />}
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
    </motion.li>
  );
};

export { Hit };
