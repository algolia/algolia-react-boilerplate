// This is for defining the size of the window, for responsive design

import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    laptop: undefined,
    laptopXS: undefined,
    tablet: undefined,
    mobile: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      // Set screen size and return true or false
      setWindowSize({
        laptop: window.innerWidth >= 1440 ? true : false,
        laptopXS:
          window.innerWidth > 768 && window.innerWidth < 1440 ? true : false,
        tablet:
          window.innerWidth >= 480 && window.innerWidth <= 768 ? true : false,
        mobile: window.innerWidth < 480 ? true : false,
      });
    };
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export default useScreenSize;
