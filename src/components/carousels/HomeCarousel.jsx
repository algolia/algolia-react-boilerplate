import { useRef, useEffect, useState } from 'react';

// Import Algolia functionality
import algoliasearch from 'algoliasearch/lite';
import { connectHits, Configure, InstantSearch } from 'react-instantsearch-dom';

// Import Framer Motion
import { motion } from 'framer-motion';

// React Router
import { useNavigate } from 'react-router-dom';

// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Import configuration
import { hitsConfig } from '../../config/hits';
import { indexName } from '../../config/appConfig';
import { hitAtom, hitsAtom } from '../../config/results';

import { framerMotionTransition } from '../../config/config';

// Build the Carousel for use on the Homepage
const HomeCarousel = ({ attribute, title, search }) => {
  return (
    <div className="home-carousel">
      <InstantSearch indexName={indexName.index} searchClient={search}>
        <Configure hitsPerPage={8} filters={attribute} />
        <CustomHitsCarousel title={title} />
      </InstantSearch>
    </div>
  );
};

// This carousel is used inside of HomeCarousel
const Carousel = ({ hits, title }) => {
  // Handle carousel effects when grabbing it
  const [width, setWidth] = useState(0);

  // Navigate is used by React Router
  const navigate = useNavigate();

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom);
  const { price, objectID, image, productName } = useRecoilValue(hitsConfig);

  // Used by Framer Motion
  const carousel = useRef();
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [hits]);
  return (
    <>
      <h3>{title}</h3>
      {/* This div declares the outer reference for the framer motion */}
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* This div declares the parameters for the carousel dragging effect */}
        <motion.div
          // ADD THAT TO NEW FILE ABOUT ANIMATION IN CONFIG
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={
            ({
              min: 0,
              max: 100,
              velocity: 0,
              power: 1,
              bounceStiffness: 10,
              bounceDamping: 1,
            },
            framerMotionTransition)
          }
          className="inner-carousel"
        >
          {/* Display the hits in the carousel */}
          {hits.map((hit, i) => {
            return (
              <motion.div key={i} className="item">
                <img src={hit[image]} alt={hit[productName]} />
                <div
                  className="item__infos"
                  onClick={() => {
                    hitState(hit);
                    // navigate to the product show page
                    navigate(`/search/${hit[objectID]}`);
                  }}
                >
                  <p className="name">{hit[productName]}</p>
                  <p className="price">{hit[price]}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};
const CustomHitsCarousel = connectHits(Carousel);

export default HomeCarousel;
