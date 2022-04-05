// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels

import {lazy, Suspense } from 'react';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

import { framerMotionPage } from '@/config/animationConfig';

// recoil import
import { useRecoilValue } from 'recoil';

// components import
const CustomHomeBanners = lazy(() => import('@/components/banners/HomeBanners'));
const FederatedSearch = lazy(() => import('@/components/federatedSearch/FederatedSearch'));
const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'));

// should carousel be shown or not and config for carousel
import { carouselConfig } from '@/config/carouselConfig';

//  should federated search be shown or not
import { shouldHaveFederatedSearch, shouldHaveCarousels } from '@/config/featuresConfig';

const HomePage = () => {
  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(shouldHaveFederatedSearch);
  const isCarousel = useRecoilValue(shouldHaveCarousels);

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
    >
      {isFederated && (
        <AnimatePresence>
          {/* Loads federated search if isFederated is true */}
          <Suspense fallback={<div>Loading...</div>}>
            <FederatedSearch />
          </Suspense>
        </AnimatePresence>
      )}

      {/* Load custom banners */}
      <Suspense fallback={<div>Loading...</div>}>
        <CustomHomeBanners />
      </Suspense>

      {isCarousel &&
        carouselConfig.map((carousel, i) => (
          <Suspense fallback={<div>Loading...</div>}>
            <HomeCarousel
              key={i}
              attribute={carousel.attribute}
              title={carousel.title}
            />
          </Suspense>
        ))}
    </motion.div>
  );
};

export default HomePage;
