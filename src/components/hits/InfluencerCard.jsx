import { motion } from 'framer-motion';
import React from 'react';

// INFLUENCER CARD
const InfluencerCard = ({ hit }) => {
  const listItem = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
      },
    },
  };
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
