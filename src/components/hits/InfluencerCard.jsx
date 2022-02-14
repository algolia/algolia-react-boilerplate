import { motion } from 'framer-motion';
import React from 'react';

// Import config framer Motion
import { listItem } from '../../config/config';

// INFLUENCER CARD
const InfluencerCard = ({ hit }) => {
  return (
    <QueryAndHitsOnly>
      <motion.li
        variants={listItem}
        initial="hidden"
        animate="show"
        className="image-wrapper-sales"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${hit.influencer.image}`,
          backgroundSize: 'cover',
        }}
      >
        <div className="infos">
          <p>{hit.influencer.name}</p>
          <h3>{hit.category}</h3>
        </div>
      </motion.li>
    </QueryAndHitsOnly>
  );
};

export default InfluencerCard;
