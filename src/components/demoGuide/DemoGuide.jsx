import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

//Import components
import SearchTerms from './components/SearchTerms';
import SearchBanners from './components/SearchBanners';
import SearchPersona from './components/SearchPersona';
import SearchSegments from './components/SearchSegments';
import DemoGuideInjectedContent from './components/DemoGuideInjectedContent';
import DemoGuideDynamicFilters from './components/DemoGuideDynamicFilters';
import DemoGuideRedirect from './components/DemoGuideRedirect';

//Import Hooks
import useScreenSize from '@/hooks/useScreenSize';
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';

//Import custom transition for panel animations
import { framerMotionTransition } from '@/config/animationConfig';

// Import Reference for the Button that trigger the panel
import {
  demoGuideBtnRef,
  shouldShowSearchTerms,
  shouldShowPersonas,
  shouldShowSegments,
  shouldShowInjectedContent,
  shouldShowDynamicFilters,
  shouldShowRedirects,
  shouldShowBanners,
} from '@/config/demoGuideConfig';
import { shouldHaveSegments } from '@/config/featuresConfig';

const DemoGuide = ({ setshowDemoGuide }) => {
  //Select Panel wrapper
  const demoGuide = useRef();

  const shouldShowPersonasAtom = useRecoilValue(shouldShowPersonas);
  const shouldShowSegmentsAtom = useRecoilValue(shouldShowSegments);
  const shouldShowSearchTermsAtom = useRecoilValue(shouldShowSearchTerms);
  const shouldShowInjectedContentAtom = useRecoilValue(
    shouldShowInjectedContent
  );
  const shouldShowDynamicFiltersAtom = useRecoilValue(shouldShowDynamicFilters);
  const shouldShowRedirectsAtom = useRecoilValue(shouldShowRedirects);
  const shouldShowBannersAtom = useRecoilValue(shouldShowBanners);

  // Use the reference value of the button that trigger the panel
  const demoGuideBtn = useRecoilValue(demoGuideBtnRef);

  //Listen for screen resize
  const { tablet, mobile } = useScreenSize();

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(demoGuide, demoGuideBtn, () =>
    setshowDemoGuide(false)
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
        {shouldShowSearchTermsAtom && (
          <li className="container-nav-help__items ">
            <SearchTerms />
            <hr />
          </li>
        )}
        {shouldShowBannersAtom && (
          <li className="container-nav-help__items ">
            <SearchBanners />
            <hr />
          </li>
        )}
        {shouldShowPersonasAtom && (
          <li className="container-nav-help__items ">
            <SearchPersona />
            <hr />
          </li>
        )}
        {shouldShowSegmentsAtom && (
          <li className="container-nav-help__items">
            <SearchSegments />
          </li>
        )}
        {shouldShowInjectedContentAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideInjectedContent />
            <hr />
          </li>
        )}
        {shouldShowDynamicFiltersAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideDynamicFilters />
            <hr />
          </li>
        )}
        {shouldShowRedirectsAtom && (
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
