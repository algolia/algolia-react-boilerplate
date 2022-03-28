// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';
import { framerMotionPage } from '../config/config';

// recoil import
import { useRecoilValue } from 'recoil';

// components import
import CustomHomeBanners from '../components/banners/HomeBanners';
import FederatedSearch from '../components/federatedSearch/FederatedSearch';

// should federated search & carousel be shown or not
import {
  isFederatedAtom,
  carouselConfig,
  isCarouselAtom,
} from '../config/config';

import HomeCarousel from '../components/carousels/HomeCarousel';

const HomePage = () => {
  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(isFederatedAtom);

  const isCarousel = useRecoilValue(isCarouselAtom);

  return (
    // Framer motion wrapper
    <motion.div
      className="homepage"
      initial={framerMotionPage.initial}
      animate={framerMotionPage.animate}
      variants={framerMotionPage}
      exit={framerMotionPage.exit}
      transition={framerMotionPage.transition}
    >
      <AnimatePresence>
        {/* Loads federated search if isFederated is true */}
        {isFederated && <FederatedSearch />}
      </AnimatePresence>

      {/* Load custom banners */}
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
