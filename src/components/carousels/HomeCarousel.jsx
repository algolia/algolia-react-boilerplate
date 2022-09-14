import { useState, useRef, useEffect } from 'react';

import { Configure, Index, useHits } from 'react-instantsearch-hooks-web';
import { motion } from 'framer-motion';
// React Router
import { useNavigate } from 'react-router-dom';

// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LanguageSelectedAtom } from '@/config/languagesConfig';

// Import configuration
import { mainIndex } from '@/config/algoliaEnvConfig';
import { hitsPerCarousel } from '@/config/carouselConfig';
import { hitAtom, hitsConfig } from '@/config/hitsConfig';
import { personaSelectedAtom } from '@/config/personaConfig';
import { segmentSelectedAtom } from '@/config/segmentConfig';
import { isCarouselLoaded } from '@/config/carouselConfig';
import { framerMotionTransition } from '@/config/animationConfig';

// In case of img loading error
import * as placeHolderError from '@/assets/logo/logo.webp';

import get from 'lodash/get';

// import Price component
import Price from '@/components/hits/components/Price.jsx';
import { windowSize } from '@/hooks/useScreenSize';

//Import scope SCSS
import './SCSS/carousels.scss';

// Build the Carousel for use on the Homepage
const HomeCarousel = ({ context, title }) => {
  const index = useRecoilValue(mainIndex);
  const userToken = useRecoilValue(personaSelectedAtom);
  const segmentOptionalFilters = useRecoilValue(segmentSelectedAtom);
  const carouselLoaded = useRecoilValue(isCarouselLoaded);

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
  const LanguageSelected = useRecoilValue(LanguageSelectedAtom);
  const { hits } = useHits(props);
  const { title } = props;
  const [width, setWidth] = useState(0);

  // Navigate is used by React Router
  const navigate = useNavigate();

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom);
  const { objectID, image, productName } = hitsConfig;
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [hits]);

  return (
    <>
      <h3 className="title">{title}</h3>
      {/* This div declares the outer reference for the framer motion */}
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
            return (
              <div key={i} className="item">
                <div className="carousel__imageWrapper">
                  <img
                    src={get(hit, image)}
                    alt={get(hit, productName)}
                    onError={(e) => (e.currentTarget.src = placeHolderError)}
                  />
                </div>
                <div
                  className="item__infos"
                  onClick={() => {
                    hitState(hit);
                    // navigate to the product show page
                    navigate(`/search/${hit[objectID]}`);
                  }}
                >
                  <p className="name">{get(hit, productName)}</p>
                  <p className="price">
                    <Price hit={hit} />
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
}

export default HomeCarousel;
