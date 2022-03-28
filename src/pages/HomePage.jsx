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
import HomeCarousel from '../components/carousels/HomeCarousel';

// should federated search be shown or not
import { isFederatedAtom } from '../config/config';

// carousels to show on the homepage
import { carouselConfig } from '../config/config';

const HomePage = () => {
  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(isFederatedAtom);

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

      {/* Loops over carousels defined in config */}
      {carouselConfig.map((carousel, i) => {
        return (
          // Loads a carousel given a refinement attributes and a title to display
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
