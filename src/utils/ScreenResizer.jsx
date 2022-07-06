import { useSetRecoilState } from 'recoil';

import { useEffect } from 'react';
import { windowSize } from '@/hooks/useScreenSize';

const ScreenResizer = () => {

    const setWindowSize = useSetRecoilState(windowSize);

    const handleResize = () => {
      // Set screen size and return true or false
      setWindowSize({
        laptop: window.innerWidth >= 1440,
        laptopXS: window.innerWidth > 768 && window.innerWidth < 1440,
        tablet: window.innerWidth >= 480 && window.innerWidth <= 768,
        mobile: window.innerWidth < 480,
      });
    };
  
    useEffect(() => {
      // Add event listener
      window.addEventListener('resize', handleResize);
  
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return <></>
}

export default ScreenResizer;