import { motion } from 'framer-motion';
import React from 'react';

// SALES CARD
const NikeCard = ({ hit }) => {
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
    <motion.li
      variants={listItem}
      initial="hidden"
      animate="show"
      className="image-wrapper-sales"
      style={{
        backgroundImage: `url(${hit.image.desktop_url})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="image-wrapper-sales__infos">
        <p>{hit.coupon}</p>
        <h3>{hit.title}</h3>
      </div>
    </motion.li>
  );
};

export default NikeCard;
