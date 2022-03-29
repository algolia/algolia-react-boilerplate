// This is for defining whether the Header component should be sticky, depending on your scrolling

import { useEffect, useState } from 'react';

function useStickyHeader(elementRef) {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const header = elementRef.current;
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        if (!sticky) {
          setSticky(true);
        }
      } else {
        header.classList.remove('sticky');
        if (sticky) {
          setSticky(false);
        }
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, [elementRef]);
  return sticky;
}

export default useStickyHeader;
