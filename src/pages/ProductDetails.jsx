// Page for Product details, after clicking on an item from search
// It contains both Recommend components

// Recommend
import {
  RelatedProducts,
  FrequentlyBoughtTogether,
} from '@algolia/recommend-react';
import algoliarecommend from '@algolia/recommend';

// framer-motion
import { motion } from 'framer-motion';
import {
  framerMotionPage,
  framerMotionTransition,
} from '@/config/animationConfig';

// In case of img loading error
import { logoUrl as placeHolderError } from '@/config/headerConfig';

// Import components
import { ChevronLeft } from '@/assets/svg/SvgIndex';
import RelatedItem from '@/components/recommend/RelatedProducts';

// Algolia search client
import { searchClientCreds, indexNames } from '@/config/algoliaEnvConfig';

// React router import
import { useNavigate } from 'react-router-dom';

// Recoil import
import { useRecoilValue } from 'recoil';
import { hitAtom } from '@/config/hitsConfig';
import {
  shouldHaveRelatedProducts,
  shouldHaveFbtProducts,
} from '@/config/featuresConfig';
import { hitsConfig } from '@/config/hitsConfig';

// Custom hooks
import useScreenSize from '@/hooks/useScreenSize';

const ProductDetails = () => {
  // access the hit component from recoil state
  const hit = useRecoilValue(hitAtom);

  const shouldHaveRelatedProductsValue = useRecoilValue(
    shouldHaveRelatedProducts
  );
  const shouldHaveFbtProductsValue = useRecoilValue(shouldHaveFbtProducts);

  // navigate is used by react router
  const navigate = useNavigate();

  // define the client for using Recommend
  const recommendClient = algoliarecommend(
    searchClientCreds.appID,
    searchClientCreds.APIKey
  );

  const { tablet, mobile } = useScreenSize();

  // Get hit attribute from config file
  const {
    price,
    objectID,
    image,
    productName,
    brand,
    sizeFilter,
    colour,
    colourHexa,
  } = useRecoilValue(hitsConfig);

  const hexaCode = hit[colourHexa]?.split(';')[1];

  return (
    // Product Display Page parent container, including attributes for framer motion
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
                onError={(e) => (e.currentTarget.src = placeHolderError)}
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
            <div className="color">
              {hexaCode ? (
                <div
                  style={{
                    backgroundColor: hexaCode,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                ></div>
              ) : (
                ''
              )}
              <p>{hit[colour]}</p>
            </div>
            {hit[sizeFilter]?.length > 0 && (
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
            )}

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
      {/* Render both Recommend components- Related Products and Frequently Bought Together */}
      <div className="recommend">
        {shouldHaveRelatedProductsValue && (
          <RelatedProducts
            recommendClient={recommendClient}
            indexName={indexNames.mainIndex}
            objectIDs={[hit[objectID]]}
            itemComponent={RelatedItem}
            maxRecommendations={5}
          />
        )}
        {shouldHaveFbtProductsValue && (
          <FrequentlyBoughtTogether
            recommendClient={recommendClient}
            indexName={indexNames.mainIndex}
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
