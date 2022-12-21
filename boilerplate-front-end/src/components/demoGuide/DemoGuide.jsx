import { useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

//Import components
import DemoGuideDynamicFilters from './components/DemoGuideDynamicFilters'
import DemoGuideInjectedContent from './components/DemoGuideInjectedContent'
import DemoGuideRedirect from './components/DemoGuideRedirect'
import DemoGuideLandingPage from './components/DemoGuideLandingPage'
import DemoGuideAlgoliaExplain from './components/DemoGuideAlgoliaExplain'
import SearchBanners from './components/DemoGuideSearchBanners'
import SearchPersona from './components/DemoGuideSearchPersona'
import SearchTerms from './components/DemoGuideSearchTerms'

//Import Hooks
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional'
import { windowSize } from '@/hooks/useScreenSize'

//Import custom transition for panel animations
import { framerMotionTransition } from '@/config/animationConfig'
import { motion } from 'framer-motion'

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
  shouldShowLandingPages,
} from '@/config/demoGuideConfig'

import { alertContent, isAlertOpen } from '@/config/demoGuideConfig'

//Import scope SCSS
import './SCSS/demoGuide.scss'

const DemoGuide = ({ refine, setshowDemoGuide }) => {
  // Recoil state for alert
  const setAlert = useSetRecoilState(alertContent)
  const setAlertOpen = useSetRecoilState(isAlertOpen)
  const triggerAlert = (content) => {
    setAlertOpen(true)
    setAlert(content)
    setTimeout(() => setAlertOpen(false), 5000)
  }

  // //Select Panel wrapper
  const demoGuide = useRef()

  const shouldShowLandingPagesAtom = useRecoilValue(shouldShowLandingPages)
  const shouldShowPersonasAtom = useRecoilValue(shouldShowPersonas)
  const shouldShowSearchTermsAtom = useRecoilValue(shouldShowSearchTerms)
  const shouldShowInjectedContentAtom = useRecoilValue(
    shouldShowInjectedContent
  )
  const shouldShowDynamicFiltersAtom = useRecoilValue(shouldShowDynamicFilters)
  const shouldShowRedirectsAtom = useRecoilValue(shouldShowRedirects)
  const shouldShowBannersAtom = useRecoilValue(shouldShowBanners)
  // Should the applied rules section shows in the demo panel
  const shouldShowRulesAppliedAtom = useRecoilValue(
    shouldShowAppliedRulesSwitcher
  )

  // Use the reference value of the button that trigger the panel
  const demoGuideBtn = useRecoilValue(demoGuideBtnRef)

  //Listen for screen resize
  const { tablet, mobile } = useRecoilValue(windowSize)

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(demoGuide, demoGuideBtn, () =>
    setshowDemoGuide(false)
  )

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
        {shouldShowRulesAppliedAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideAlgoliaExplain />
            <hr />
          </li>
        )}
        {shouldShowLandingPagesAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideLandingPage triggerAlert={triggerAlert} refine={refine} />
            <hr />
          </li>
        )}
        {shouldShowSearchTermsAtom && (
          <li className="container-nav-help__items ">
            <SearchTerms triggerAlert={triggerAlert} refine={refine} />
            <hr />
          </li>
        )}
        {shouldShowBannersAtom && (
          <li className="container-nav-help__items ">
            <SearchBanners triggerAlert={triggerAlert} refine={refine} />
            <hr />
          </li>
        )}
        {shouldShowPersonasAtom && (
          <li className="container-nav-help__items ">
            <SearchPersona triggerAlert={triggerAlert} refine={refine} />
            <hr />
          </li>
        )}
        {shouldShowInjectedContentAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideInjectedContent
              triggerAlert={triggerAlert}
              refine={refine}
            />
            <hr />
          </li>
        )}
        {shouldShowDynamicFiltersAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideDynamicFilters
              triggerAlert={triggerAlert}
              refine={refine}
            />
            <hr />
          </li>
        )}
        {shouldShowRedirectsAtom && (
          <li className="container-nav-help__items ">
            <DemoGuideRedirect triggerAlert={triggerAlert} refine={refine} />
            <hr />
          </li>
        )}
      </ul>
    </motion.div>
  )
}

export default DemoGuide
