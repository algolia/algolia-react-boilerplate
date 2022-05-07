// Render the Header component in Main.jsx, for large screen sizes

// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

//Import config for federatedSearch
import { shouldHaveVoiceSearch } from '@/config/featuresConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

import { logoUrl, categorySelectionAtom } from '@/config/headerConfig';

//Import config from helped navigation
import { isDemoGuideOpen, demoGuideBtnRef } from '@/config/demoGuideConfig';

// Import SearchBox
// Rename customSearchbox
import CustomSearchBox from '@/components/searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch';
import Navigation from './Navigation';

import { rulesAtom } from '@/config/appliedRulesConfig';

//Import the option pictogram component
import { OptionDots } from '@/assets/svg/SvgIndex';

const HeaderLaptop = () => {
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch);
  const categorySelection = useRecoilValue(categorySelectionAtom);
  const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);
  // Define value to display voiceSearch
  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch);

  const rulesApplied = useSetRecoilState(rulesAtom);

  const demoGuideBtn = useSetRecoilState(demoGuideBtnRef);
  // Showing or hiding help navigation menu
  const [showDemoGuide, setshowDemoGuide] = useRecoilState(isDemoGuideOpen);

  return (
    <div className="container">
      <div className="container__header-top">
        <div className="container__header-top__logo">
          <Link
            to="/"
            onClick={() => {
              setQueryState('');
              federated(false);
              rulesApplied([]);
              setUnderlineCategory(null);

            }}
          >
            {/* Add possibility to change the Logo */}
            <img src={logoUrl} alt="" />
          </Link>
        </div>
        {/* For a search box Simple center */}
        <div className="searchbox-container">
          <CustomSearchBox />
          {displayVoiceSearch && <CustomVoiceSearchComponent />}
        </div>
        <div className="container__header-top__title">
          <h1>Demo BoilerPlate</h1>
        </div>
      </div>
      <div className="container__header-nav">
        <Navigation />
        {/* <SelectPersona /> */}
      </div>
    </div>
  );
};

export default HeaderLaptop;
