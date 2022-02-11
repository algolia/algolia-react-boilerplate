import { motion } from "framer-motion";
import React from 'react';

// GIFT CARD
const GiftCard = ({ hit }) => {
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
      className="hit-list"
    >
      <div className="image-wrapper">
        <img src={hit.image.desktop_url} alt="" />
      </div>
    </motion.li>
  );
};

export default GiftCard;
