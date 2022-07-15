// Render the Header component in Main.jsx, for large screen sizes
import { useState } from 'react';
// React Tour
import { useTour } from '@reactour/tour';

// React Router
import { Link } from 'react-router-dom';

// Recoil State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Import SearchBox config
import {
  queryAtom,
  searchBoxAtom,
  searchBoxIsActive,
} from '@/config/searchboxConfig';

//Import config for federatedSearch
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

// Import voiceSearch config
import { shouldHaveVoiceSearch } from '@/config/featuresConfig';

// Import Demo tour config
import { shouldShowDemoTour } from '@/config/demoTourConfig';

// Import applied rules config
import { rulesAtom } from '@/config/appliedRulesConfig';

// Custom Hooks
import useOutsideClick from '@/hooks/useOutsideClick';

import logo from '@/assets/logo/logo.webp';

// Import Components
import CustomSearchBox from '@/components/searchbox/SearchBox';
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch';
import Navigation from './Navigation';
import CustomSkeleton from '@/components/skeletons/CustomSkeleton';

const HeaderLaptop = () => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  // React Tour
  const { setIsOpen } = useTour();

  const [searchboxRef, setSearchBoxRef] = useRecoilState(searchBoxAtom);
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch);
  const setSbIsActive = useSetRecoilState(searchBoxIsActive);
  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch);
  const displayDemoTour = useRecoilValue(shouldShowDemoTour);
  const rulesApplied = useSetRecoilState(rulesAtom);

  useOutsideClick(searchboxRef, () => setSbIsActive(false));

  return (
    <div className="container">
      <div className="container__header-top">
        {displayDemoTour && (
          <button className="open-tour__button" onClick={() => setIsOpen(true)}>
            Open Tour
          </button>
        )}
        <div className="container__header-top__title">
          <h1>Demo BoilerPlate</h1>
        </div>
        <div className="container__header-top__logo">
          <Link
            to="/"
            aria-label="link to home"
            onClick={() => {
              setQueryState('');
              federated(false);
              rulesApplied([]);
              // LEFT IN FOR REFACTO PURPOSES
              // setUnderlineCategory(null);
            }}
          >
            {/* Add possibility to change the Logo */}
            <img src={logo} alt="" onLoad={() => setIsLogoLoaded(true)} />
            {isLogoLoaded === false && <CustomSkeleton type="logo" />}
          </Link>
        </div>
        {/* For a search box Simple center */}
        <div className="searchbox-container" ref={setSearchBoxRef}>
          <CustomSearchBox />
          {displayVoiceSearch && <CustomVoiceSearchComponent />}
        </div>
      </div>
      <div className="container__header-nav">
        <Navigation />
      </div>
    </div>
  );
};

export default HeaderLaptop;
