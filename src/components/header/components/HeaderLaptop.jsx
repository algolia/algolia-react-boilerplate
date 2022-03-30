// Render the Header component in Main.jsx, for large screen sizes

// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '../../../config/searchbox';

//Import config for federatedSearch
import { isFederatedAtom, isVoiceSearch } from '../../../config/config';

import { logoUrl } from '../../../config/headerConfig';

// Import SearchBox
// Rename customSearchbox
import CustomSearchBox from '../../searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '../../voicesearch/VoiceSearch';
import Navigation from './Navigation';

const HeaderLaptop = () => {
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(isFederatedAtom);
  // Define value to display voiceSearch
  const displayVoiceSearch = useSetRecoilState(isVoiceSearch);

  return (
    <div className="container">
      <div className="container__header-top">
        <div className="container__header-top__logo">
          <Link
            to="/"
            onClick={() => {
              setQueryState('');
              federated(false);
            }}
          >
            {/* Add possibility to change the Logo */}
            <img
              src={logoUrl}
              alt=""
            />
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
