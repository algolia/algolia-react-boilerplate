import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { Configure, Index, useHits } from 'react-instantsearch-hooks-web';
// React Router
import { useNavigate } from 'react-router-dom';

// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Import configuration
import { mainIndex } from '@/config/algoliaEnvConfig';
import { framerMotionTransition } from '@/config/animationConfig';
import { hitsPerCarousel } from '@/config/carouselConfig';
import { hitAtom } from '@/config/hitsConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';

// In case of img loading error

// import Price component
import { windowSize } from '@/hooks/useScreenSize';

//Import scope SCSS
import SkeletonLoader from '../hits/components/HitsSkeletonLoader';
import './SCSS/carousels.scss';

// Import cart from recoil
import HitsCarousel from './HitsCarousel';

// Build the Carousel for use on the Homepage
const HomeCarousel = ({ context, title }) => {
  const index = useRecoilValue(mainIndex);
  const userToken = useRecoilValue(personaSelectedAtom);
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);

  const { mobile } = useRecoilValue(windowSize);

  return (
    <div className={`${mobile ? 'home-carousel-mobile' : 'home-carousel'}`}>
      <Index indexId={title} indexName={index}>
        <Configure
          hitsPerPage={hitsPerCarousel}
          ruleContexts={context}
          optionalFilters={segmentOptionalFilters}
          userToken={userToken}
          query={''}
        />
        <Carousel title={title} />
      </Index>
    </div>
  );
};

// This carousel is used inside of HomeCarousel

function Carousel(props) {
  const { hits } = useHits(props);
  const { title } = props;
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Get the main index
  const index = useRecoilValue(mainIndex);

  // Navigate is used by React Router
  const navigate = useNavigate();

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom);

  const carousel = useRef();

  useEffect(() => {
    !isLoading &&
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [hits, isLoading]);

  useEffect(() => {
    if (hits.length > 0) setIsLoading(false);
  }, [hits]);

  return (
    <>
      <h3 className="title">{title}</h3>
      {/* This div declares the outer reference for the framer motion */}
      {isLoading ? (
        <SkeletonLoader type="carousel" />
      ) : (
        <motion.div
          ref={carousel}
          className="carousel"
          whileTap={{ cursor: 'grabbing' }}
        >
          {/* This div declares the parameters for the carousel dragging effect */}
          <motion.div
            // ADD THAT TO NEW FILE ABOUT ANIMATION IN CONFIG
            draggable
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
              return <HitsCarousel hit={hit} key={i} index={index} />;
            })}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default HomeCarousel;
