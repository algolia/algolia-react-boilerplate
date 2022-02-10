import React from 'react';

import CustomHomeBanners from '../components/banners/HomeBanners';
import Header from '../components/header/Header';

const HomePage = () => (
  <div className="homepage">
    {/* Here it's the custom banners */}
    <CustomHomeBanners />
  </div>
);

export default HomePage;
