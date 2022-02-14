import React from 'react';

import CustomHomeBanners from '../components/banners/HomeBanners';
import Header from '../components/header/Header';
import FederatedSearch from '../components/federatedSearch/FederatedSearch';
import { isFederatedAtom } from '../config/config';

//recoil import
import { useRecoilValue } from 'recoil';

const HomePage = () => {
  const isFederated = useRecoilValue(isFederatedAtom);

  return (
    <div className="homepage">
      {isFederated && <FederatedSearch />}
      {/* Here it's the custom banners */}
      <CustomHomeBanners />
    </div>
  );
};

export default HomePage;
