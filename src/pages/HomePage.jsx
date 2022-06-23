// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels

// Algolia search client

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';
import React, { lazy, Suspense, useRef, useEffect } from 'react';

// recoil import
import { useRecoilValue } from 'recoil';

// Import screenShot/ images for the homepage
import homepage_1 from '../assets/homepage/homepage_1.png';
import homepage_2 from '../assets/homepage/homepage_2.png';

import Loader from '@/components/loader/Loader';
import { searchClientCreds, mainIndex } from '@/config/algoliaEnvConfig';
import { framerMotionPage } from '@/config/animationConfig';

// should carousel be shown or not and config for carousel
import { carouselConfig } from '@/config/carouselConfig';

//  should federated search be shown or not
import {
  shouldHaveFederatedSearch,
  shouldHaveCarousels,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig';
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

// components import
const CustomHomeBanners = lazy(() =>
  import('@/components/banners/HomeBanners')
);

const FederatedSearch = lazy(() =>
  import('@/components/federatedSearch/FederatedSearch')
);

const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'));

const Trending = lazy(() => import('@/components/trending/TrendingProducts'));

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
    <div
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
        {/* <CustomHomeBanners /> */}
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
          <Suspense fallback={<Loader />}>
            <Trending filter={null} />
          </Suspense>
        )}
      </div>

      {homepage_1 ? <img src={homepage_1} alt="" /> : null}

      {homepage_2 && <img src={homepage_2} alt="" />}
    </div>
  );
};

export default HomePage;
