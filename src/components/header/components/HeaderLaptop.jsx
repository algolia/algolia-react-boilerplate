// Render the Header component in Main.jsx, for large screen sizes

// React Tour
import { useTour } from '@reactour/tour';

// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

//Import config for federatedSearch
import { shouldHaveVoiceSearch } from '@/config/featuresConfig';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

import { logoUrl, categorySelectionAtom } from '@/config/headerConfig';

import { shouldShowDemoTour } from '@/config/demoTourConfig';

// Import SearchBox
// Rename customSearchbox
import CustomSearchBox from '@/components/searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch';
import Navigation from './Navigation';

import { rulesAtom } from '@/config/appliedRulesConfig';

const HeaderLaptop = () => {
  // React Tour
  const { setIsOpen } = useTour();

  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch);

  const categorySelection = useRecoilValue(categorySelectionAtom);
  // LEFT IN FOR REFACTO PURPOSES
  // const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);

  // Define value to display voiceSearch
  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch);
  const displayDemoTour = useRecoilValue(shouldShowDemoTour);

  const rulesApplied = useSetRecoilState(rulesAtom);

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
              // LEFT IN FOR REFACTO PURPOSES
              // setUnderlineCategory(null);
            }}
          >
            {/* Add possibility to change the Logo */}
            <img src={logoUrl} alt="" />
          </Link>
          {displayDemoTour && (
            <button
              className="open-tour__button"
              onClick={() => setIsOpen(true)}
            >
              Open Tour
            </button>
          )}
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
      </div>
    </div>
  );
};

export default HeaderLaptop;
