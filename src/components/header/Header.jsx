// This component decides which type of Header to render
import { memo } from 'react';

// Import Hook for a Sticky Header
import { windowSize } from '@/hooks/useScreenSize';
import { useRecoilValue } from 'recoil';

// Import 2 kind of Headers
import HeaderLaptop from '@/components/header/components/HeaderLaptop';
import HeaderMobile from '@/components/header/components/HeaderMobile';
import Navigation from '../header/components/Navigation';

//Import scope SCSS
import './SCSS/header.scss';

const Header = ({ setDisplaySubMenu, setCategoryName, categoryName }) => {
  // Handle screen sizing & responsiveness with this hook
  const { isDesktop, tablet, mobile } = useRecoilValue(windowSize);

  // Render the Header for Laptop or Mobile, depending on the size of the screen
  return (
    <div>
      <header className="header">
        {isDesktop ? (
          <HeaderLaptop />
        ) : (
          <HeaderMobile tablet={tablet} mobile={mobile} />
        )}
      </header>
      <div className="container__header-nav">
        <Navigation
          setDisplaySubMenu={setDisplaySubMenu}
          setCategoryName={setCategoryName}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
};

export default memo(Header);
