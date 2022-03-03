import React from 'react';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';
import { pageItem } from '../config/config';

import CustomHomeBanners from '../components/banners/HomeBanners';
import Header from '../components/header/Header';
import FederatedSearch from '../components/federatedSearch/FederatedSearch';
import { isFederatedAtom, carouselConfig } from '../config/config';

//recoil import
import { useRecoilValue } from 'recoil';
import HomeCarousel from '../components/carousels/HomeCarousel';

const HomePage = () => {
  const isFederated = useRecoilValue(isFederatedAtom);
  return (
    <motion.div
      className="homepage"
      initial={pageItem.initial}
      animate={pageItem.animate}
      variants={pageItem}
      exit={pageItem.exit}
      transition={pageItem.transition}
    >
      <AnimatePresence>{isFederated && <FederatedSearch />}</AnimatePresence>
      {/* Here it's the custom banners */}
      <CustomHomeBanners />
      {carouselConfig.map((carousel, i) => {
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
