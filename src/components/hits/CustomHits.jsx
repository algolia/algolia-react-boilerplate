// This is in the Search Results Page for both laptop and mobile windows

// Import framer-motion for animation on hits
import { motion } from 'framer-motion';

// Import InstantSearch Functionality
import { connectHits, Highlight } from 'react-instantsearch-dom';

// Import heart icon
import { Heart } from '../../assets/svg/SvgIndex';
import { framerMotionHits } from '../../config/config';

// Recoil configuration
import { hitAtom } from '../../config/results';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hitsConfig } from '../../config/hits';

// React-router import
import { useNavigate } from 'react-router-dom';

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
            <motion.li
              key={i}
              layout={true}
              variants={framerMotionHits}
              initial={framerMotionHits.initial}
              exit={framerMotionHits.exit}
              animate={framerMotionHits.animate}
              transition={framerMotionHits.transition}
              className="srpItem"
              onClick={() => {
                hitState(hit);
                navigate(`/search/${hit[objectID]}`);
              }}
            >
              <div className="srpItem__img">
                <img src={hit[image]} alt={hit[category]} />
                <div className="srpItem__img__heart">
                  <Heart />
                </div>
              </div>
              <div className="srpItem__infos">
                <h3>
                  <Highlight hit={hit} attribute={productName} />
                </h3>
                <div className="srpItem__infos__down">
                  <p className="srpItem__infos__down__price">{hit[price]}</p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

const CustomHitsComponent = connectHits(CustomHits);

export default CustomHitsComponent;
