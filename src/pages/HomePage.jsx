import React, { useEffect } from 'react';
// React router
import { Link } from 'react-router-dom';
import { atom, useRecoilState, selector, useRecoilValue } from 'recoil';

import CustomHomeBanners from '../components/banners/HomeBanners';
import Header from '../components/header/Header';

const HomePage = () => (
  <div className="homepage">
    <Header />
    {/* Here it's the custom banners */}
    <CustomHomeBanners />
  </div>
);

export default HomePage;
