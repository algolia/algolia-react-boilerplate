// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels

// import algolia recommend
import algoliarecommend from '@algolia/recommend';
import {
  TrendingItems,
} from '@algolia/recommend-react';

// Algolia search client
import { searchClientCreds, mainIndex } from '@/config/algoliaEnvConfig';

import React, { lazy, Suspense, useRef, useEffect } from 'react';

import Loader from '@/components/loader/Loader';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

import { framerMotionPage } from '@/config/animationConfig';

// recoil import
import { useRecoilValue } from 'recoil';

// Import screenShot/ images for the homepage
import homepage_1 from '../assets/homepage/homepage_1.png';
import homepage_2 from '../assets/homepage/homepage_2.png';


// components import
const CustomHomeBanners = lazy(() =>
  import('@/components/banners/HomeBanners')
);
const FederatedSearch = lazy(() =>
  import('@/components/federatedSearch/FederatedSearch')
);
const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'));
import RelatedItem from '@/components/recommend/RelatedProducts';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme';


// should carousel be shown or not and config for carousel
import { carouselConfig } from '@/config/carouselConfig';

//  should federated search be shown or not
import {
  shouldHaveFederatedSearch,
  shouldHaveCarousels,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig';

// trending carousel config
import { trendingConfig } from '@/config/trendingConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

const HomePage = ({ setIsMounted }) => {
  // Get the main index
  const index = useRecoilValue(mainIndex);

  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(shouldHaveFederatedSearch);
  const isCarousel = useRecoilValue(shouldHaveCarousels);
  const isFederatedOpen = useRecoilValue(shouldHaveOpenFederatedSearch);
  const HomePage = useRef(false);

  // Boolean value which determines if federated search is shown or not, default is false
  const shouldHaveTrendingProductsValue = useRecoilValue(
    shouldHaveTrendingProducts
  );

  // define the client for using Recommend
  const recommendClient = algoliarecommend(
    searchClientCreds.appID,
    searchClientCreds.APIKey
  );

  useEffect(() => {
    HomePage.current = true;
    setIsMounted(HomePage.current);
    return () => {
      HomePage.current = false;
      setIsMounted(HomePage.current);
    };
  }, []);

  // Prevent body from scrolling when panel is open
  // usePreventScrolling(isFederatedOpen);

  return (
    // Framer motion wrapper
    <motion.div
      className="homepage"
      // initial state
      initial={framerMotionPage.initial}
      // actual animation
      animate={framerMotionPage.animate}
      // everything the animation needs to function
      variants={framerMotionPage}
      // what to do when unmounted
      exit={framerMotionPage.exit}
      // duration, smoothness etc.
      transition={framerMotionPage.transition}
      ref={HomePage}
    >
      {isFederated && isFederatedOpen && (
        <AnimatePresence>
          {/* Loads federated search if isFederated is true */}
          <Suspense fallback={<Loader />}>
            <FederatedSearch />
          </Suspense>
        </AnimatePresence>
      )}

      {/* Load custom banners */}
      <Suspense fallback={<Loader />}>
        <CustomHomeBanners />
      </Suspense>

      {isCarousel &&
        carouselConfig.map((carousel, i) => (
          <Suspense key={i} fallback={<Loader />}>
            <HomeCarousel context={carousel.context} title={carousel.title} />
          </Suspense>
        ))}

      {/* Render Recommend component - Trending Products Slider */}
      {/* Change header and maxRecommendations in /config/trendingConfig.js */}
      <div className="recommend">
        {shouldHaveTrendingProductsValue && (
          <div>
            <TrendingItems
              recommendClient={recommendClient}
              indexName={index}
              itemComponent={RelatedItem}
              maxRecommendations={trendingConfig.maxRecommendations}
              view={HorizontalSlider}
              headerComponent={TrendingSliderTitle}
              threshold={trendingConfig.threshold}
            />
          </div>
        )}
      </div>


      {homepage_1 ? <img src={homepage_1} alt="" /> : null}

      {homepage_2 && <img src={homepage_2} alt="" />}
    </motion.div>
  );
};


function TrendingSliderTitle() {
  return (
    <h3>
      {trendingConfig.title}
    </h3>
  );
}

export default HomePage;

