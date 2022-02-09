import React, { useRef, useEffect, useState } from 'react';
// Reqct Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useRecoilState } from 'recoil';

// Import Config for the header
import { linksHeader } from '../../config/header';
// Import Hook
import useStickyHeader from '../../hooks/useStickyHeader';
// Import SearchBox
import SearchBoxSimple from '../searchbox/SearchBoxSimple';

const Header = () => {
  const elementRef = useRef();
  const [currentHeader, setCurrentHeader] = useState(null);
  const [links] = useRecoilState(linksHeader);
  const sticky = useStickyHeader(elementRef);
  const headerClasses = `header ${sticky ? 'sticky' : ''}`;

  useEffect(() => {
    const divElement = elementRef.current;
    setCurrentHeader(divElement);
    console.log(currentHeader);
  }, [currentHeader]);

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
            <SearchBoxSimple />
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
