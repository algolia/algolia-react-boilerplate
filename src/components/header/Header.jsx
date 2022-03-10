import React, { useRef, memo, useState, useEffect } from 'react';
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
import useScreenSize from '../../hooks/useScreenSize';
// Import SearchBox
// eslint-disable-next-line import/order
import CustomSearchBoxSimple from '../searchbox/SearchBox';
import HeaderLaptop from './components/HeaderLaptop';
import HeaderMobile from './components/HeaderMobile';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '../voicesearch/VoiceSearch';
import SelectPersona from './personnaSelect/SelectPersona';

const Header = () => {
  // Handle screen sizing & responsive
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();

  console.log('render');
  // Handle sticky Header
  const elementRef = useRef(null);
  const sticky = useStickyHeader(elementRef);
  const headerClasses = `header ${sticky ? 'sticky' : ''}`;

  return (
    <header ref={elementRef} className={headerClasses}>
      {(laptop || laptopXS) && <HeaderLaptop />}
      {(tablet || mobile) && <HeaderMobile />}
    </header>
  );
};

export default memo(Header);
