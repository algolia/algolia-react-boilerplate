// Import framer-motion for animation on hits
import { motion } from 'framer-motion';
import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import { Heart } from '../../assets/svg/SvgIndex';
import { listItem } from '../../config/config';

// import { useNavigate } from 'react-router-dom';

const Hit = ({ hit }) => {
  return (
    <div className="hits-srp">
      <motion.li
        variants={listItem}
        initial="hidden"
        animate="show"
        className="hits-srp__list"
      >
        <div className="hits-srp__list__img">
          <img src={hit.full_url_image} alt={hit.category} />
          <div className="hits-srp__list__img__heart">
            <Heart />
          </div>
        </div>
        <div className="hits-srp__list__infos">
          <h3>
            <Highlight hit={hit} attribute="name" />
          </h3>
          <div className="hits-srp__list__infos__down">
            <p className="hits-srp__list__infos__down__price">{hit.price}</p>
          </div>
        </div>
      </motion.li>
    </div>
  );
};

export { Hit };
