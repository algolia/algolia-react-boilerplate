import React from 'react';
import { motion } from 'framer-motion';
import SearchTerms from './SearchTerms';
import SearchBanners from './SearchBanners';
import SearchPersona from './SearchPersona';

const HelpNavigation = () => {
  return (
    <motion.div
      className="helpNavigation"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
    >
      <h2>Help Navigation Panel</h2>
      <ul className="container-nav-help">
        <li className="container-nav-help__items ">
          <SearchTerms />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <SearchBanners />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <SearchPersona />
          <hr />
        </li>
      </ul>
    </motion.div>
  );
};

export default HelpNavigation;
