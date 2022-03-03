import React, { useRef } from 'react';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Recoil Header State
import { useRecoilState, useSetRecoilState } from 'recoil';

// Import Config for the header
import { configAtom, hierarchicalFacet } from '../../config/config';
import { linksHeader } from '../../config/header';
// eslint-disable-next-line import/order
import { queryAtom } from '../../config/searchbox';

//Import config for federatedSearch
import { isFederatedAtom } from '../../config/config';

// Import Hook
import useStickyHeader from '../../hooks/useStickyHeader';
// Import SearchBox
// eslint-disable-next-line import/order
import CustomSearchBoxSimple from '../searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '../voicesearch/VoiceSearch';
import SelectPersona from './personnaSelect/SelectPersona';

const Header = () => {
  const elementRef = useRef('');
  const navigate = useNavigate();
  const [links] = useRecoilState(linksHeader);
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(isFederatedAtom);
  // Import state from the voice search
  const [value] = useRecoilState(configAtom);
  const sticky = useStickyHeader(elementRef);
  const headerClasses = `header ${sticky ? 'sticky' : ''}`;
  // Define value to display voiceSearch
  const displayVoiceSearch = value.voiceSearch.value;

  return (
    <header ref={elementRef} className={headerClasses}>
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
                <li
                  key={link.url}
                  onClick={() => {
                    // Hierarchical are extracted from config.js
                    if (link.link !== 'All') {
                      navigate(`/search`, {
                        state: `${hierarchicalFacet.hierarchicalLvl0}:'${link.filter}'`,
                      });
                    } else {
                      navigate('/search');
                    }
                  }}
                >
                  <p>{link.link}</p>
                </li>
              );
            })}
          </ul>
        </nav>
        <SelectPersona />
      </div>
    </header>
  );
};

export default Header;
