import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

//Import components
import SearchTerms from './components/SearchTerms';
import SearchBanners from './components/SearchBanners';
import SearchPersona from './components/SearchPersona';
import DemoGuideInjectedContent from './components/DemoGuideInjectedContent';
import DemoGuideDynamicFilters from './components/DemoGuideDynamicFilters';
import DemoGuideRedirect from './components/DemoGuideRedirect';

//Import Hooks
import useScreenSize from '@/hooks/useScreenSize';
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';

// Import Recoil Config
import {
  shouldHaveInjectedBanners,
  shouldHavePersona,
  shouldHaveInjectedHits,
  shouldHaveRedirect,
  shouldHaveDynamicFacet,
} from '@/config/featuresConfig';

//Import custom transition for panel animations
import { framerMotionTransition } from '@/config/animationConfig';

// Import Reference for the Button that trigger the panel
import { demoGuideBtnRef } from '@/config/demoGuideConfig';

const DemoGuide = ({ setShowHelpNavigation }) => {
  //Select Panel wrapper
  const demoGuide = useRef();

  // Const Recoil to use Recoil Value
  const displayBanner = useRecoilValue(shouldHaveInjectedBanners);
  const displayPersona = useRecoilValue(shouldHavePersona);
  const displayInjectedHits = useRecoilValue(shouldHaveInjectedHits);
  const displayDynamicFacet = useRecoilValue(shouldHaveDynamicFacet);
  const displayRedirect = useRecoilValue(shouldHaveRedirect);

  // Use teh reference value of the button that trigger the panel
  const demoGuideBtn = useRecoilValue(demoGuideBtnRef);
  //Listen for screen resize
  const { tablet, mobile } = useScreenSize();

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(demoGuide, demoGuideBtn, () =>
    setShowHelpNavigation(false)
  );

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
        {displayInjectedHits && (
          <li className="container-nav-help__items ">
            <DemoGuideInjectedContent />
            <hr />
          </li>
        )}
        {displayDynamicFacet && (
          <li className="container-nav-help__items ">
            <DemoGuideDynamicFilters />
            <hr />
          </li>
        )}
        {displayRedirect && (
          <li className="container-nav-help__items ">
            <DemoGuideRedirect />
            <hr />
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default DemoGuide;
