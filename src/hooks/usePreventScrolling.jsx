import { useEffect } from 'react';

const usePreventScrolling = (open) => {
  console.log(open);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
    } else {
      console.log('cc');
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
    }
  }, [open]);
};

export default usePreventScrolling;
