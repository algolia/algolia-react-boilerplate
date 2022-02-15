import { motion } from 'framer-motion';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { connectStateResults } from 'react-instantsearch-dom';

// Import config framer Motion
import { listItem } from '../../config/config';

const QueryAndHitsOnly = connectStateResults(
  ({ searchState, searchResults, children, includedRefinements }) => {
    return searchState.query && searchResults.nbHits !== 0 ? children : null;
  }
);

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
        <div className="infos_influencer">
          <p>#{hit.name}</p>
          <h3>{hit.influencer.name}</h3>
          <h4>{hit.category}</h4>
        </div>
      </motion.li>
    </QueryAndHitsOnly>
  );
};

export default InfluencerCard;
