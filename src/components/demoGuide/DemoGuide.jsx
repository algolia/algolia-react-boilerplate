import { useRef } from 'react';
import { useRecoilValue } from 'recoil';

//Import components
import DemoGuideDynamicFilters from './components/DemoGuideDynamicFilters';
import DemoGuideInjectedContent from './components/DemoGuideInjectedContent';
import DemoGuideRedirect from './components/DemoGuideRedirect';
import DemoGuideRulesApplied from './components/DemoGuideRulesApplied';
import SearchBanners from './components/SearchBanners';
import SearchPersona from './components/SearchPersona';
import SearchTerms from './components/SearchTerms';

//Import Hooks
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';
import { windowSize } from '@/hooks/useScreenSize';

//Import custom transition for panel animations
import { framerMotionTransition } from '@/config/animationConfig';

// Import Reference for the Button that trigger the panel
import {
  demoGuideBtnRef,
  shouldShowAppliedRulesSwitcher,
  shouldShowBanners,
  shouldShowDynamicFilters,
  shouldShowInjectedContent,
  shouldShowPersonas,
  shouldShowRedirects,
  shouldShowSearchTerms,
} from '@/config/demoGuideConfig';

//Import scope SCSS
import './SCSS/demoGuide.scss';

const DemoGuide = ({ setshowDemoGuide }) => {
  //Select Panel wrapper
  const demoGuide = useRef();

  const shouldShowPersonasAtom = useRecoilValue(shouldShowPersonas);
  const shouldShowSearchTermsAtom = useRecoilValue(shouldShowSearchTerms);
  const shouldShowInjectedContentAtom = useRecoilValue(
    shouldShowInjectedContent
  );
  const shouldShowDynamicFiltersAtom = useRecoilValue(shouldShowDynamicFilters);
  const shouldShowRedirectsAtom = useRecoilValue(shouldShowRedirects);
  const shouldShowBannersAtom = useRecoilValue(shouldShowBanners);
  // Should the applied rules section shows in the demo panel
  const shouldShowRulesAppliedAtom = useRecoilValue(
    shouldShowAppliedRulesSwitcher
  );

  // Use the reference value of the button that trigger the panel
  const demoGuideBtn = useRecoilValue(demoGuideBtnRef);

  //Listen for screen resize
  const { tablet, mobile } = useRecoilValue(windowSize);

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(demoGuide, demoGuideBtn, () =>
    setshowDemoGuide(false)
  );

  return (
    <div
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
        {shouldShowRulesAppliedAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideRulesApplied />
            <hr />
          </li>
        )}
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
    </div>
  );
};

export default DemoGuide;
