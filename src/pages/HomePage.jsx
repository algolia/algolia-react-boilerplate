// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

import { framerMotionPage } from '../config/config';
// change to import from '../config/animationConfig;

// recoil import
import { useRecoilValue } from 'recoil';

// components import
import CustomHomeBanners from '../components/banners/HomeBanners';
import FederatedSearch from '../components/federatedSearch/FederatedSearch';
import HomeCarousel from '../components/carousels/HomeCarousel';

// should carousel be shown or not and config for carousel
import {
  isCarouselAtom,
  carouselConfig,
} from '../config/carouselConfig';

//  should federated search be shown or not
import { isFederatedAtom } from '../config/config';

const HomePage = () => {
  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(isFederatedAtom);
  const isCarousel = useRecoilValue(isCarouselAtom);

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
  
      {isFederated && 
        <AnimatePresence>
          {/* Loads federated search if isFederated is true */}
          <FederatedSearch />
        </AnimatePresence>
      }

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
