import algoliasearch from 'algoliasearch/lite';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { connectHits, Configure, InstantSearch } from 'react-instantsearch-dom';
// Recoil
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { hitsConfig } from '../../config/hits';
import { searchClient, indexName } from '../../config/appConfig';
import { hitAtom } from '../../config/results';

import { framerMotionTransition } from '../../config/config';

const HomeCarousel = ({ attribute, title }) => {
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);

  return (
    <div className="home-carousel">
      <InstantSearch indexName={indexName.index} searchClient={search}>
        <Configure hitsPerPage={8} filters={attribute} />
        <CustomHitsCarousel title={title} />
      </InstantSearch>
    </div>
  );
};

const Carousel = ({ hits, title }) => {
  const navigate = useNavigate();
  const hitState = useSetRecoilState(hitAtom);
  const { price, objectID, image, productName } = useRecoilValue(hitsConfig);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [hits]);
  return (
    <>
      <h3>{title}</h3>
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
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
          {hits.map((hit, i) => {
            return (
              <motion.div key={i} className="item">
                <img src={hit[image]} alt={hit[objectID]} />
                <div
                  className="item__infos"
                  onClick={() => {
                    hitState(hit);
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
