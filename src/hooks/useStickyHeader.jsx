import { useEffect, useState } from 'react';

function useStickyHeader(elementRef) {
  const [sticky, setsticky] = useState(false);
  useEffect(() => {
    const header = elementRef.current;
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
        if (!sticky) {
          setsticky(true);
        }
      } else {
        header.classList.remove('sticky');
        if (sticky) {
          setsticky(false);
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
