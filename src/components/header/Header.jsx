import React, { useRef } from 'react';
// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useRecoilState } from 'recoil';

// Import Config for the header
import { linksHeader } from '../../config/header';
import { configAtom } from '../../config/config';
// Import Hook
import useStickyHeader from '../../hooks/useStickyHeader';
// Import SearchBox
import CustomSearchBoxSimple from '../searchbox/SearchBoxSimple';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '../voicesearch/VoiceSearch';

const Header = () => {
  const elementRef = useRef('');
  const [links] = useRecoilState(linksHeader);
  // Import state from the voice search
  const [value] = useRecoilState(configAtom);
  const sticky = useStickyHeader(elementRef);
  const headerClasses = `header ${sticky ? 'sticky' : ''}`;
  // Define value to display voiceSearch
  const displayVoiceSearch = value.voiceSearch.value;

  return (
    <div>
      <header ref={elementRef} className={headerClasses}>
        <div className="container">
          <div className="container__header-top">
            <div className="container__header-top__logo">
              <Link to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Algolia-logo.svg/1200px-Algolia-logo.svg.png"
                  alt=""
                />
              </Link>
            </div>
            {/* For a search box Simple center */}
            <div className="searchbox-container">
              <CustomSearchBoxSimple />
              {displayVoiceSearch && <CustomVoiceSearchComponent />}
            </div>
            <div className="container__header-top__title">
              <h1>Demo BoilerPlate</h1>
            </div>
          </div>
          <nav className="container__header-bottom">
            <ul className="container__header-bottom__links">
              {links.map((link) => {
                return (
                  <li key={link.url}>
                    <Link to={link.url}>{link.link}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
