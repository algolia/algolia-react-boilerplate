// TODO: why is this NOT export default?

// Import framer-motion for animation on hits
import { motion } from 'framer-motion';

import { Highlight } from 'react-instantsearch-dom';

import { Heart, PromoLogo } from '@/assets/svg/SvgIndex';

// In case of img loading error
import { logoUrl as placeHolderError } from '@/config/headerConfig';

import {
  framerMotionTransition,
  framerMotionHits,
} from '@/config/animationConfig';

// Recoil import
import { hitAtom } from '@/config/hitsConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '@/config/hitsConfig';
import { currencySymbol } from '@/config/currencyConfig';

// React-router import
import { useNavigate } from 'react-router-dom';

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const isHitPromoted = hit?._rankingInfo?.promoted;

  // Get hit attribute from config file
  const { price, objectID, image, category, productName } =
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
      <motion.div className="srpItem__imgWrapper">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={framerMotionTransition}
          src={hit[image]}
          alt={hit[category]}
          onError={(e) => (e.currentTarget.src = placeHolderError)}
        />
        {isHitPromoted && <PromoLogo />}
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
            {hit[price]}
            {currencySymbol}
          </p>
        </div>
      </div>
    </motion.li>
  );
};

export { Hit };
