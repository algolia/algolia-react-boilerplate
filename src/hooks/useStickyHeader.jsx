import { useEffect, useState } from 'react';

function useStickyHeader({ elementRef }) {
  console.log(elementRef);
  const [sticky, setsticky] = useState(false);
  useEffect(() => {
    const header = elementRef;
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
  }, []);
  return sticky;
}

export default useStickyHeader;
