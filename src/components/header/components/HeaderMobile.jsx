import React, { useState } from 'react';
// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Import Config for the header
// import { configAtom } from '../../../config/config';

// eslint-disable-next-line import/order
import { queryAtom } from '../../../config/searchbox';

//Import config for federatedSearch
import { isFederatedAtom, isVoiceSearch } from '../../../config/config';

// Import Hook
import useScreenSize from '../../../hooks/useScreenSize';

// import framer motion
import { motion, AnimatePresence } from 'framer-motion';
// Import SearchBox
// eslint-disable-next-line import/order
import CustomSearchBoxSimple from '../../searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '../../voicesearch/VoiceSearch';
import Navigation from './Navigation';
import SelectPersona from '../personnaSelect/SelectPersona';

const HeaderMobile = () => {
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(isFederatedAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Define value to display voiceSearch
  const displayVoiceSearch = useRecoilValue(isVoiceSearch);

  return (
    <div className="container container-mobile">
      <div className="container__header-top">
        <div
          className={`${
            isMenuOpen ? 'hamburger-active' : 'hamburger-inactive'
          } hamburger`}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
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

        <div className="container__header-top__title">
          <h1>Demo BoilerPlate</h1>
        </div>
      </div>

      <div className="searchbox-container searchbox-container-mobile">
        <CustomSearchBoxSimple />
        {displayVoiceSearch && <CustomVoiceSearchComponent />}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <CategoriesMobile
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoriesMobile = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.div
      className="container-mobile__navList"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
    >
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </motion.div>
  );
};

export default HeaderMobile;
