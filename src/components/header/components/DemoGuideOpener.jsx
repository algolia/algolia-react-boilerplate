import { useRecoilState, useSetRecoilState } from 'recoil';

//Import the option pictogram component
import { OptionDots } from '@/assets/svg/SvgIndex';

//Import config from helped navigation
import { demoGuideBtnRef, isDemoGuideOpen } from '@/config/demoGuideConfig';

export const DemoGuideOpener = () => {
  const demoGuideBtn = useSetRecoilState(demoGuideBtnRef);

  // Showing or hiding help navigation menu
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen);

  return (
    <div
      ref={demoGuideBtn}
      className={`${
        showDemoGuide ? 'optionDots__wrapper-active' : ''
      } optionDots__wrapper`}
      onClick={(e) => {
        setshowDemoGuide(!showDemoGuide);
      }}
    >
      <p>Guide</p>
      <OptionDots />
    </div>
  );
};
