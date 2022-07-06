// Page for Product details, after clicking on an item from search
// It contains both Recommend components

import { useEffect, useState } from 'react';

// Recommend
import {
  useRelatedProducts,
  useFrequentlyBoughtTogether
} from '@algolia/recommend-react';


// Slider for recommend
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme';

// framer-motion
import { motion } from 'framer-motion';
import get from 'lodash/get';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { ChevronLeft } from '@/assets/svg/SvgIndex';
import Price from '@/components/hits/components/Price.jsx';
import RelatedItem from '@/components/recommend/relatedItems/RelatedProducts';
import { mainIndex, searchClient, recommendClient } from '@/config/algoliaEnvConfig';
import {
  framerMotionPage,
  framerMotionTransition,
} from '@/config/animationConfig';

// In case of img loading error
import * as placeHolderError from '@/assets/logo/logo.webp';
import { alertContent, isAlertOpen } from '@/config/demoGuideConfig';
import {
  shouldHaveFbtProducts,
  shouldHaveRelatedProducts,
} from '@/config/featuresConfig';
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

import { hitAtom, hitsConfig, PDPHitSections } from '@/config/hitsConfig';

// Used to send insights event on add to cart
import { personaSelectedAtom } from '@/config/personaConfig';

// Custom hooks
import { windowSize } from '@/hooks/useScreenSize';

// Send an insights event to algolia
import useSendAlgoliaEvent from '@/hooks/useSendAlgoliaEvent';

//Import scope SCSS
import './SCSS/productDetails.scss';

const ProductDetails = () => {
  // For alert on sending add to cart event
  const setAlert = useSetRecoilState(alertContent);
  const setAlertOpen = useSetRecoilState(isAlertOpen);

  // Function to manage the alert
  const triggerAlert = (content) => {
    setAlertOpen(true);
    setAlert(content);
    setTimeout(() => setAlertOpen(false), 5000);
  };

  // location in order to access current objectID
  const location = useLocation();

  // access the main index from recoil state
  const indexName = useRecoilValue(mainIndex);

  // access the hit component from recoil state
  const [hit, setHit] = useRecoilState(hitAtom);

  const [readyToLoad, setReadyToLoad] = useState(false)

  // current Object ID from URL
  const currentObjectID = location.pathname.split('/')[2]

  // if there is no stored hit
  useEffect(() => {
    if (Object.keys(hit).length === 0) {
      // initialise the API client
      const index = searchClient.initIndex(indexName)

      // Find the hit by Object ID through Algolia
      index.search('', { facetFilters: `objectID:${currentObjectID}` }).then(({ hits }) => {
        if (hits.length && hits.length > 0) {
          // Set the hit atom
          setHit(hits[0])
          setReadyToLoad(true)
        }
      });
    } else {
      setReadyToLoad(true)
    }
  }, [])

  // personalisation user token
  const userToken = useRecoilValue(personaSelectedAtom);

  // Get the main index
  const index = useRecoilValue(mainIndex);

  const shouldHaveRelatedProductsValue = useRecoilValue(
    shouldHaveRelatedProducts
  );

  const shouldHaveFbtProductsValue = useRecoilValue(shouldHaveFbtProducts);

  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);
  setFederatedOpen(false);

  // navigate is used by react router
  const navigate = useNavigate();

  const { tablet, mobile } = useRecoilValue(windowSize);

  // Get hit attribute from config file
  const {
    objectID,
    image,
    productName,
    brand,
    sizeFilter,
    colour,
    colourHexa,
  } = hitsConfig;

  const hexaCode = get(hit, colourHexa)?.split(';')[1];

  const { recommendations: fbtRecommendations } = useFrequentlyBoughtTogether({
    recommendClient,
    indexName,
    objectIDs: [currentObjectID],
  });

  const { recommendations: relatedRecommendations } = useRelatedProducts({
    recommendClient,
    indexName,
    objectIDs: [currentObjectID],
  });

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
        className={`${mobile || tablet ? 'pdp-mobile__wrapper' : 'pdp__wrapper'
          }`}
      >
        <div
          className={`${mobile || tablet ? 'pdp-mobile__backBtn' : 'pdp__backBtn'
            }`}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          <p>Back to search</p>
        </div>
        <div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { framerMotionTransition },
          }}
          className={`${mobile || tablet ? 'pdp-mobile__left' : 'pdp__left'}`}
        >
          <div
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
            <div className="imageWrapper">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={framerMotionTransition}
                src={get(hit, image)}
                alt=""
                onError={(e) => (e.currentTarget.src = placeHolderError)}
              />
            </div>
          </div>
        </div>
        <div
          className={`${mobile || tablet ? 'pdp-mobile__right' : 'pdp__right'}`}
        >
          <div
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
            {PDPHitSections.brand && <p className="brand">{get(hit, brand)}</p>}
            {PDPHitSections.productName && (
              <p className="name">{get(hit, productName)}</p>
            )}
            {PDPHitSections.colour && (
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
                <p>{get(hit, colour)}</p>
              </div>
            )}

            {PDPHitSections.sizeFilter && get(hit, sizeFilter)?.length > 0 && (
              <div className="sizes">
                <p>Available size(s):</p>
                <div className="sizeList">
                  {get(hit, sizeFilter).map((size, i) => (
                    <div className="size" key={i}>
                      <p>{size}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Add to cart button which sends an Insights API call to Algolia but only if there is no size filter */}

            {PDPHitSections.price && (
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
                <Price hit={hit} />
              </motion.p>
            )}
            {!PDPHitSections.sizeFilter && (
              <motion.button
                className="add-to-cart"
                onClick={() => {
                  triggerAlert('Sending add to cart event to Algolia'),
                    useSendAlgoliaEvent(
                      'clickedObjectIDs',
                      userToken,
                      index,
                      hit,
                      'add-to-cart'
                    );
                }}
              >
                <i className="fa-solid fa-shopping-cart"></i>
                <p>Add to cart</p>
              </motion.button>
            )}
          </div>
        </div>
      </div>
      {/* Render two Recommend components - Related Products, Frequently Bought Together */}
      {readyToLoad && <div
        className="recommend"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { delay: 1, framerMotionTransition },
        }}
      >
        {shouldHaveRelatedProductsValue && relatedRecommendations.length > 0 && (
          <div>
            <h3 className="title">Related Products</h3>
            <HorizontalSlider itemComponent={RelatedItem} items={relatedRecommendations} />
          </div>
        )}
        {shouldHaveFbtProductsValue && fbtRecommendations.length > 0 && (
          <div>
            <h3 className="title">Frequently Bought Together</h3>
            <HorizontalSlider itemComponent={RelatedItem} items={fbtRecommendations} />
          </div>
        )}
      </div>}
    </div>
  );
};

export default ProductDetails;
