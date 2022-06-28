// For displaying injected content in the Search Results

// Import framer motion
import { motion } from 'framer-motion';

// Import functionality from InstantSearch
// eslint-disable-next-line no-unused-vars
import { connectStateResults } from 'react-instantsearch-dom';

// Import framer Motion config
import { framerMotionHits } from '@/config/animationConfig';

const QueryAndHitsOnly = connectStateResults(
  ({ searchState, searchResults, children }) => {
    return searchState.query && searchResults.nbHits !== 0 ? children : null;
  }
);

// Display the name, the category and the background image, wrapped in a framer motion div
const InfluencerCard = ({ hit }) => {
  return (
    <QueryAndHitsOnly>
      <motion.li
        layout
        variants={framerMotionHits}
        initial={framerMotionHits.initial}
        exit={framerMotionHits.exit}
        animate={framerMotionHits.animate}
        transition={framerMotionHits.transition}
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
