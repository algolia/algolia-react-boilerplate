import React from 'react';

//RECOMMEND
import {
  RelatedProducts,
  FrequentlyBoughtTogether,
} from '@algolia/recommend-react';
import algoliarecommend from '@algolia/recommend';

// framer-motion
import { motion } from 'framer-motion';
import { framerMotionPage, framerMotionTransition } from '../config/config';

// Import components
import { ChevronLeft } from '../assets/svg/SvgIndex';
import HomeCarousel from '../components/carousels/HomeCarousel';
import RelatedItem from '../components/recommend/RelatedProducts';

// Algolia search client
import { searchClient, indexName } from '../config/config';

// React router import
import { useNavigate } from 'react-router-dom';

// Recoil import
import { useRecoilValue } from 'recoil';
import { hitAtom } from '../config/results';

const ProductDetails = () => {
  const hit = useRecoilValue(hitAtom);
  const navigate = useNavigate();

  const recommendClient = algoliarecommend(
    searchClient.appID,
    searchClient.APIKey
  );

  return (
    <div
      className="pdp"
      variants={framerMotionPage}
      initial={framerMotionPage.initial}
      animate={framerMotionPage.animate}
      exit={framerMotionPage.exit}
      transition={framerMotionPage.transition}
    >
      <div className="pdp__wrapper">
        <div className="pdp__backBtn" onClick={() => navigate(-1)}>
          <ChevronLeft />
          <p>Back to search</p>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { framerMotionTransition },
          }}
          className="pdp__left"
        >
          <motion.div
            className="container"
            initial={{
              height: '100%',
              opacity: 0,
            }}
            animate={{
              x: 0,
              width: '100%',
              opacity: 1,
              transition: { delay: 0.2, framerMotionTransition },
            }}
          >
            <motion.div className="imageWrapper">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={framerMotionTransition}
                src={hit.full_url_image}
                alt=""
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="pdp__right">
          <motion.div
            className="pdp__right__infos"
            initial={{
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5, framerMotionTransition },
            }}
          >
            <p className="brand">{hit.brand}</p>
            <p className="name">{hit.name}</p>
            <p className="color">{hit.colour}</p>
            <div className="sizes">
              <p>Available size(s):</p>
              <motion.div className="sizeList">
                {hit.sizeFilter.map((size) => (
                  <motion.div className="size">
                    <p>{size}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { delay: 1, framerMotionTransition },
              }}
              className="price"
            >
              {hit.price}
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="recommend">
        <RelatedProducts
          recommendClient={recommendClient}
          indexName={indexName.index}
          objectIDs={[hit.objectID]}
          itemComponent={RelatedItem}
          maxRecommendations={5}
        />
        <FrequentlyBoughtTogether
          recommendClient={recommendClient}
          indexName={indexName.index}
          objectIDs={[hit.objectID]}
          itemComponent={RelatedItem}
          maxRecommendations={5}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
