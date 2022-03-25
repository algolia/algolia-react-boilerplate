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
import { searchClient, indexName } from '../config/appConfig';

// React router import
import { useNavigate } from 'react-router-dom';

// Recoil import
import { useRecoilValue } from 'recoil';
import { hitAtom } from '../config/results';
import { isRelatedProducts, isFbtProducts } from '../config/config';
import { hitsConfig } from '../config/hits';

// Custom hooks
import useScreenSize from '../hooks/useScreenSize';

const ProductDetails = () => {
  const hit = useRecoilValue(hitAtom);
  const isRelatedProductsValue = useRecoilValue(isRelatedProducts);
  const isFbtProductsValue = useRecoilValue(isFbtProducts);
  const navigate = useNavigate();

  const recommendClient = algoliarecommend(
    searchClient.appID,
    searchClient.APIKey
  );

  const { tablet, mobile } = useScreenSize();

  // Get hit attribute from config file
  const { price, objectID, image, productName } = useRecoilValue(hitsConfig);

  return (
    <div
      className={`${mobile || tablet ? 'pdp-mobile' : ''} pdp`}
      variants={framerMotionPage}
      initial={framerMotionPage.initial}
      animate={framerMotionPage.animate}
      exit={framerMotionPage.exit}
      transition={framerMotionPage.transition}
    >
      <div
        className={`${
          mobile || tablet ? 'pdp-mobile__wrapper' : 'pdp__wrapper'
        }`}
      >
        <div
          className={`${
            mobile || tablet ? 'pdp-mobile__backBtn' : 'pdp__backBtn'
          }`}
          onClick={() => navigate(-1)}
        >
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
          className={`${mobile || tablet ? 'pdp-mobile__left' : 'pdp__left'}`}
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
                src={hit[image]}
                alt=""
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div
          className={`${mobile || tablet ? 'pdp-mobile__right' : 'pdp__right'}`}
        >
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
            <p className="brand">{hit[brand]}</p>
            <p className="name">{hit[productName]}</p>
            <p className="color">{hit[colour]}</p>
            <div className="sizes">
              <p>Available size(s):</p>
              <motion.div className="sizeList">
                {hit[sizeFilter].map((size, i) => (
                  <motion.div className="size" key={i}>
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
              {hit[price]}
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="recommend">
        {isRelatedProductsValue && (
          <RelatedProducts
            recommendClient={recommendClient}
            indexName={indexName.index}
            objectIDs={[hit[objectID]]}
            itemComponent={RelatedItem}
            maxRecommendations={5}
          />
        )}
        {isFbtProductsValue && (
          <FrequentlyBoughtTogether
            recommendClient={recommendClient}
            indexName={indexName.index}
            objectIDs={[hit[objectID]]}
            itemComponent={RelatedItem}
            maxRecommendations={5}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
