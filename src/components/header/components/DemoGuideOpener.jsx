import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

//Import the option pictogram component
import { OptionDots } from '@/assets/svg/SvgIndex'

//Import config from helped navigation
import { demoGuideBtnRef, isDemoGuideOpen } from '@/config/demoGuideConfig'

import { windowSize } from '@/hooks/useScreenSize'

import { isFacetPanelOpen } from '@/config/refinementsConfig'

export const DemoGuideOpener = () => {
  const demoGuideBtn = useSetRecoilState(demoGuideBtnRef)

  // Showing or hiding help navigation menu
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen)

  // Handling screensizer
  const { isDesktop } = useRecoilValue(windowSize)

  const [isFacetsPanelOpen, setIsFacetsPanelOpen] =
    useRecoilState(isFacetPanelOpen)

  return (
    <div
      ref={demoGuideBtn}
      className={`${
        showDemoGuide ? 'optionDots__wrapper-active' : ''
      } optionDots__wrapper`}
      onClick={(e) => {
        setshowDemoGuide(!showDemoGuide)
        if (!isDesktop && isFacetsPanelOpen) setIsFacetsPanelOpen(false)
      }}
    >
      <p>Guide</p>
      <OptionDots />
    </div>
  )
}
