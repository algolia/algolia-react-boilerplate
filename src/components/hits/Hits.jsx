// Import framer-motion for animation on hits
import { motion } from 'framer-motion';
import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import { Heart } from '../../assets/svg/SvgIndex';
import { listItem } from '../../config/config';

// Recoil import
import { hitAtom } from '../../config/results';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '../../config/hits';

// React-router import
import { useNavigate } from 'react-router-dom';

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);

  // Get hit attribute from config file
  const { price, objectID, image, category, productName } =
    useRecoilValue(hitsConfig);

  return (
    <motion.li
      layout
      variants={listItem}
      initial={listItem.initial}
      exit={listItem.exit}
      animate={listItem.animate}
      transition={listItem.transition}
      className="srpItem"
      onClick={() => {
        hitState(hit);
        navigate(`/search/${hit[objectID]}`);
      }}
    >
      <div className="srpItem__img">
        <img src={hit[image]} alt={hit[category]} />
        <div className="srpItem__img__heart">
          <Heart />
        </div>
      </div>
      <div className="srpItem__infos">
        <h3>
          <Highlight hit={hit} attribute={productName} />
        </h3>
        <div className="srpItem__infos__down">
          <p className="srpItem__infos__down__price">{hit[price]}</p>
        </div>
      </div>
    </motion.li>
  );
};

export { Hit };
