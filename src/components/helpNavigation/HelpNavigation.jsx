import React from 'react';
import { motion } from 'framer-motion';

const HelpNavigation = () => {
  return (
    <motion.div
      className="helpNavigation"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
    >
      <h2>Help Navigation Panel</h2>
    </motion.div>
  );
};

export default HelpNavigation;
