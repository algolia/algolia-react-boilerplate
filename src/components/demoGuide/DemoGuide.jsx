import { useRef } from 'react';
import { motion } from 'framer-motion';

//Import component
import SearchTerms from './components/SearchTerms';
import SearchBanners from './components/SearchBanners';
import SearchPersona from './components/SearchPersona';
import DemoGuideInjectedContent from './components/DemoGuideInjectedContent';
import DemoGuideDynamicFilters from './components/DemoGuideDynamicFilters';

//Import Hooks
import useScreenSize from '@/hooks/useScreenSize';
import useOutsideClick from '@/hooks/useOutsideClick';

// Import Recoil Config
import {
  shouldHaveInjectedBanners,
  shouldHavePersona,
} from '@/config/featuresConfig';
import { useRecoilValue } from 'recoil';

//Import custom transition for panel animations
import { framerMotionTransition } from '@/config/animationConfig';

import DemoGuideRedirect from './components/DemoGuideRedirect';

const DemoGuide = ({ onClickOutside }) => {
  //Listen for screen resize
  const { tablet, mobile } = useScreenSize();

  //Select Panel wrapper
  const demoGuide = useRef();

  // Const Recoil to use Recoil Value
  const displayBanner = useRecoilValue(shouldHaveInjectedBanners);
  const displayPersona = useRecoilValue(shouldHavePersona);

  //Listen for click outside the Demo Guide panel
  useOutsideClick(demoGuide, onClickOutside);
  return (
    <motion.div
      ref={demoGuide}
      className={`${
        tablet || mobile ? 'helpNavigation-mobile' : ''
      } helpNavigation`}
      initial={{ opacity: 0, x: '120%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={framerMotionTransition}
    >
      <h2>Help Navigation Panel</h2>
      <ul className="container-nav-help">
        <li className="container-nav-help__items ">
          <SearchTerms />
          <hr />
        </li>
        {displayBanner && (
          <li className="container-nav-help__items ">
            <SearchBanners />
            <hr />
          </li>
        )}
        {displayPersona && (
          <li className="container-nav-help__items ">
            <SearchPersona />
            <hr />
          </li>
        )}
        <li className="container-nav-help__items ">
          <DemoGuideInjectedContent />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <DemoGuideDynamicFilters />
          <hr />
        </li>
        <li className="container-nav-help__items ">
          <DemoGuideRedirect />
          <hr />
        </li>
      </ul>
    </motion.div>
  );
};

export default DemoGuide;
