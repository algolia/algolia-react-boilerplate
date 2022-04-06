// Render the Header component in Main.jsx, for large screen sizes

// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useSetRecoilState, useRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

//Import config for federatedSearch
import {
  shouldHaveFederatedSearch,
  shouldHaveVoiceSearch,
} from '@/config/featuresConfig';

import { logoUrl } from '@/config/headerConfig';

//Import config from helped navigation
import { isDemoGuideOpen } from '@/config/demoGuideConfig';

// Import SearchBox
// Rename customSearchbox
import CustomSearchBox from '@/components/searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch';
import Navigation from './Navigation';

//Import the option pictogram component
import { OptionDots } from '@/assets/svg/SvgIndex';

const HeaderLaptop = () => {
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(shouldHaveFederatedSearch);
  // Define value to display voiceSearch
  const displayVoiceSearch = useSetRecoilState(shouldHaveVoiceSearch);
  // Showing or hiding help navigation menu
  const [showHelpNavigation, setShowHelpNavigation] =
    useRecoilState(isDemoGuideOpen);

  return (
    <div className="container">
      <div className="container__header-top">
        {/* Picto that returns SE menu on click */}
        <div
          className={`${
            showHelpNavigation ? 'optionDots__wrapper-active' : ''
          } optionDots__wrapper`}
          onClick={() => {
            setShowHelpNavigation(!showHelpNavigation);
          }}
        >
          <p>Guide</p>
          <OptionDots />
        </div>
        <div className="container__header-top__logo">
          <Link
            to="/"
            onClick={() => {
              setQueryState('');
              federated(false);
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
      <div className="container__header-bottom">
        <Navigation />
        {/* <SelectPersona /> */}
      </div>
    </div>
  );
};

export default HeaderLaptop;
