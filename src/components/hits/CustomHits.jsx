// This is in the Search Results Page for both laptop and mobile windows

// Import framer-motion for animation on hits
import { motion } from 'framer-motion';

// Import InstantSearch Functionality
import { connectHits, Highlight } from 'react-instantsearch-dom';

// Import heart icon
import { Heart } from '../../assets/svg/SvgIndex';
import { framerMotionHits } from '../../config/animationConfig';

// Recoil configuration
import { hitAtom } from '../../config/results';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '../../config/hits';

// React-router import
import { useNavigate } from 'react-router-dom';
import { Hit } from './Hits';

const CustomHits = ({ hits }) => {
  // Navigate is used by the router
  const navigate = useNavigate();

  // Get the global hit component
  const hitState = useSetRecoilState(hitAtom);

  // Get hit attribute from config file
  const { price, objectID, image, category, productName } =
    useRecoilValue(hitsConfig);

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit, i) => {
          // Wrap the hit info in an animation, and click functionality to view the product
          return (
            <>
              <Hit hit={hit} key={i} />
            </>
          );
        })}
      </ul>
    </div>
  );
};

const CustomHitsComponent = connectHits(CustomHits);

export default CustomHitsComponent;
