// Render the Header component in Main.jsx, for small screen sizes

import { useState } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Recoil Header State
import { useSetRecoilState } from 'recoil';

// eslint-disable-next-line import/order
import { queryAtom } from '@/config/searchboxConfig';

// Import logo URL for header
import logo from '@/assets/logo/logo.webp';

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

// Import framer motion
import { AnimatePresence } from 'framer-motion';

// Import SearchBox
// eslint-disable-next-line import/order
import CustomSearchBox from '@/components/searchbox/SearchBox';

import Navigation from './Navigation';

// Custom hook to prevent body from scrolling
import usePreventScrolling from '@/hooks/usePreventScrolling';

const HeaderMobile = ({ mobile, tablet }) => {
  // Import configuration from Recoil
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body from scrolling when panel is open
  usePreventScrolling(isMenuOpen);

  return (
    <div className="container container-mobile">
      <div className="container__header-top">
        {/* Hamburger button to open or close the menu dropdown */}
        <div
          className={`${isMenuOpen ? 'hamburger-active' : 'hamburger-inactive'
            } hamburger`}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
        {/* Logo, which returns to the homepage on click */}
        <div className="container__header-top__logo">
          <Link
            to="/"
            onClick={() => {
              setQueryState('');
              federated(false);
            }}
          >
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* For a search box Simple center */}
        <div className="container__header-top__title">
          <h1>Demo BoilerPlate</h1>
        </div>
      </div>

      <div className="searchbox-container searchbox-container-mobile">
        <CustomSearchBox />
        {/* Display voicesearch if the  displayVoiceSearch config is set to true */}
        {/* {displayVoiceSearch && <CustomVoiceSearchComponent />} */}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <CategoriesMobile
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            mobile={mobile}
            tablet={tablet}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoriesMobile = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  return (
    <div
      className="container-mobile__navList"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
    >
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        mobile={mobile}
        tablet={tablet}
      />
    </div>
  );
};

export default HeaderMobile;
