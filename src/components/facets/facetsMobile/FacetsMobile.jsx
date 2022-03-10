import React from 'react';
// import framer motion
import { motion } from 'framer-motion';
import { framerMotionFacet } from '../../../config/config';
import { framerMotionTransition } from '../../../config/config';

import GenericRefinementList from '../../../components/facets/Facets';

const FacetsMobile = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.div
      animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
      transition={framerMotionTransition}
      className="srp-container__facets-mobile"
    >
      <GenericRefinementList />
    </motion.div>
  );
};

export default FacetsMobile;
