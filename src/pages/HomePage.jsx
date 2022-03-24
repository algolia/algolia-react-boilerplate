import React from 'react';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';
import { framerMotionPage } from '../config/config';

import CustomHomeBanners from '../components/banners/HomeBanners';
import Header from '../components/header/Header';
import FederatedSearch from '../components/federatedSearch/FederatedSearch';
import {
  isFederatedAtom,
  carouselConfig,
  isCarouselAtom,
} from '../config/config';

//recoil import
import { useRecoilValue } from 'recoil';
import HomeCarousel from '../components/carousels/HomeCarousel';

const HomePage = () => {
  const isFederated = useRecoilValue(isFederatedAtom);
  const isCarousel = useRecoilValue(isCarouselAtom);

  return (
    <motion.div
      className="homepage"
      initial={framerMotionPage.initial}
      animate={framerMotionPage.animate}
      variants={framerMotionPage}
      exit={framerMotionPage.exit}
      transition={framerMotionPage.transition}
    >
      <AnimatePresence>{isFederated && <FederatedSearch />}</AnimatePresence>
      {/* Here it's the custom banners */}
      <CustomHomeBanners />
      {isCarousel &&
        carouselConfig.map((carousel, i) => {
          return (
            <HomeCarousel
              key={i}
              attribute={carousel.attribute}
              title={carousel.title}
            />
          );
        })}
    </motion.div>
  );
};

export default HomePage;
