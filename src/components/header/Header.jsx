// This component decides which type of Header to render
import { useRef, memo } from 'react';

// Import Hook for a Sticky Header
import useStickyHeader from '../../hooks/useStickyHeader';
import useScreenSize from '../../hooks/useScreenSize';

// 
import HeaderLaptop from './components/HeaderLaptop';
import HeaderMobile from './components/HeaderMobile';

const Header = () => {
  // Handle screen sizing & responsiveness with this hook
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();
  // Handle sticky Header
  const elementRef = useRef(null);
  const sticky = useStickyHeader(elementRef);
  const headerClasses = `header ${sticky ? 'sticky' : ''}`;

  // Render the Header for Laptop or Mobile, depending on the size of the screen
  return (
    <header ref={elementRef} className={headerClasses}>
      {(laptop || laptopXS) && <HeaderLaptop />}
      {(tablet || mobile) && <HeaderMobile />}
    </header>
  );
};

export default memo(Header);
