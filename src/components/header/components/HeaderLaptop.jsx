// Render the Header component in Main.jsx, for large screen sizes
import { useState } from 'react';

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

// Import applied rules config
import { rulesAtom } from '@/config/appliedRulesConfig';

//import Navigation config
import { navigationStateAtom } from '@/config/navigationConfig';

// Custom Hooks
import useOutsideClick from '@/hooks/useOutsideClick';

import logo from '@/assets/logo/logo.webp';

// Import Components
import CustomSearchBox from '@/components/searchbox/SearchBox';
import CustomSkeleton from '@/components/skeletons/CustomSkeleton';
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch';
import Navigation from './Navigation';

const HeaderLaptop = () => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [searchboxRef, setSearchBoxRef] = useRecoilState(searchBoxAtom);
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch);
  const setSbIsActive = useSetRecoilState(searchBoxIsActive);
  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch);
  const rulesApplied = useSetRecoilState(rulesAtom);
  const setNavigationState = useSetRecoilState(navigationStateAtom);

  useOutsideClick(searchboxRef, () => setSbIsActive(false));

  return (
    <div className="container">
      <div className="container__header-top">
        <div className="container__header-top__title">
          <h1>Demo BoilerPlate</h1>
        </div>
        <div className="container__header-top__logo">
          <Link
            to="/"
            aria-label="link to home"
            onClick={() => {
              setQueryState('');
              setNavigationState({});
              federated(false);
              rulesApplied([]);
            }}
          >
            {/* Add possibility to change the Logo */}
            <img
              src={logo}
              alt=""
              onLoad={() => setIsLogoLoaded(true)}
              width="200"
            />
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
